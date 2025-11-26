import { WebSocketServer } from 'ws';

// In-memory storage for educational purposes (reset on redeploy)
const activeConnections = new Map();

export default async function handler(req, res) {
  // Handle WebSocket upgrades
  if (req.headers.upgrade === 'websocket') {
    await handleWebSocket(req, res);
    return;
  }

  // Handle regular HTTP requests
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const response = {
    educational: "VLESS WebSocket Proxy - Educational Testing",
    status: "active",
    protocol: "VLESS over WebSocket",
    path: "/api/v2ray",
    usage: "For learning about proxy protocols only",
    connections: activeConnections.size,
    example_config: {
      vless_url: "vless://[UUID]@your-domain.vercel.app:443?path=%2Fapi%2Fv2ray&security=tls&encryption=none&type=ws",
      parameters: {
        uuid: "Use /api/uuid to generate",
        address: "your-domain.vercel.app",
        port: "443",
        path: "/api/v2ray",
        security: "tls",
        encryption: "none",
        type: "ws"
      }
    },
    timestamp: new Date().toISOString()
  };

  res.json(response);
}

async function handleWebSocket(req, res) {
  const { socket: ws, head } = req;
  
  const wss = new WebSocketServer({ noServer: true });
  
  wss.handleUpgrade(req, ws, head, (websocket) => {
    const connectionId = Math.random().toString(36).substring(7);
    
    activeConnections.set(connectionId, {
      websocket,
      connectedAt: new Date(),
      remoteAddress: req.socket.remoteAddress
    });

    console.log(`[VLESS Educational] New WebSocket connection: ${connectionId}`);

    websocket.on('message', (data) => {
      console.log(`[VLESS Educational] Received data from ${connectionId}:`, data.toString().substring(0, 100));
      
      // Educational response - echo back with info
      const response = {
        educational: "VLESS WebSocket Message Received",
        connection_id: connectionId,
        data_length: data.length,
        timestamp: new Date().toISOString(),
        note: "This is for protocol learning only"
      };
      
      websocket.send(JSON.stringify(response));
    });

    websocket.on('close', () => {
      activeConnections.delete(connectionId);
      console.log(`[VLESS Educational] Connection closed: ${connectionId}`);
    });

    websocket.on('error', (error) => {
      console.log(`[VLESS Educational] Connection error ${connectionId}:`, error.message);
      activeConnections.delete(connectionId);
    });

    // Send welcome message
    websocket.send(JSON.stringify({
      educational: "VLESS WebSocket Connection Established",
      connection_id: connectionId,
      protocol: "VLESS over WebSocket",
      purpose: "Educational testing only",
      timestamp: new Date().toISOString()
    }));
  });
      }
