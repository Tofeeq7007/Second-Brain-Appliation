import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';

export interface UrlPreview {
  url: string;
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  type?: string;
}

// Helper function to validate URL
function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Helper function to resolve relative URLs
function resolveUrl(baseUrl: string, relativeUrl: string): string {
  try {
    return new URL(relativeUrl, baseUrl).toString();
  } catch {
    return relativeUrl;
  }
}

// Normal function that takes a URL and returns a preview
export async function getUrlPreview(url: string): Promise<UrlPreview> {
  if (!url || typeof url !== 'string') {
    throw new Error('URL is required and must be a string');
  }

  // Add protocol if missing
  let fullUrl = url;
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    fullUrl = 'https://' + url;
  }

  if (!isValidUrl(fullUrl)) {
    throw new Error('Invalid URL format');
  }

  const response = await axios.get(fullUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    timeout: 10000,
    maxRedirects: 5
  });

  const html = response.data;
  const $ = cheerio.load(html);

  const preview: UrlPreview = { url: fullUrl };

  preview.title =
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('title').text().trim() ||
    '';

  preview.description =
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="twitter:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    '';

  const imageUrl =
    $('meta[property="og:image"]').attr('content') ||
    $('meta[name="twitter:image"]').attr('content') ||
    $('meta[name="twitter:image:src"]').attr('content');

  if (imageUrl) preview.image = resolveUrl(fullUrl, imageUrl);

  preview.siteName =
    $('meta[property="og:site_name"]').attr('content') ||
    new URL(fullUrl).hostname;

  const faviconUrl =
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href') ||
    $('link[rel="apple-touch-icon"]').attr('href') ||
    '/favicon.ico';

  preview.favicon = resolveUrl(fullUrl, faviconUrl);

  preview.type =
    $('meta[property="og:type"]').attr('content') ||
    'website';

  // Remove empty fields
  Object.keys(preview).forEach((key) => {
    if (!preview[key as keyof UrlPreview]) delete preview[key as keyof UrlPreview];
  });

  return preview;
}





































// import express from 'express';
// import axios from 'axios';
// import * as cheerio from 'cheerio';
// import { URL } from 'url';
// import { log } from 'console';

// export const router = express.Router();

// interface UrlPreview {
//   url: string;
//   title?: string;
//   description?: string;
//   image?: string;
//   siteName?: string;
//   favicon?: string;
//   type?: string;
// }

// // Helper function to validate URL
// function isValidUrl(string: string): boolean {
//   try {
//     new URL(string);
//     return true;
//   } catch (_) {
//     return false;
//   }
// }

// // Helper function to resolve relative URLs
// function resolveUrl(baseUrl: string, relativeUrl: string): string {
//   try {
//     return new URL(relativeUrl, baseUrl).toString();
//   } catch {
//     return relativeUrl;
//   }
// }

// // Main route to generate URL preview
// router.post('/preview', solve)
// export async function solve (req:express.Request, res:express.Response) {
//   try {
//     const { url } = req.body;

//     // Validate input
//     if (!url || typeof url !== 'string') {
//       return res.status(400).json({
//         success: false,
//         error: 'URL is required and must be a string'
//       });
//     }

//     // Add protocol if missing
//     let fullUrl = url;
//     if (!url.startsWith('http://') && !url.startsWith('https://')) {
//       fullUrl = 'https://' + url;
//     }

//     // Validate URL format
//     if (!isValidUrl(fullUrl)) {
//       return res.status(400).json({
//         success: false,
//         error: 'Invalid URL format'
//       });
//     }

//     // Fetch the webpage
//     const response = await axios.get(fullUrl, {
//       headers: {
//         'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
//       },
//       timeout: 10000, // 10 second timeout
//       maxRedirects: 5
//     });

//     const html = response.data;
//     const $ = cheerio.load(html);

//     // Extract metadata
//     const preview: UrlPreview = {
//       url: fullUrl
//     };

//     // Get title - prioritize Open Graph, then Twitter, then regular title
//     preview.title = 
//       $('meta[property="og:title"]').attr('content') ||
//       $('meta[name="twitter:title"]').attr('content') ||
//       $('title').text().trim() ||
//       '';

