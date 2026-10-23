/**
 * ============================================================================
 * VENUSGEO WEBSITE — PDF LEAD GATING BACKEND
 * ============================================================================
 * 
 * Google Apps Script Web App Endpoint for Google Sheets Lead Capture.
 * 
 * Target Google Sheet: "VenusGeo Website PDF Leads"
 * Target Worksheet:    "PDF Downloads"
 * 
 * Columns:
 * 1. Timestamp
 * 2. Email
 * 3. Company Domain
 * 4. Product
 * 5. PDF / Resource Name
 * 6. Source Page
 * 7. Validation Status
 * 8. Download Granted
 * 9. User Agent
 */

// Blocked Personal / Free Email Domains
var BLOCKED_DOMAINS = [
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

// Blocked Generic / Role-Based Corporate Email Prefixes
var BLOCKED_PREFIXES = [
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

/**
 * Handles incoming POST requests from the VenusGeo website
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  // Prevent duplicate concurrent write collisions
  try {
    lock.waitLock(10000);
  } catch (err) {
    return createJsonResponse({
      success: false,
      message: 'Server is busy processing another request. Please try again in a moment.'
    });
  }

  try {
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        success: false,
        message: 'Invalid request payload.'
      });
    }

    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({
        success: false,
        message: 'Invalid JSON payload format.'
      });
    }

    var rawEmail = (data.email || '').trim().toLowerCase();
    var product = (data.product || 'General').trim();
    var resource = (data.resource || 'Product Presentation').trim();
    var source = (data.source || '/products').trim();
    var userAgent = (data.userAgent || '').trim();

    // 1. Email Format Syntax Check
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!rawEmail || !emailRegex.test(rawEmail) || rawEmail.indexOf('@') === -1) {
      return createJsonResponse({
        success: false,
        message: 'Enter a valid work email address.',
        downloadGranted: false
      });
    }

    var parts = rawEmail.split('@');
    if (parts.length !== 2) {
      return createJsonResponse({
        success: false,
        message: 'Enter a valid work email address.',
        downloadGranted: false
      });
    }

    var mailbox = parts[0].toLowerCase();
    var domain = parts[1].toLowerCase();

    // Domain dot validation
    if (domain.indexOf('.') === -1 || domain.charAt(0) === '.' || domain.charAt(domain.length - 1) === '.') {
      return createJsonResponse({
        success: false,
        message: 'Enter a valid work email address.',
        downloadGranted: false
      });
    }

    // 2. Personal / Free Domain Check
    if (BLOCKED_DOMAINS.indexOf(domain) !== -1) {
      return createJsonResponse({
        success: false,
        message: 'Please use your company email address.',
        downloadGranted: false
      });
    }

    // 3. Generic / Role-Based Corporate Prefix Check
    var cleanMailbox = mailbox.split('+')[0].split('.')[0].split('_')[0].split('-')[0];
    if (BLOCKED_PREFIXES.indexOf(mailbox) !== -1 || BLOCKED_PREFIXES.indexOf(cleanMailbox) !== -1) {
      return createJsonResponse({
        success: false,
        message: 'Please use your individual corporate email rather than a shared company inbox.',
        downloadGranted: false
      });
    }

    // 4. Record Lead into Google Sheet
    var sheet = getOrCreateLeadSheet();
    var timestamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone() || 'GMT', 'yyyy-MM-dd HH:mm:ss');

    sheet.appendRow([
      timestamp,
      rawEmail,
      domain,
      product,
      resource,
      source,
      'VALID',
      'YES',
      userAgent
    ]);

    return createJsonResponse({
      success: true,
      message: 'Corporate email verified.',
      downloadGranted: true,
      domain: domain
    });

  } catch (error) {
    return createJsonResponse({
      success: false,
      message: "We couldn't prepare your download right now. Please try again.",
      error: error.toString()
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Health check endpoint for testing deployment in browser
 */
function doGet(e) {
  return createJsonResponse({
    status: 'online',
    service: 'VenusGeo PDF Lead Gate API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
}

/**
 * Formats JSON response for web requests
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * One-click utility function: Run this from the Apps Script editor toolbar to grant Editor access to heliocenture@gmail.com
 */
function shareSheetWithTeam() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  try {
    ss.addEditor('heliocenture@gmail.com');
    Logger.log('Successfully granted Editor access to heliocenture@gmail.com');
  } catch (err) {
    Logger.log('Sharing error: ' + err.toString());
  }
}

/**
 * Gets or creates the worksheet "PDF Downloads" with required table headers
 */
function getOrCreateLeadSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Automatically grant Editor access to heliocenture@gmail.com
  try {
    ss.addEditor('heliocenture@gmail.com');
  } catch (e) {
    // Already shared or managed by domain permissions
  }

  var sheetName = 'PDF Downloads';
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var headers = [
      'Timestamp',
      'Email',
      'Company Domain',
      'Product',
      'PDF / Resource Name',
      'Source Page',
      'Validation Status',
      'Download Granted',
      'User Agent'
    ];
    sheet.appendRow(headers);

    // Style Header Row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#f3f4f6');
    headerRange.setFontColor('#111827');
    sheet.setFrozenRows(1);

    // Set Column Widths for readability
    sheet.setColumnWidth(1, 160); // Timestamp
    sheet.setColumnWidth(2, 240); // Email
    sheet.setColumnWidth(3, 160); // Domain
    sheet.setColumnWidth(4, 150); // Product
    sheet.setColumnWidth(5, 260); // Resource
    sheet.setColumnWidth(6, 140); // Source Page
    sheet.setColumnWidth(7, 130); // Status
    sheet.setColumnWidth(8, 140); // Download Granted
    sheet.setColumnWidth(9, 280); // User Agent
  }

  return sheet;
}
