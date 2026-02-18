import pkg from 'pg';
const { Client } = pkg;
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

async function migrate() {
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
    });

    try {
        await client.connect();
        console.log("Connected to PostgreSQL for migration.");

        // 1. Create Portfolio Table
        await client.query(`
      CREATE TABLE IF NOT EXISTS public.portfolio (
        id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
        title text NOT NULL,
        description text,
        service_type text NOT NULL,
        image_url text NOT NULL,
        client_name text,
        project_url text,
        created_at timestamptz DEFAULT now()
      );

      ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Portfolio items are viewable by everyone" ON public.portfolio;
      CREATE POLICY "Portfolio items are viewable by everyone" ON public.portfolio
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Only admins can manage portfolio items" ON public.portfolio;
      CREATE POLICY "Only admins can manage portfolio items" ON public.portfolio
        USING (
          EXISTS (
            SELECT 1 FROM public.profiles
            WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
          )
        );
    `);
        console.log("1. Portfolio table and policies updated.");

        // 2. Update handle_new_user function
        await client.query(`
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS trigger AS $$
      DECLARE
        assigned_role text := 'client';
      BEGIN
        IF NEW.email = 'karn.abhinav00@gmail.com' THEN
          assigned_role := 'admin';
        ELSIF NEW.email = 'aryavrat.studios@gmail.com' THEN
          assigned_role := 'admin';
        ELSIF NEW.email = 'abhinavytagain666@gmail.com' THEN
          assigned_role := 'designer';
        END IF;

        INSERT INTO public.profiles (id, email, full_name, role)
        VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', assigned_role);
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;
    `);
        console.log("2. Signup trigger function updated.");

        // 3. Retroactively update roles for specific users
        await client.query(`
      UPDATE public.profiles SET role = 'admin' WHERE email IN ('karn.abhinav00@gmail.com', 'aryavrat.studios@gmail.com');
      UPDATE public.profiles SET role = 'designer' WHERE email = 'abhinavytagain666@gmail.com';
    `);
        console.log("3. Existing user roles synchronized.");

        console.log("MIGRATION SUCCESSFUL.");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.end();
    }
}

migrate();
