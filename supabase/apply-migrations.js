/**
 * apply-migrations.js
 * Applies the two Supabase migration SQL files directly via node-postgres.
 * Uses DATABASE_URL (pooler, port 6543) from .env
 *
 * Usage: node supabase/apply-migrations.js
 */

const fs = require("fs");
const path = require("path");
const { Client } = require("pg");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL not set in .env");
  process.exit(1);
}

const migrations = [
  path.join(__dirname, "migrations/20240101_000_rls_policies.sql"),
  path.join(__dirname, "migrations/20240101_001_triggers.sql"),
];

async function applyMigrations() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    console.log("Connecting to Supabase (pooler)...");
    await client.connect();
    console.log("Connected successfully.\n");

    for (const migrationFile of migrations) {
      const filename = path.basename(migrationFile);
      console.log(`Applying: ${filename}`);
      const sql = fs.readFileSync(migrationFile, "utf8");

      try {
        await client.query(sql);
        console.log(`  ✓ ${filename} applied successfully.\n`);
      } catch (err) {
        console.error(`  ✗ ${filename} FAILED:`);
        console.error(`    ${err.message}\n`);
        // Continue to next migration — some errors may be "already exists"
      }
    }

    // Verification queries
    console.log("=== Verification ===\n");

    // 1. Check all 12 tables
    const tablesRes = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
        AND table_type = 'BASE TABLE'
        AND table_name IN (
          'users','dues_periods','dues_payments','announcements','schedule',
          'photo_galleries','photos','audit_log','attendances','materials',
          'forum_posts','forum_comments'
        )
      ORDER BY table_name;
    `);
    console.log(`Tables found (${tablesRes.rows.length}/12):`);
    tablesRes.rows.forEach((r) => console.log(`  - ${r.table_name}`));

    const missingTables = [
      "users","dues_periods","dues_payments","announcements","schedule",
      "photo_galleries","photos","audit_log","attendances","materials",
      "forum_posts","forum_comments",
    ].filter((t) => !tablesRes.rows.find((r) => r.table_name === t));
    if (missingTables.length > 0) {
      console.log(`  ⚠ Missing tables: ${missingTables.join(", ")}`);
    } else {
      console.log("  ✓ All 12 tables present\n");
    }

    // 2. Check dues_summary view
    const viewRes = await client.query(`
      SELECT table_name
      FROM information_schema.views
      WHERE table_schema = 'public'
        AND table_name = 'dues_summary';
    `);
    if (viewRes.rows.length > 0) {
      console.log("  ✓ dues_summary view exists");
    } else {
      console.log("  ⚠ dues_summary view NOT found");
    }

    // 3. Check triggers
    const triggerRes = await client.query(`
      SELECT trigger_name, event_object_table
      FROM information_schema.triggers
      WHERE trigger_name IN ('on_auth_user_created', 'audit_dues_payment_changes')
      ORDER BY trigger_name;
    `);
    console.log(`\nTriggers found (${triggerRes.rows.length}/2):`);
    triggerRes.rows.forEach((r) =>
      console.log(`  - ${r.trigger_name} on ${r.event_object_table}`)
    );
    if (triggerRes.rows.length < 2) {
      console.log("  ⚠ Some triggers may be on auth schema (not visible here)");
    }

    // 4. Check helper functions
    const fnRes = await client.query(`
      SELECT routine_name
      FROM information_schema.routines
      WHERE routine_schema = 'public'
        AND routine_name IN ('is_admin', 'is_treasurer_or_admin')
      ORDER BY routine_name;
    `);
    console.log(`\nHelper functions found (${fnRes.rows.length}/2):`);
    fnRes.rows.forEach((r) => console.log(`  - ${r.routine_name}()`));
    if (fnRes.rows.length === 2) {
      console.log("  ✓ Both helper functions present");
    }

    // 5. Check RLS is enabled
    const rlsRes = await client.query(`
      SELECT tablename, rowsecurity
      FROM pg_tables
      WHERE schemaname = 'public'
        AND tablename IN (
          'users','dues_periods','dues_payments','announcements','schedule',
          'photo_galleries','photos','audit_log','attendances','materials',
          'forum_posts','forum_comments'
        )
      ORDER BY tablename;
    `);
    const rlsEnabled = rlsRes.rows.filter((r) => r.rowsecurity);
    console.log(`\nRLS enabled on ${rlsEnabled.length}/12 tables`);
    if (rlsEnabled.length === 12) {
      console.log("  ✓ RLS enabled on all tables");
    } else {
      const rlsDisabled = rlsRes.rows.filter((r) => !r.rowsecurity);
      console.log(
        "  ⚠ RLS NOT enabled on:",
        rlsDisabled.map((r) => r.tablename).join(", ")
      );
    }

    console.log("\n=== Migration complete ===");
  } catch (err) {
    console.error("Fatal error:", err.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

applyMigrations();
