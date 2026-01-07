import { NextRequest, NextResponse } from 'next/server';
import { getPropertiesFromSheets } from '@/lib/sheets-reader';

export async function GET() {
  try {
    const properties = await getPropertiesFromSheets();
    return NextResponse.json(properties);
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}