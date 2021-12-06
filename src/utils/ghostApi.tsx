import GhostContentAPI from "@tryghost/content-api";

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: "https://ghost.gianha.co",
  key: "bf50ab0530022d5cf5e91a11c6",
  version: "v3",
});

export default api;
