// api/chat.js
export default async function handler(req, res) {
  // 1. 允许跨域（必须）
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    // 2. 转发请求到 DeepSeek
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.DEEPSEEK_KEY}` // 确保你在Vercel后台填了变量
      },
      body: JSON.stringify(req.body) 
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "师匠掉线了: " + error.message });
  }
}
