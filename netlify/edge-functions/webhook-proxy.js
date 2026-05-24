export default async (request) => {
    const N8N_WEBHOOK_URL = "https://abrahamoccident.app.n8n.cloud/webhook/12ffaa1f-17f1-4e10-ad02-6e057981664d";

    // Manejar preflight OPTIONS
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    try {
        const body = await request.text();

        const response = await fetch(N8N_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body,
        });

        const responseText = await response.text();

        return new Response(responseText, {
            status: response.status,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
            },
        });
    }
};

export const config = {
    path: "/api/webhook-proxy",
};
