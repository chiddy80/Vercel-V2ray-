export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }

    let targetUrl = url;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      targetUrl = 'https://' + url;
    }

    const startTime = Date.now();
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Host-Checker-Educational/1.0'
      }
    });
    const responseTime = Date.now() - startTime;

    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    const result = {
      educational: "This endpoint teaches about HTTP protocols and server responses",
      request: {
        url: targetUrl,
        method: 'GET'
      },
      response: {
        status: response.status,
        statusText: response.statusText,
        responseTime: `${responseTime}ms`,
        headers: headers,
        server: headers.server || 'Unknown',
        contentType: headers['content-type'] || 'Unknown'
      },
      learning: {
        status_codes: "Learn about HTTP status codes: 200=OK, 404=Not Found, 500=Server Error",
        headers: "HTTP headers carry metadata about requests and responses",
        timing: "Response time indicates server performance and network latency"
      }
    };

    res.json(result);

  } catch (error) {
    res.status(500).json({
      error: error.message,
      educational: "This error demonstrates real-world networking challenges",
      troubleshooting: [
        "Check if the website exists",
        "Verify your internet connection",
        "Learn about DNS resolution",
        "Understand network timeouts"
      ]
    });
  }
}
