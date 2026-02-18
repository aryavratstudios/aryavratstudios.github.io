import pkg from 'pg';
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function promoteAdmin() {
    const email = 'karn.abhinav00@gmail.com';
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log(`Connected to PostgreSQL. Promoting ${email}...`);

        const res = await client.query(
            "UPDATE public.profiles SET role = 'admin' WHERE email = $1 RETURNING email, role",
            [email]
        );

        if (res.rowCount === 1) {
            console.log(`SUCCESS: ${email} is now an ${res.rows[0].role}.`);
        } else {
            console.log(`FAILURE: User ${email} not found.`);
        }
    } catch (err) {
        console.error("Error promoting user:", err.stack);
    } finally {
        await client.end();
    }
}

promoteAdmin();
