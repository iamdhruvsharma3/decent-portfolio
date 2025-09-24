// Quick script to test Sanity write token
// Run with: node test-sanity-token.js

import { createClient } from "@sanity/client";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET?.replace(/"/g, ""), // Remove quotes
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

async function testToken() {
  console.log("🔍 Testing Sanity configuration...\n");

  console.log("Environment variables:");
  console.log(
    "- Project ID:",
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "❌ Missing"
  );
  console.log(
    "- Dataset:",
    process.env.NEXT_PUBLIC_SANITY_DATASET?.replace(/"/g, "") || "❌ Missing"
  );
  console.log(
    "- Write Token:",
    process.env.SANITY_WRITE_TOKEN ? "✅ Present" : "❌ Missing"
  );
  console.log("");

  if (
    !process.env.SANITY_WRITE_TOKEN ||
    process.env.SANITY_WRITE_TOKEN === "your_write_token_here"
  ) {
    console.log("❌ SANITY_WRITE_TOKEN is missing or not configured!");
    console.log("Please follow the instructions in GUESTBOOK_SETUP.md");
    return;
  }

  try {
    // Test fetching existing entries
    console.log("🔍 Testing read permissions...");
    const entries = await client.fetch(
      '*[_type == "guestbookEntry"] | order(_createdAt desc) [0...3]'
    );
    console.log(
      `✅ Read test passed - found ${entries.length} guestbook entries`
    );

    // Test write permissions with a dry run
    console.log("🔍 Testing write permissions...");
    const testDoc = {
      _type: "guestbookEntry",
      name: "Test User",
      message: "Test message - this will not be created",
      submittedAt: new Date().toISOString(),
      approved: false,
      featured: false,
    };

    // This won't actually create the document, just test permissions
    await client.create(testDoc, { dryRun: true });
    console.log("✅ Write test passed - token has create permissions");
    console.log("");
    console.log("🎉 SUCCESS! Your Sanity token is properly configured.");
    console.log("The guestbook should work now. Try signing it!");
  } catch (error) {
    console.log("❌ Error testing Sanity token:");
    console.log(error.message);
    console.log("");
    console.log(
      '💡 Make sure your token has "Editor" or "Administrator" permissions'
    );
  }
}

testToken();
