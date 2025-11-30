const { LexzyClient, ChannelMod } = require('../index');

/**
 * 🔥 BASIC BOT EXAMPLE - LEXZYMARKET
 * Demo penggunaan Baileys Mods oleh Lexzymarket
 */

async function main() {
    console.log('🚀 Starting LEXZYMARKET Baileys Mods...');
    console.log('📺 YouTube: @Lexzymarket');
    console.log('📱 Telegram: t.me/Lexzymarket\n');

    // Create client
    const client = new LexzyClient({
        printQRInTerminal: true,
        auth: {
            // Auth configuration (optional)
        }
    });

    // Wait for connection
    await client.waitForConnection();

    // Use Channel Mod
    const channelMod = new ChannelMod(client.sock);
    
    // Test follow channel (gunakan JID yang valid)
    const channelJid = '120363416262862080@newsletter';
    
    console.log(`\n🔗 Testing follow channel: ${channelJid}`);
    const result = await channelMod.follow(channelJid);
    
    console.log('📊 Result:', result);

    // Keep bot running
    console.log('\n🤖 Bot is running... Press Ctrl+C to stop.');
}

main().catch(console.error);