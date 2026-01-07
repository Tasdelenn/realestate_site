import { sheets } from './google-drive';
import type { Property } from './types';

// EmlakAjandası Sheets ID'sini .env'den alalım veya hardcode edelim (restart gerekmemesi için)
const SHEETS_ID = process.env.GOOGLE_SHEETS_ID || '15Xnec8MJivIaX0UIQV3Al-ln0WoKdJXncAnOyIJe4NQ';

interface ArsaRow {
    date: string;
    neighborhood: string;
    street: string;
    ada: string;
    parsel: string;
    area: string;
    type: string;
    price: string;
}

export async function getPropertiesFromSheets(): Promise<Property[]> {
    try {
        if (!SHEETS_ID) {
            throw new Error('GOOGLE_SHEETS_ID env variable is required');
        }

        // "SATILIK ARSA" sheet'ini oku (A:O sütunları)
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEETS_ID,
            range: "'SATILIK ARSA'!A:O", // Sheet adında boşluk olduğu için tek tırnak içinde
        });

        const rows = response.data.values || [];

        if (rows.length === 0) {
            console.log('No data found in Arsa sheet');
            return [];
        }

        // Son 10 satırı al (başlık hariç)
        const dataRows = rows.slice(1); // İlk satır başlık olabilir
        const recentRows = dataRows.slice(-10); // Son 10

        const properties: Property[] = [];

        recentRows.forEach((row, index) => {
            try {
                // Private sütunları atla: L(11), M(12), O(14)
                const property: Property = {
                    id: `ARSA-${dataRows.length - 10 + index + 1}`, // Otomatik ID
                    title: `${row[9] || 'Arsa'} - ${row[1] || ''} ${row[2] || ''}`.trim(),
                    description: `${row[3] || ''} Ada ${row[5] || ''} Parsel - ${row[7] || ''} m²`.trim(),
                    price: parseTurkishPrice(row[13]), // N sütunu (14. index)
                    location: `${row[1] || ''} ${row[2] || ''}`.trim(),
                    images: [], // Şimdilik yok
                    type: 'sale' as const,
                    bedrooms: 0,
                    bathrooms: 0,
                    area: parseFloat((row[7] || '0').toString().replace(/[^0-9.]/g, '')),
                };

                // Sadece geçerli property'leri ekle
                if (property.title && property.location) {
                    properties.push(property);
                }
            } catch (error) {
                console.error(`Error parsing row ${index}:`, error);
            }
        });

        return properties;

    } catch (error) {
        console.error('Sheets API error:', error);
        throw error;
    }
}

// Türk formatındaki fiyatı parse et (₺1.250.000 → 1250000)
function parseTurkishPrice(priceStr: string | undefined): number {
    if (!priceStr) return 0;

    // ₺ işaretini ve noktaları kaldır
    const cleaned = priceStr
        .replace(/₺/g, '')
        .replace(/\./g, '')
        .replace(/,/g, '.')
        .trim();

    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
}
