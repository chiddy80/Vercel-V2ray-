const axios = require('axios');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests for safety
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Only GET requests allowed for educational purposes',
      educational_note: 'This is a testing endpoint for learning about HTTP protocols'
    });
  }

  try {
    const { url, test } = req.query;

    if (!url) {
      return res.status(400).json({
        error: 'URL parameter is required',
        example: '/api/proxy?url=https://example.com&test=ping',
        educational_purpose: 'Learn how HTTP proxies work'
      });
    }

    // Validate URL format
    let targetUrl;
    try {
      targetUrl = new URL(url);
      // Only allow HTTP/HTTPS for security
      if (!['http:', 'https:'].includes(targetUrl.protocol)) {
        return res.status(400).json({
          error: 'Only HTTP and HTTPS protocols are allowed',
          educational_note: 'This restriction is for security reasons in educational environments'
        });
      }
    } catch (e) {
      return res.status(400).json({
        error: 'Invalid URL format',
        educational_note: 'Learn about proper URL structure: protocol://domain/path'
      });
    }

    console.log(`[EDUCATIONAL PROXY] Testing: ${targetUrl.href}`);

    // Make the request with timeout
    const response = await axios.get(targetUrl.href, {
      timeout: 10000,
      validateStatus: null, // Don't throw on HTTP errors
      headers: {
        'User-Agent': 'Educational-Proxy-Tester/1.0',
        'X-Educational-Purpose': 'Testing HTTP protocols and proxy behavior'
      },
      maxRedirects: 5
    });

    // Educational response with detailed info
    const educationalResponse = {
      educational_note: "This is for learning about HTTP protocols and proxy behavior",
      request: {
        url: targetUrl.href,
        method: 'GET',
        timestamp: new Date().toISOString()
      },
      response: {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        responseTime: response.duration || 'unknown',
        dataSample: typeof response.data === 'string' ? 
          response.data.substring(0, 200) + '...' : 
          '[Binary or non-text content]'
      },
      proxy_info: {
        server: 'Vercel Serverless Function',
        location: 'Educational Testing Environment',
        purpose: 'Learn about HTTP requests, headers, and proxy mechanics'
      }
    };

    res.json(educationalResponse);

  } catch (error) {
    console.error('[EDUCATIONAL PROXY ERROR]:', error.message);

    let educationalError = {
      error: error.message,
      educational_note: "This error demonstrates common network issues",
      timestamp: new Date().toISOString(),
      learning_topics: [
        "DNS resolution",
        "Network connectivity",
        "SSL/TLS handshakes",
        "Firewall restrictions"
      ]
    };

    // Add specific educational notes based on error type
    if (error.code === 'ENOTFOUND') {
      educationalError.dns_lesson = "DNS lookup failed - the domain name couldn't be resolved to an IP address";
    } else if (error.code === 'ECONNREFUSED') {
      educationalError.connection_lesson = "Connection refused - the server is not accepting connections on the specified port";
    } else if (error.code === 'ETIMEDOUT') {
      educationalError.timeout_lesson = "Connection timeout - the server took too long to respond";
    } else if (error.code === 'CERT_HAS_EXPIRED') {
      educationalError.ssl_lesson = "SSL certificate expired - learn about certificate validation";
    }

    res.status(500).json(educationalError);
  }
}
