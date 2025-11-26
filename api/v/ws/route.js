export const config = {
  runtime: "edge",
};

export default async function handler(req) {
  const backend = "https://coldplay-506633707949.europe-west2.run.app";

  const upgrade = req.headers.get("upgrade");

  if (upgrade && upgrade.toLowerCase() === "websocket") {
    return fetch(backend + "/mrchiddyV3", {
      method: "GET",
      headers: req.headers,
    });
  }

  return new Response("This endpoint is for WebSocket only.");
}
