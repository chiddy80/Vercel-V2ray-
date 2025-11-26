import { v4 as uuidv4 } from 'uuid';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const uuid = uuidv4();
  
  const response = {
    educational: "UUID Generator for VLESS Protocol",
    uuid: uuid,
    formats: {
      standard: uuid,
      no_dashes: uuid.replace(/-/g, ''),
      base64: Buffer.from(uuid.replace(/-/g, ''), 'hex').toString('base64url')
    },
    vless_config: {
      url: `vless://${uuid}@[YOUR-DOMAIN]:443?path=%2Fapi%2Fv2ray&security=tls&encryption=none&type=ws#Educational-Test`,
      server: "[YOUR-DOMAIN].vercel.app",
      port: "443",
      path: "/api/v2ray",
      security: "tls",
      encryption: "none",
      type: "ws"
    },
    timestamp: new Date().toISOString()
  };

  res.json(response);
}
