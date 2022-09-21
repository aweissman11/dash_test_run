module.exports = ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("STRAPI_APP_KEYS"),
  },
  url: env("STRAPI_URL", "http://localhost:1337"),
});
