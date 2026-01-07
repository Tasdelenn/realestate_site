import { google } from 'googleapis';
import path from 'path';

// Service Account authentication - daha basit ve güvenli
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), 'serviceAccount.json'),
  scopes: [
    'https://www.googleapis.com/auth/drive.readonly',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
  ],
});

export const drive = google.drive({ version: 'v3', auth });
export const sheets = google.sheets({ version: 'v4', auth });