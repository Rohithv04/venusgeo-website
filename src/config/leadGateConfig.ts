/**
 * VenusGeo Lead-Gating Configuration & Validation Engine
 * 
 * Central configuration for:
 * - Google Apps Script Web App Endpoint
 * - Blocked personal email domains
 * - Blocked generic/role-based corporate email prefixes
 * - Product PDF download filenames & URLs
 */

// 1. Google Apps Script Web App Deployment URL
// Can be set here directly or via .env file as VITE_GOOGLE_APPS_SCRIPT_URL
export const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL ||
  'https://script.google.com/macros/s/AKfycbwRmj13morOA_j5MYpa1R91FKHNP7-oZlVQtIfsgW4UqbYlo8PH_bfIKoi8tw-C4VON/exec';

// 2. Blocked Personal / Free Email Domains
export const BLOCKED_EMAIL_DOMAINS: string[] = [
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.in',
  'yahoo.co.uk',
  'yahoo.com.br',
  'yahoo.fr',
  'yahoo.de',
  'outlook.com',
  'hotmail.com',
  'hotmail.co.uk',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'mac.com',
  'aol.com',
  'aim.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
  'zohomail.com',
  'gmx.com',
  'gmx.net',
  'gmx.de',
  'mail.com',
  'yandex.com',
  'yandex.ru',
  'fastmail.com',
  'tutanota.com',
  'tuta.com',
  'rediffmail.com',
  'inbox.com',
  'lycos.com'
];

// 3. Blocked Generic / Role-Based Corporate Prefixes
export const BLOCKED_EMAIL_PREFIXES: string[] = [
  'info',
  'admin',
  'administrator',
  'hr',
  'humanresources',
  'careers',
  'jobs',
  'recruitment',
  'support',
  'help',
  'helpdesk',
  'hello',
  'contact',
  'contactus',
  'office',
  'frontdesk',
  'sales',
  'marketing',
  'accounts',
  'accounting',
  'billing',
  'finance',
  'team',
  'enquiry',
  'enquiries',
  'inquiry',
  'inquiries',
  'service',
  'services',
  'customerservice',
  'customercare',
  'operations',
  'ops',
  'reception',
  'webmaster',
  'business',
  'mail',
  'mailbox',
  'general',
  'connect',
  'press',
  'media',
  'inbox',
  'security',
  'privacy'
];

// 4. Download Filenames for Product Presentations
export const PRODUCT_DOWNLOAD_FILENAMES: Record<string, string> = {
  'pammy-ai': 'VenusGeo-Pammy-AI.pdf',
  'document-ai': 'VenusGeo-Pammy-AI.pdf',
  'posmate': 'VenusGeo-POSMATE.pdf',
  'postmate': 'VenusGeo-POSMATE.pdf',
  'ital': 'VenusGeo-ITAL.pdf',
  'fido2-ultrapass': 'VenusGeo-FIDO2-Ultrapass.pdf',
  'ultra-passkey': 'VenusGeo-FIDO2-Ultrapass.pdf'
};

export interface EmailValidationResult {
  valid: boolean;
  reason?: 'INVALID_FORMAT' | 'PERSONAL_EMAIL' | 'GENERIC_PREFIX';
  message: string;
  email: string;
  domain: string;
  mailbox: string;
}

/**
 * Validates that an email is a genuine corporate work address.
 * Rejects:
 * - Malformed email syntax
 * - Personal / free webmail providers (gmail, yahoo, etc.)
 * - Generic role-based mailboxes (info@, sales@, hr@, etc.)
 */
