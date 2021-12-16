import { renderToString } from 'react-dom/server';
import type { EntryContext } from 'remix';
import { RemixServer } from 'remix';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  if (!process.env.STRAPI_API) {
    throw new Error('Strapi API is missing');
  }
  const markup = renderToString(
    <RemixServer context={remixContext} url={request.url} />
  );

  responseHeaders.set('Content-Type', 'text/html');

  return new Response('<!DOCTYPE html>' + markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
