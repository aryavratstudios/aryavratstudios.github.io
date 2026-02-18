import pkg from 'pg';
const { Client } = pkg;
import fs from 'fs';
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function applySchema() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        const schema = fs.readFileSync('supabase/schema.sql', 'utf8');
        await client.connect();
        console.log("Connected to PostgreSQL. Applying schema...");

        await client.query(schema);
        console.log("SUCCESS: Schema applied successfully.");

    } catch (err) {
        console.error("Schema application failed:", err);
    } finally {
        await client.end();
    }
}

applySchema();
