import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/dashboard";

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
            return NextResponse.redirect(`${siteUrl}${next}`);
        }
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;
    return NextResponse.redirect(`${siteUrl}/login?error=Could not authenticate user`);
}
