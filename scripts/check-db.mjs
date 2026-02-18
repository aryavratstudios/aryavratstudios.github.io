import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function checkTable() {
    console.log("Checking for table 'projects'...");
    const { data, error } = await supabase
        .from("projects")
        .select("count", { count: "exact", head: true });

    if (error) {
        console.error("Error checking projects table:", error);
    } else {
        console.log("Table 'projects' found! Row count:", data);
    }

    const { data: tables, error: tableError } = await supabase
        .rpc("get_tables"); // This might not work if RPC doesn't exist

    if (tableError) {
        console.log("RPC get_tables failed, checking raw query...");
        const { data: rawTables, error: rawError } = await supabase
            .from("information_schema.tables")
            .select("table_name")
            .eq("table_schema", "public");

        if (rawError) {
            console.error("Raw query failed:", rawError);
        } else {
            console.log("Public tables:", rawTables.map(t => t.table_name));
        }
    }
}

checkTable();
