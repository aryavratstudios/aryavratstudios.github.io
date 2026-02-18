import pkg from 'pg';
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function checkTables() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log("Connected to PostgreSQL successfully.");

        const res = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

        console.log("Tables in 'public' schema:");
        console.log(res.rows.map(r => r.table_name));

        if (res.rows.some(r => r.table_name === 'projects')) {
            console.log("SUCCESS: 'projects' table exists.");
        } else {
            console.log("FAILURE: 'projects' table does NOT exist.");
        }
    } catch (err) {
        console.error("Connection error:", err.stack);
    } finally {
        await client.end();
    }
}

checkTables();
