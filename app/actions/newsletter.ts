"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email || !email.includes("@")) {
        return { error: "Please provide a valid email address" };
    }

    const supabase = await createClient();

    // Check if email already exists
    const { data: existing } = await supabase
        .from("newsletter_subscribers")
        .select("email")
        .eq("email", email)
        .single();

    if (existing) {
        return { error: "This email is already subscribed" };
    }

    // Insert new subscriber
    const { error } = await supabase
        .from("newsletter_subscribers")
        .insert({ email, subscribed_at: new Date().toISOString() });

    if (error) {
        console.error("Newsletter subscription error:", error);
        return { error: "Failed to subscribe. Please try again." };
    }

    revalidatePath("/");
    return { success: true, message: "Successfully subscribed to newsletter!" };
}
