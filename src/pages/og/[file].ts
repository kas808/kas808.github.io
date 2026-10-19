// Saves one link preview picture per page at /og/<page>.jpg (see src/lib/og.ts).
import type { APIRoute } from 'astro';
import { ogFile, ogPages, type OgPage } from '../../lib/og';
import { renderOgImage } from '../../lib/og-image';

export async function getStaticPaths() {
  return (await ogPages()).map((page) => ({ params: { file: ogFile(page.key) }, props: { page } }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(new Uint8Array(await renderOgImage((props as { page: OgPage }).page)), {
    headers: { 'Content-Type': 'image/jpeg' },
  });
