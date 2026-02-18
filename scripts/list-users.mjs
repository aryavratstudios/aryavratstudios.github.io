import pkg from 'pg';
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function listUsers() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log("Connected to PostgreSQL.");

        const res = await client.query(`SELECT id, email, role FROM public.profiles`);

        if (res.rows.length === 0) {
            console.log("No users found in the profiles table. Please sign up on the website first.");
        } else {
            console.log("Registered Users:");
            console.table(res.rows);
        }
    } catch (err) {
        console.error("Error listing users:", err.stack);
    } finally {
        await client.end();
    }
}

listUsers();
