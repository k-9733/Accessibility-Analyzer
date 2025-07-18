// This file defines the Mongoose schema for scan results
// and exports the model for use in other parts of the application.

import mongoose from "mongoose";

const scanResultSchema = new mongoose.Schema({
  url: String,
  date: { type: Date, default: Date.now },
  lighthouse: {
    score: Number,
    issues: Array
  },
  axe: {
    violations: Array
  }
});

const ScanResult = mongoose.model("ScanResult", scanResultSchema);
export default ScanResult;

