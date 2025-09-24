#!/usr/bin/env node

/**
 * Environment Variables Verification Script
 * Run this before deployment to ensure all required variables are set
 */

import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

console.log("🔍 Verifying Environment Variables...\n");

const requiredVars = {
  NEXT_PUBLIC_SANITY_PROJECT_ID: {
    value: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    description: "Sanity project ID (should be: u4kx48im)",
    required: true,
  },
  NEXT_PUBLIC_SANITY_DATASET: {
    value: process.env.NEXT_PUBLIC_SANITY_DATASET,
    description: "Sanity dataset (should be: production)",
    required: true,
  },
  SANITY_WRITE_TOKEN: {
    value: process.env.SANITY_WRITE_TOKEN,
    description: "Sanity write token for guestbook submissions",
    required: true,
    masked: true,
  },
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: {
    value: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
    description: "EmailJS service ID (optional)",
    required: false,
  },
  SPOTIFY_CLIENT_ID: {
    value: process.env.SPOTIFY_CLIENT_ID,
    description: "Spotify client ID (optional)",
    required: false,
  },
};

let allGood = true;
let criticalMissing = 0;

Object.entries(requiredVars).forEach(([key, config]) => {
  const status = config.value ? "✅" : config.required ? "❌" : "⚠️";
  const value = config.value
    ? config.masked
      ? `${config.value.substring(0, 10)}...`
      : config.value
    : "Not set";

  console.log(`${status} ${key}`);
  console.log(`   Value: ${value}`);
  console.log(`   Description: ${config.description}`);
  console.log("");

  if (config.required && !config.value) {
    allGood = false;
    criticalMissing++;
  }
});

console.log("📊 Summary:");
console.log(
  `   Required variables: ${criticalMissing === 0 ? "✅ All set" : `❌ ${criticalMissing} missing`}`
);
console.log(`   Deployment ready: ${allGood ? "✅ Yes" : "❌ No"}`);

if (!allGood) {
  console.log("\n🚨 Action Required:");
  console.log(
    "   1. Set missing environment variables in your .env.local file"
  );
  console.log("   2. Add the same variables to your deployment platform");
  console.log("   3. Run this script again to verify");
  console.log("\n📖 See DEPLOYMENT_CHECKLIST.md for detailed instructions");
  process.exit(1);
} else {
  console.log("\n🎉 Environment configuration looks good!");
  console.log("   Your app should deploy successfully.");
}
