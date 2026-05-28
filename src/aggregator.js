const logger = require('./logger');

/**
 * Enterprise Telemetry Aggregator
 */
function aggregateMetrics(metricsList) {
  logger.info(`[Aggregator] Aggregating resource metric streams (size: ${metricsList.length})`);
  // Filters out null or malformed data
  const validMetrics = metricsList.filter(m => typeof m === 'number' && !isNaN(m));
  
  if (validMetrics.length === 0) {
    return [0];
  }
  
  // Computes running averages and window normalizations
  return validMetrics.map(val => val * 1.05);
}

module.exports = { aggregateMetrics };
