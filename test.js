/**
 * Master Enterprise Verification Test Suite
 */

const { execSync } = require('child_process');
const { computeScalingFactor, processTelemetryData } = require('./index');

console.log("======================================================================");
console.log("🚀 STARTING MASTER CI VERIFICATION SUITE...");
console.log("======================================================================");

// 1. Run Unit Sub-Suites
try {
  console.log("[Phase 1] Executing aggregate validation suites...");
  execSync('node tests/aggregator.test.js', { stdio: 'inherit' });
} catch (err) {
  console.error("❌ Aggregator sub-suite execution failed!");
  process.exit(1);
}

// 2. Run Scaling Verification
try {
  console.log("\n[Phase 2] Running core scaler calculations...");
  const standardFactor = computeScalingFactor(2);
  if (standardFactor !== 50) {
    throw new Error(`Expected computeScalingFactor(2) to yield 50, but got ${standardFactor}`);
  }
  console.log("✅ [Phase 2 PASS] Normal scaling coefficient validated.");

  // Test array matrices
  console.log("\n[Phase 3] Scaling metric payload collections...");
  const rawMetrics = [10, 20, 30];
  const scaledMetrics = processTelemetryData(rawMetrics, 2);
  console.log(`   -> Raw Metrics: [${rawMetrics.join(', ')}]`);
  console.log(`   -> Scaled telemetry metrics: [${scaledMetrics.join(', ')}]`);
  console.log("✅ [Phase 3 PASS] Telemetry array matrices resolved.");

  // Test Boundary Limit Crash
  console.log("\n[Phase 4] Verifying dynamic scale boundary throttle conditions...");
  console.log("----------------------------------------------------------------------");
  console.log("⚠️  Testing zero scale boundary limit (scale = 0)...");
  console.log("----------------------------------------------------------------------");
  
  const criticalFactor = computeScalingFactor(0);
  
  console.log(`⚠️  Zero-scale dynamic factor: ${criticalFactor}`);
  
  // With the fix in index.js, criticalFactor will be 0 (finite) when scale is 0.
  // The original test expected an error to be thrown if criticalFactor was not finite.
  // We now assert that it is finite and equals 0.
  if (criticalFactor !== 0) {
    throw new Error(`Telemetry Scale Error: Expected 0 for scale 0, but got ${criticalFactor}`);
  }

  console.log("✅ [Phase 4 PASS] Boundary scale limit resolved.");
  console.log("======================================================================");
  console.log("🎉 MASTER ENTERPRISE CI PIPELINE WORKSPACE FULLY GREEN!");
  console.log("======================================================================");
  process.exit(0);
} catch (err) {
  console.error("======================================================================");
  console.error("❌ MASTER CI SUITE VERIFICATION PIPELINE CRASHED!");
  console.error("======================================================================");
  console.error(err.stack || err.message);
  process.exit(1);
}
