"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { createDiscordTicket } from "@/lib/discord";

export async function completePayment(projectId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    // Fetch project details
    const { data: project, error: fetchError } = await supabase
        .from("projects")
        .select("*")
        .eq("id", projectId)
        .single();

    if (fetchError || !project) throw new Error("Project not found");

    // Update status to in_progress (or similar)
    const { error: updateError } = await supabase
        .from("projects")
        .update({ status: "in_progress" })
        .eq("id", projectId);

    if (updateError) throw new Error("Failed to update project status");

    // Create Discord Ticket
    const discordTicket = await createDiscordTicket(project.title, user.email || user.id);

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/orders");

    return {
        success: true,
        ticketUrl: discordTicket?.url,
        inviteUrl: process.env.DISCORD_INVITE_URL || "https://discord.gg/aUZuXcZvYa"
    };
}
