export async function handler(event) {
  const backendUrl = process.env.BACKEND_URL || process.env.VITE_API_URL || "https://stylehub-mern.onrender.com";
  const url = new URL(event.rawUrl);
  const target = new URL(url.pathname + url.search, backendUrl);

  const headers = { ...event.headers };
  delete headers.host;

  const response = await fetch(target, {
    method: event.httpMethod,
    headers,
    body: event.httpMethod === "GET" || event.httpMethod === "HEAD" ? undefined : event.body,
  });

  const contentType = response.headers.get("content-type") || "application/json";
  const body = await response.text();

  return {
    statusCode: response.status,
    headers: {
      "content-type": contentType,
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
      "access-control-allow-headers": "Content-Type,Authorization",
    },
    body,
  };
}