//     // Get description
//     preview.description = 
//       $('meta[property="og:description"]').attr('content') ||
//       $('meta[name="twitter:description"]').attr('content') ||
//       $('meta[name="description"]').attr('content') ||
//       '';

//     // Get image
//     let imageUrl = 
//       $('meta[property="og:image"]').attr('content') ||
//       $('meta[name="twitter:image"]').attr('content') ||
//       $('meta[name="twitter:image:src"]').attr('content') ||
//       undefined;

//     if (imageUrl) {
//       preview.image = resolveUrl(fullUrl, imageUrl);
//     }

//     // Get site name
//     preview.siteName = 
//       $('meta[property="og:site_name"]').attr('content') ||
//       new URL(fullUrl).hostname;

//     // Get favicon
//     let faviconUrl = 
//       $('link[rel="icon"]').attr('href') ||
//       $('link[rel="shortcut icon"]').attr('href') ||
//       $('link[rel="apple-touch-icon"]').attr('href') ||
//       '/favicon.ico';

//     preview.favicon = resolveUrl(fullUrl, faviconUrl);

//     // Get content type
//     preview.type = 
//       $('meta[property="og:type"]').attr('content') ||
//       'website';

//     // Clean up empty values
//     Object.keys(preview).forEach(key => {
//       if (!preview[key as keyof UrlPreview]) {
//         delete preview[key as keyof UrlPreview];
//       }
//     });
//     console.log(preview);
    
//     res.json({
//       success: true,
//       data: preview
//     });

//   } catch (error: any) {
//     console.error('URL Preview Error:', error.message);

//     // Handle different types of errors
//     if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
//       return res.status(404).json({
//         success: false,
//         error: 'Website not found or unreachable'
//       });
//     }

//     if (error.code === 'ETIMEDOUT') {
//       return res.status(408).json({
//         success: false,
//         error: 'Request timeout - website took too long to respond'
//       });
//     }

//     res.status(500).json({
//       success: false,
//       error: 'Failed to generate URL preview'
//     });
//   }
// };

// OUTPUT:

// {
//     "success": true,
//     "data": {
//         "url": "https://www.youtube.com/live/pfZT6Opgy4o?si=1IXBgDKffALlXr1Y",
//         "title": "Code a simple Full Stack app with me (Beginner friendly)",
//         "description": "What we're building - https://github.com/hkirat/real-time-chatLink to cohort - https://harkirat.classx.co.in/Today we're trying to create a simple websocket ...",
//         "image": "https://i.ytimg.com/vi/pfZT6Opgy4o/maxresdefault.jpg",
//         "siteName": "YouTube",
//         "favicon": "https://www.youtube.com/s/desktop/c81c827c/img/logos/favicon_32x32.png",
//         "type": "video.other"
//     }
// }








































// // Batch preview route (for multiple URLs)
// router.post('/preview-batch', async (req, res) => {
//   try {
//     const { urls } = req.body;

//     if (!Array.isArray(urls) || urls.length === 0) {
//       return res.status(400).json({
//         success: false,
//         error: 'URLs array is required'
//       });
//     }

//     if (urls.length > 10) {
//       return res.status(400).json({
//         success: false,
//         error: 'Maximum 10 URLs allowed per request'
//       });
//     }

//     const previews = await Promise.allSettled(
//       urls.map(async (url: string) => {
//         const previewResponse = await axios.post(`${req.protocol}://${req.get('host')}/api/preview`, { url });
//         return previewResponse.data;
//       })
//     );

//     const results = previews.map((result, index) => ({
//       url: urls[index],
//       success: result.status === 'fulfilled',
//       data: result.status === 'fulfilled' ? result.value.data : null,
//       error: result.status === 'rejected' ? 'Failed to generate preview' : null
//     }));

//     res.json({
//       success: true,
//       data: results
//     });

//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       error: 'Failed to process batch preview request'
//     });
//   }
// });

// // Health check route
// router.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     message: 'URL Preview service is running',
//     timestamp: new Date().toISOString()
//   });
// });

// export default router;

// // Usage in main app file (app.ts):
// /*
// import urlPreviewRouter from './routes/urlPreview';
// app.use('/api/url-preview', urlPreviewRouter);
// */