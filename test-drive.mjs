// Test script - Google Drive API bağlantısını test eder
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1zrOYQWbaJ1VKitZKxI_wgku0wBXQ0WKd';

console.log('🔍 Google Drive API Test Başlıyor...\n');
console.log('Folder ID:', FOLDER_ID);

try {
    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(process.cwd(), 'serviceAccount.json'),
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

    console.log('✅ Auth oluşturuldu');
    console.log('📂 Klasördeki dosyalar getiriliyor...\n');

    const response = await drive.files.list({
        q: `'${FOLDER_ID}' in parents`,
        fields: 'files(id, name, mimeType)',
        pageSize: 10,
    });

    console.log(`✅ Başarılı! ${response.data.files?.length || 0} dosya bulundu:\n`);

    if (response.data.files && response.data.files.length > 0) {
        response.data.files.forEach((file, index) => {
            console.log(`${index + 1}. ${file.name} (${file.mimeType})`);
        });
    } else {
        console.log('⚠️  Klasörde dosya yok veya erişim izni yok.');
        console.log('\n📝 Yapılacaklar:');
        console.log('1. serviceAccount.json dosyasındaki client_email değerini kopyala');
        console.log('2. Google Drive\'da klasöre git');
        console.log('3. Sağ tıkla → Share → Service Account email\'ini ekle → Viewer yetkisi ver');
    }

} catch (error) {
    console.error('\n❌ Hata:', error.message);
    console.error('Kod:', error.code);

    if (error.code === 404) {
        console.log('\n💡 Folder ID yanlış. Google Drive URL\'inden kontrol et.');
    } else if (error.code === 403) {
        console.log('\n💡 Service Account\'un klasöre erişim yetkisi yok!');
        console.log('\n📧 Service Account Email:');

        // serviceAccount.json'dan email'i göster
        const fs = await import('fs');
        const serviceAccount = JSON.parse(fs.readFileSync('serviceAccount.json', 'utf8'));
        console.log('   ', serviceAccount.client_email);
        console.log('\nBu email\'i Google Drive klasörüne Viewer olarak ekle.');
    }
}
