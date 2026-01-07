import { drive } from './google-drive';
import * as XLSX from 'xlsx';

const FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID || '1zrOYQWbaJ1VKitZKxI_wgku0wBXQ0WKd';

export async function getProperties() {
  try {
    // Excel dosyalarını bul
    const excelResponse = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and mimeType='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'`,
      fields: 'files(id, name)',
    });

    const properties = [];

    for (const file of excelResponse.data.files || []) {
      try {
        // Excel dosyasını indir
        const downloadResponse = await drive.files.get({
          fileId: file.id,
          alt: 'media',
        }, { responseType: 'arraybuffer' });

        // Excel'i parse et
        const workbook = XLSX.read(downloadResponse.data, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // İlk satırı property olarak al (basit implementasyon)
        if (jsonData.length > 0) {
          const row = jsonData[0] as any;
          properties.push({
            id: file.id,
            title: row.title || row.Title || 'Başlıksız İlan',
            description: row.description || row.Description || '',
            price: parseFloat(row.price || row.Price || 0),
            location: row.location || row.Location || '',
            images: [], // Resimler için ayrı dosya arama
            type: (row.type || row.Type || 'sale') as 'sale' | 'rent',
            bedrooms: parseInt(row.bedrooms || row.Bedrooms || 0),
            bathrooms: parseInt(row.bathrooms || row.Bathrooms || 0),
            area: parseFloat(row.area || row.Area || 0),
          });
        }
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    }

    // Resimleri bul ve ekle
    const imageResponse = await drive.files.list({
      q: `'${FOLDER_ID}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name)',
    });

    if (properties.length > 0 && imageResponse.data.files?.length) {
      // İlk property'ye resimleri ekle (basit implementasyon)
      properties[0].images = imageResponse.data.files.map(file =>
        `https://drive.google.com/uc?export=view&id=${file.id}`
      );
    }

    return properties.length > 0 ? properties : [
      {
        id: '1',
        title: 'Örnek İlan - Google Drive Bağlantısı Bekleniyor',
        description: 'Google Drive credentials ayarlandıktan sonra gerçek veriler yüklenecek',
        price: 0,
        location: '',
        images: [],
        type: 'sale' as const,
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
      }
    ];
  } catch (error) {
    console.error('Drive API error:', error);
    return [
      {
        id: 'error',
        title: 'Hata: Google Drive Bağlantısı',
        description: 'Lütfen credentials.json dosyasını proje kök dizinine ekleyin ve .env.local dosyasında GOOGLE_DRIVE_CLIENT_ID ve GOOGLE_DRIVE_CLIENT_SECRET değerlerini ayarlayın.',
        price: 0,
        location: '',
        images: [],
        type: 'sale' as const,
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
      }
    ];
  }
}