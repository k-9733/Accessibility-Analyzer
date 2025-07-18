// This uses Puppeteer + Lighthouse + axe-core to scan a URL.

import express from "express";
import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import axeCore from "axe-core";
import ScanResult from "../models/ScanResult.js";
import { URL } from "url";

const router = express.Router();

router.post("/", async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL is required" });

  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    // Lighthouse
    const { lhr } = await lighthouse(url, {
      port: new URL(browser.wsEndpoint()).port,
      output: "json",
      onlyCategories: ["accessibility"]
    });

    const lighthouseScore = lhr.categories.accessibility.score * 100;
    const lighthouseIssues = Object.values(lhr.audits)
      .filter(a => a.scoreDisplayMode !== "notApplicable")
      .map(({ id, title, description, score }) => ({
        id,
        title,
        description,
        score
      }));

    // Inject axe-core directly from source
await page.evaluate(axeSource => {
  const script = document.createElement("script");
  script.text = axeSource;
  document.head.appendChild(script);
}, axeCore.source);

// Run axe inside the page context
const axeResults = await page.evaluate(async () => {
  return await window.axe.run();
});


    await browser.close();

    const scanResult = await ScanResult.create({
      url,
      lighthouse: { score: lighthouseScore, issues: lighthouseIssues },
      axe: { violations: axeResults.violations }
    });

    res.json(scanResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scan failed", details: err.message });
  }
});

export default router;

// GET /scan/:id
router.get("/:id", async (req, res) => {
  try {
    const scan = await ScanResult.findById(req.params.id);
    if (!scan) return res.status(404).json({ error: "Scan not found" });
    res.json(scan);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch scan" });
  }
});

// GET /history
router.get("/", async (req, res) => {
  try {
    const scans = await ScanResult.find().sort({ date: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});
