# Enterprise Observability Scaler & Telemetry Module

A high-velocity, production-grade metrics scaling utility designed to collect, normalize, and process node telemetry arrays (CPU, memory, and disk footprints) across Kubernetes clusters.

## Project Structure
*   `index.js`: Core math processing and metrics scaling normalization coefficient functions.
*   `test.js`: CI validation and boundary-limit telemetry test suites.
*   `Dockerfile`: Secure Docker image layer configuration.
*   `.github/workflows/ci.yml`: Automated GitHub Actions continuous integration pipelines.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run standard local pipeline validation:
   ```bash
   npm test
   ```
3. Compile custom production distribution:
   ```bash
   npm run build
   ```

## Known Telemetry Boundary Conditions
⚠️ **Warning**: Zero-throttle performance scales are currently under triage. If the cluster dynamically throttles dynamic node scaling to zero, a critical telemetry normalization crash may be triggered.