export function validateCorporateEmail(rawEmail: string): EmailValidationResult {
  const email = (rawEmail || '').trim().toLowerCase();

  // Basic email syntax RFC-compliant check
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!email || !emailRegex.test(email) || !email.includes('@')) {
    return {
      valid: false,
      reason: 'INVALID_FORMAT',
      message: 'Enter a valid work email address.',
      email,
      domain: '',
      mailbox: ''
    };
  }

  const parts = email.split('@');
  if (parts.length !== 2) {
    return {
      valid: false,
      reason: 'INVALID_FORMAT',
      message: 'Enter a valid work email address.',
      email,
      domain: '',
      mailbox: ''
    };
  }

  const mailbox = parts[0].toLowerCase();
  const domain = parts[1].toLowerCase();

  // Validate domain has a valid dot and extension
  if (!domain.includes('.') || domain.startsWith('.') || domain.endsWith('.')) {
    return {
      valid: false,
      reason: 'INVALID_FORMAT',
      message: 'Enter a valid work email address.',
      email,
      domain,
      mailbox
    };
  }

  // 1. Check for personal/free email provider
  if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
    return {
      valid: false,
      reason: 'PERSONAL_EMAIL',
      message: 'Please use your company email address.',
      email,
      domain,
      mailbox
    };
  }

  // 2. Check for generic / role-based corporate mailbox
  // Also check sub-parts like info+tag or info_ops
  const cleanMailbox = mailbox.split('+')[0].split('.')[0].split('_')[0].split('-')[0];
  if (BLOCKED_EMAIL_PREFIXES.includes(mailbox) || BLOCKED_EMAIL_PREFIXES.includes(cleanMailbox)) {
    return {
      valid: false,
      reason: 'GENERIC_PREFIX',
      message: 'Please use your individual corporate email rather than a shared company inbox.',
      email,
      domain,
      mailbox
    };
  }

  return {
    valid: true,
    message: 'Corporate email verified.',
    email,
    domain,
    mailbox
  };
}

export interface LeadSubmissionPayload {
  email: string;
  product: string;
  resource: string;
  source: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  message: string;
  downloadGranted: boolean;
  domain?: string;
}

/**
 * Submits lead data asynchronously to the Google Apps Script Web App.
 * Uses text/plain to avoid CORS preflight failures on Google Script redirects.
 * If endpoint is not yet configured, verifies via frontend engine for instant preview testing.
 */
export async function submitLeadToGoogleAppsScript(
  payload: LeadSubmissionPayload
): Promise<LeadSubmissionResponse> {
  const validation = validateCorporateEmail(payload.email);
  if (!validation.valid) {
    return {
      success: false,
      message: validation.message,
      downloadGranted: false
    };
  }

  // If no live Google Apps Script endpoint is configured, simulate server validation
  if (!GOOGLE_APPS_SCRIPT_URL || GOOGLE_APPS_SCRIPT_URL.trim() === '') {
    // Simulate brief network delay for UX loading state
    await new Promise((resolve) => setTimeout(resolve, 600));
    return {
      success: true,
      message: 'Corporate email verified.',
      downloadGranted: true,
      domain: validation.domain
    };
  }

  try {
    const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8'
      },
      body: JSON.stringify({
        ...payload,
        email: validation.email,
        companyDomain: validation.domain,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      }),
      redirect: 'follow'
    });

    if (!response.ok && response.type !== 'opaque') {
      throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    return {
      success: !!data.success,
      message: data.message || (data.success ? 'Corporate email verified.' : 'Verification failed.'),
      downloadGranted: !!data.downloadGranted || !!data.success,
      domain: data.domain || validation.domain
    };
  } catch (error) {
    console.error('Lead submission network error:', error);
    return {
      success: false,
      message: "We couldn't prepare your download right now. Please try again.",
      downloadGranted: false
    };
  }
}

/**
 * Generates official download filename for a given product
 */
export function getProductDownloadFileName(productId: string, productName: string): string {
  if (PRODUCT_DOWNLOAD_FILENAMES[productId]) {
    return PRODUCT_DOWNLOAD_FILENAMES[productId];
  }
  const normalized = productName.replace(/\s+/g, '-');
  return `VenusGeo-${normalized}.pdf`;
}
