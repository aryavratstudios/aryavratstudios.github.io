"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function addComment(projectId: string, content: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
        .from("comments")
        .insert({
            project_id: projectId,
            user_id: user.id,
            content
        });

    if (error) {
        console.error("Error adding comment:", error);
        return { success: false, error: error.message };
    }

    revalidatePath(`/dashboard/orders/${projectId}`);
    return { success: true };
}
