/**
 * Enterprise Application Configuration Registry
 */
module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'production',
  API_LIMIT: parseInt(process.env.API_LIMIT) || 1000,
  TELEMETRY_PORT: parseInt(process.env.TELEMETRY_PORT) || 8080,
  DATABASE_TIMEOUT: parseInt(process.env.DATABASE_TIMEOUT) || 5000
};
