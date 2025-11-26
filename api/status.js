export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const status = {
    service: "Educational Proxy Testing Platform",
    status: "operational",
    timestamp: new Date().toISOString(),
    educational_purpose: "Learn about HTTP protocols, proxies, and web infrastructure",
    endpoints: {
      "/api/proxy": "Test HTTP proxy functionality",
      "/api/check": "Check website connectivity",
      "/api/status": "System status information"
    },
    limits: {
      note: "Educational usage only - respect rate limits",
      timeout: "10 seconds per request",
      protocols: "HTTP and HTTPS only"
    },
    learning_objectives: [
      "Understand HTTP request/response cycle",
      "Learn about headers and status codes",
      "Study proxy server mechanics",
      "Explore network troubleshooting"
    ]
  };

  res.json(status);
}
