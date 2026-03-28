import { NextResponse } from 'next/server';
import { generateContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json(
        { error: 'Topic is required and must be a string' },
        { status: 400 }
      );
    }

    const data = await generateContent(topic);

    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred during generation' },
      { status: 500 }
    );
  }
}
