const { aggregateMetrics } = require('../src/aggregator');

console.log("   -> Running Sub-Suite: Telemetry Aggregator validations...");
const input = [10, 20, null, 30];
const output = aggregateMetrics(input);
if (output.length !== 3) {
  console.error("❌ Aggregator failed to filter null values.");
  process.exit(1);
}
console.log("   ✅ Sub-Suite: Aggregator validations passed successfully.");
