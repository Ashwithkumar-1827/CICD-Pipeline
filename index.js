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
  
  // Return a neutral factor of 1 if scale is 0; otherwise compute the factor.
  return scale === 0 ? 1 : 100 / scale;
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
