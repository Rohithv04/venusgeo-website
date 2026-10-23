# Google Sheets + Google Apps Script PDF Lead-Gating Setup

This guide walks you through setting up the temporary backend using **Google Sheets** and **Google Apps Script** for gated product PDF downloads on the VenusGeo website.

---

## 1. Create the Google Sheet

1. Open [Google Sheets](https://sheets.google.com) using your **VenusGeo / Company Google Account** (or appropriate company-owned account).
2. Create a new blank spreadsheet.
3. Name the spreadsheet:
   ```text
   VenusGeo Website PDF Leads
   ```
4. Rename the default sheet tab (at the bottom) to:
   ```text
   PDF Downloads
   ```
5. In Row 1, add the following exact column headers across Columns A to I:

| Column | Header Name | Description |
| :--- | :--- | :--- |
| **A** | `Timestamp` | Server timestamp of download authorization |
| **B** | `Email` | Verified corporate work email address |
| **C** | `Company Domain` | Normalized company domain (e.g. `acme.com`) |
| **D** | `Product` | Product name (e.g. `Pammy AI`, `POSMATE`, `ITAL`) |
| **E** | `PDF / Resource Name` | Presentation title |
| **F** | `Source Page` | Page/route where lead was generated (`/#products`) |
| **G** | `Validation Status` | `VALID` |
| **H** | `Download Granted` | `YES` |
| **I** | `User Agent` | Client browser & device information |

*(Note: The script will also auto-generate these headers if the sheet tab is empty).*

---

## 2. Share Sheet with Team (`heliocenture@gmail.com`)

You have two easy ways to share the sheet with `heliocenture@gmail.com`:

### Option A: Standard Google Sheets Share (Recommended)
1. In your Google Sheet, click the green **Share** button in the top right corner.
2. Enter:
   ```text
   heliocenture@gmail.com
   ```
3. Set role to **Editor**.
4. Uncheck or check "Notify people" and click **Send** / **Share**.

### Option B: Automatic via Apps Script
The script in `Code.gs` contains an automatic sharing command:
- You can select the function `shareSheetWithTeam` from the toolbar dropdown in Apps Script and click **Run**.
- Or whenever the first lead is submitted, `Code.gs` calls `ss.addEditor('heliocenture@gmail.com')` automatically.

---

## 3. Add the Google Apps Script

1. In your Google Sheet, click on the top menu:
   **Extensions** → **Apps Script**.
2. Clear any default code in `Code.gs`.
3. Open the file in this repo:
   [`google-apps-script/Code.gs`](file:///Users/rohith/VenusGeo%20Website/google-apps-script/Code.gs)
4. Copy the entire contents of `Code.gs` and paste it into the Google Apps Script editor.
5. Click the **Save** icon (diskette icon) or press `Cmd + S` / `Ctrl + S`.
6. Rename the Apps Script project at the top to:
   ```text
   VenusGeo PDF Lead Gate API
   ```

---

## 4. Deploy as a Web App

1. In the upper-right corner of the Apps Script editor, click **Deploy** → **New deployment**.
2. Click the gear icon (**Select type**) next to "Select type" and choose **Web app**.
3. Fill in the deployment configuration:
   - **Description:** `Production v1 - PDF Lead Gate`
   - **Execute as:** `Me (your-email@company.com)`
   - **Who has access:** `Anyone` *(Critical: allows the website form to submit leads asynchronously without requiring visitors to sign into Google).*
4. Click **Deploy**.
5. If prompted with *"Authorization required"*, click **Authorize access**, select your company account, click **Advanced** → **Go to VenusGeo PDF Lead Gate API (unsafe)**, and click **Allow**.
6. Google will provide a **Web app URL** formatted like:
   ```text
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
7. Copy this URL!

---

## 5. Connect the Web App URL to the Website

You have two easy ways to set the URL:

### Option A: Via Environment Variable (`.env`)
Create or edit `.env` in the root of the project:
```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

### Option B: In [`src/config/leadGateConfig.ts`](file:///Users/rohith/VenusGeo%20Website/src/config/leadGateConfig.ts)
Open `src/config/leadGateConfig.ts` and update line 12:
```ts
export const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';
```

---

## 6. Required Setup Values Summary

| Setting | Required Value | Location |
| :--- | :--- | :--- |
| **Google Sheet Name** | `VenusGeo Website PDF Leads` | Google Drive |
| **Worksheet Tab Name** | `PDF Downloads` | Inside Google Sheet |
| **Web App URL** | `https://script.google.com/macros/s/.../exec` | `.env` or `leadGateConfig.ts` |
| **Pammy AI PDF Path** | `/assets/docs/document-ai-business-presentation.pdf` | `src/data/products.ts` |
| **POSMATE PDF Path** | `/assets/docs/posmate-business-presentation.pdf` | `src/data/products.ts` |
| **ITAL PDF Path** | `/assets/docs/ital-business-presentation.pdf` | `src/data/products.ts` |

---

## 7. How Validation Works

The lead system enforces two layers of validation:
1. **Frontend Validation:** Instant user feedback preventing form submissions for:
   - Invalid email syntax (`Enter a valid work email address.`)
   - Free/personal webmail (`Please use your company email address.`)
     *Blocked:* `gmail.com`, `yahoo.com`, `outlook.com`, `hotmail.com`, `icloud.com`, etc.
   - Generic company inboxes (`Please use your individual corporate email rather than a shared company inbox.`)
     *Blocked:* `info@`, `sales@`, `hr@`, `support@`, `admin@`, `contact@`, etc.
2. **Server-Side Validation:** The Google Apps Script repeats all checks before appending a row and authorizing the download response.
3. **Download Unlocking:** The downloadable PDF button is only revealed after successful authorization.
