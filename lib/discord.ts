export async function getDiscordStatus() {
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!botToken || !guildId) return { status: 'missing_config' };

    try {
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}`, {
            headers: { 'Authorization': `Bot ${botToken}` }
        });

        if (response.ok) {
            const data = await response.json();
            return { status: 'connected', guildName: data.name };
        }

        const errorData = await response.json();
        return { status: 'error', message: errorData.message || 'Verification failed' };
    } catch (error) {
        return { status: 'error', message: 'API unreachable' };
    }
}

/**
 * Generate a Discord invite link for clients
 * Returns an instant invite URL that clients can use to join the server
 */
export async function createDiscordInvite(): Promise<string | null> {
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!guildId || !botToken) {
        console.error("Discord configuration missing");
        return null;
    }

    try {
        // Create a temporary invite with 1 day max age and unlimited uses
        const response = await fetch(`https://discord.com/api/v10/channels/${process.env.DISCORD_WELCOME_CHANNEL_ID || guildId}/invites`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                max_age: 86400, // 24 hours
                max_uses: 0, // unlimited uses
                temporary: false
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Discord Invite Error:", JSON.stringify(errorData, null, 2));
            // Fallback to static invite if API fails
            return process.env.DISCORD_INVITE_URL || null;
        }

        const inviteData = await response.json();
        return `https://discord.gg/${inviteData.code}`;
    } catch (error) {
        console.error("Discord Invite Error:", error);
        // Fallback to static invite if API fails
        return process.env.DISCORD_INVITE_URL || null;
    }
}

export async function createDiscordTicket(projectName: string, clientName: string) {
    const guildId = process.env.DISCORD_GUILD_ID;
    const botToken = process.env.DISCORD_BOT_TOKEN;

    if (!guildId || !botToken) {
        console.error("Discord configuration missing");
        return null;
    }

    try {
        const channelName = `ticket-${projectName.toLowerCase().replace(/\s+/g, '-')}`;

        // Create private channel
        // Permission overwrites: @everyone (deny view), bot (allow view)
        // Note: For a real production bot, you'd also add the client's discord ID if synced.
        const response = await fetch(`https://discord.com/api/v10/guilds/${guildId}/channels`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: channelName,
                type: 0, // Guild Text Channel
                topic: `Project: ${projectName} | Client: ${clientName}`,
                parent_id: process.env.DISCORD_TICKET_CATEGORY || null,
                permission_overwrites: [
                    {
                        id: guildId, // @everyone role ID is the same as guild ID
                        type: 0,
                        allow: "0",
                        deny: "1024" // VIEW_CHANNEL
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Discord API Error (Details):", JSON.stringify(errorData, null, 2));
            return null;
        }

        const channel = await response.json();
        const channelUrl = `https://discord.com/channels/${guildId}/${channel.id}`;

        // Send welcome message
        await fetch(`https://discord.com/api/v10/channels/${channel.id}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bot ${botToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: `🚀 **New Project Ticket Created!**\n\n**Project:** ${projectName}\n**Client:** ${clientName}\n\nOur team will be with you shortly. Please join the server if you haven't already: ${process.env.DISCORD_INVITE_URL}`
            })
        });

        return {
            id: channel.id,
            url: channelUrl
        };
    } catch (error) {
        console.error("Failed to create Discord ticket:", error);
        return null;
    }
}
