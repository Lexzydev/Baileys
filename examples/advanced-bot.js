const { LexzyClient, WebToolsMod, MediaMod, SchedulerMod, chalk } = require('../index');

async function advancedDemo() {
    console.log(chalk.rainbow('🚀 LEXZYMARKET ADVANCED BOT DEMO'));
    
    const client = new LexzyClient({
        printQRInTerminal: true
    });

    await client.waitForConnection();

    // Web Tools Demo
    const webTools = new WebToolsMod(client.sock);
    const googleResult = await webTools.googleSearch('Lexzymarket WhatsApp bot');
    console.log('🔍 Google results:', googleResult);

    // Scheduler Demo
    const scheduler = new SchedulerMod(client.sock);
    const task = scheduler.scheduleBroadcast(
        '1234567890@s.whatsapp.net',
        '🕒 Scheduled message from Lexzymarket!',
        '*/5 * * * *' // Every 5 minutes
    );
    console.log('📅 Scheduled task:', task);

    console.log(chalk.green('🤖 Advanced bot is running!'));
}

advancedDemo().catch(console.error);