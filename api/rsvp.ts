import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
  runtime: "nodejs",
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const allowedOrigins = [
    "https://my-wedding-site-i2t4xj3oi-tmagostinhos-projects.vercel.app",
    "https://my-wedding-site-three.vercel.app",
    "http://localhost:5173",
  ];

  const origin = req.headers.origin;

  if (origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const API_BASE_URL = process.env.API_BASE_URL;
  const API_SECRET_TOKEN = process.env.API_SECRET_TOKEN;

  if (!API_BASE_URL || !API_SECRET_TOKEN) {
    return res.status(500).json({ error: "Configuração incompleta" });
  }

  const body = req.body;

  try {
    const backendResponse = await fetch(`${API_BASE_URL}/confirmation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_SECRET_TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    const result = await backendResponse.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao enviar os dados" });
  }
}
