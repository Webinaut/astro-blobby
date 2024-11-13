import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

const store = getStore('page-views');

export const GET: APIRoute = async () => {
  try {
    const data = await store.get('counter');
    const count = data ? parseInt(await data.text()) : 0;
    return new Response(JSON.stringify({ count }));
  } catch (error) {
    return new Response(JSON.stringify({ count: 0 }));
  }
};

export const POST: APIRoute = async () => {
  try {
    const data = await store.get('counter');
    const currentCount = data ? parseInt(await data.text()) : 0;
    const newCount = currentCount + 1;
    await store.set('counter', newCount.toString());
    return new Response(JSON.stringify({ count: newCount }));
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to increment counter' }), { status: 500 });
  }
};