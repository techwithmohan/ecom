import { query } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const results = await query('SELECT setting_key, setting_value FROM settings');
    const settings = results.reduce((acc, curr) => {
      acc[curr.setting_key] = curr.setting_value;
      return acc;
    }, {});

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Body is expected to be an object of key-value pairs
    const updates = Object.entries(body);
    
    for (const [key, value] of updates) {
      await query(
        'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value=VALUES(setting_value)',
        [key, String(value)]
      );
    }

    return NextResponse.json({ message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Settings POST error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
