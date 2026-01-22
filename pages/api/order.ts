import { NextApiRequest, NextApiResponse } from 'next';

interface OrderData {
  name: string;
  email: string;
  service: string;
  description: string;
  deadline: string;
}

interface OrderResponse {
  ticketId: string;
  discordChannelUrl: string;
  inviteUrl: string;
}

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;
const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID;

const createDiscordChannel = async (orderData: OrderData): Promise<{ channelId: string; channelUrl: string }> => {
  const ticketId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  try {
    // Create a new text channel
    const channelResponse = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/channels`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: `order-${ticketId.toLowerCase()}`,
        type: 0, // Text channel
        topic: `Order channel for ${orderData.name} - ${orderData.service}`,
        permission_overwrites: [], // Add permissions if needed
      }),
    });

    if (!channelResponse.ok) {
      throw new Error(`Discord API error: ${channelResponse.status}`);
    }

    const channelData = await channelResponse.json();
    const channelId = channelData.id;
    const channelUrl = `https://discord.com/channels/${DISCORD_GUILD_ID}/${channelId}`;

    // Send welcome message
    await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${DISCORD_BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `🎉 Welcome ${orderData.name}!\n\n**Order Details:**\n• **Ticket ID:** ${ticketId}\n• **Service:** ${orderData.service}\n• **Deadline:** ${orderData.deadline}\n• **Description:** ${orderData.description}\n\nOur team will be with you shortly to discuss your project. Please share any additional details, references, or files here.\n\n@everyone New order received!`,
      }),
    });

    return { channelId, channelUrl };
  } catch (error) {
    console.error('Discord channel creation failed:', error);
    // Fallback to mock
    const channelId = `mock-${ticketId}`;
    const channelUrl = `https://discord.com/channels/${DISCORD_GUILD_ID}/${channelId}`;
    return { channelId, channelUrl };
  }
};

const getDiscordInviteUrl = async (): Promise<string> => {
  try {
    // Create a channel invite (optional, can invite to server instead)
    // For now, return a static invite
    return 'https://discord.gg/aryavratstudios';
  } catch (error) {
    console.error('Discord invite creation failed:', error);
    return 'https://discord.gg/aryavratstudios';
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrderResponse | { error: string }>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const orderData: OrderData = req.body;

    // Validate required fields
    if (!orderData.name || !orderData.email || !orderData.service || !orderData.description || !orderData.deadline) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create Discord channel
    const { channelId, channelUrl } = await createDiscordChannel(orderData);

    const ticketId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Get Discord invite URL
    const inviteUrl = await getDiscordInviteUrl();

    // In production, you would:
    // 1. Save order to database
    // 2. Send confirmation email
    // 3. Send notifications to team

    const response: OrderResponse = {
      ticketId,
      discordChannelUrl: channelUrl,
      inviteUrl
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Order processing error:', error);
    res.status(500).json({ error: 'Failed to process order' });
  }
}