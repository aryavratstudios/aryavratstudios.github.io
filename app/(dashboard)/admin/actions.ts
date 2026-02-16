"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { generatePortfolioDescription } from "@/lib/openai";

const ADMIN_EMAIL = "karn.abhinav00@gmail.com";
const ARTIST_EMAIL = "abhiiinav.pc@gmail.com";

export async function updateProjectStatus(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;

    // Verify specific admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || user.email !== ADMIN_EMAIL) {
        console.error("Unauthorized: Only lead admin can update status");
        return;
    }

    // Fetch existing project info for AI
    const { data: project } = await supabase
        .from("projects")
        .select("title, service_type, description")
        .eq("id", id)
        .single();

    const updates: any = { status };

    // Portfolio Automation
    if (status === "completed" && project) {
        const aiDescription = await generatePortfolioDescription(
            project.title,
            project.service_type,
            project.description
        );

        updates.show_in_portfolio = true;
        updates.portfolio_description = aiDescription;
        updates.artist_email = ARTIST_EMAIL;
    }

    await supabase.from("projects").update(updates).eq("id", id);

    revalidatePath("/admin");
    revalidatePath("/dashboard");
    revalidatePath("/work");
}

export async function togglePortfolio(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
    const currentStateStr = formData.get("currentState") as string;
    const show = currentStateStr === "true";
    const newState = !show;

    // Verify admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

    if (profile?.role !== "admin") return;

    await supabase.from("projects").update({ show_in_portfolio: newState }).eq("id", id);
    revalidatePath("/admin");
    revalidatePath("/work");
}
