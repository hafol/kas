let lastLogs = [];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const entry = {
        timestamp: new Date().toISOString(),
        ...data
      };
      lastLogs.unshift(entry);
      if (lastLogs.length > 20) lastLogs = lastLogs.slice(0, 20);
      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(400).json({ ok: false, error: e.message });
    }
  }

  if (req.method === 'GET') {
    return res.status(200).json({ ok: true, logs: lastLogs });
  }

  return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
}
