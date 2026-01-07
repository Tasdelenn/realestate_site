import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Service Account authentication
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(process.cwd(), 'serviceAccount.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = '15Xnec8MJivIaX0UIQV3Al-ln0WoKdJXncAnOyIJe4NQ';

async function testSheets() {
    try {
        console.log('🔍 Testing Google Sheets Access...');
        const res = await sheets.spreadsheets.get({
            spreadsheetId: SPREADSHEET_ID,
        });

        console.log('✅ Success! Found Sheets:');
        res.data.sheets.forEach(sheet => {
            console.log(`- ${sheet.properties.title}`);
        });

    } catch (error) {
        console.error('❌ Error accessing sheets:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testSheets();
