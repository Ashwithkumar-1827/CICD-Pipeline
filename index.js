const config = require('./src/config');
const logger = require('./src/logger');
const aggregator = require('./src/aggregator');

logger.info(`[System] Initializing Enterprise Metrics Scaler in env: ${config.NODE_ENV}`);

/**
 * Normalizes system resource metrics using a dynamic scale threshold factor.
 * 
 * @param {number} scale - The performance throttle denominator (0-100).
 * @returns {number} The calculated scaling coefficient factor.
 */
function computeScalingFactor(scale) {
  logger.info(`[Scaler] Calculating scale normalization factor for throttle limit: ${scale}`);
  
  // BUG: Division by zero when scale is 0.
  if (scale === 0) {
    logger.warn('[Scaler] Warning: Scale is 0, returning safe factor.');
    return 0; // Or throw a specific error if 0 is not a valid outcome
  }
  const factor = 100 / scale;
  
  return factor;
}

/**
 * Collects, aggregates, and scales telemetry datasets
 */
function processTelemetryData(metrics, scale) {
  const aggregated = aggregator.aggregateMetrics(metrics);
  const coefficient = computeScalingFactor(scale);
  return aggregated.map(val => val * coefficient);
}

module.exports = {
  computeScalingFactor,
  processTelemetryData
};
