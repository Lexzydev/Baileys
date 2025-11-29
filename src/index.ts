/**
 * 🔥 BAILEYS MODS BY LEXZYMARKET
 * Enhanced WhatsApp API Library for Node 20+
 * 
 * @author Lexzymarket
 * @YouTube https://youtube.com/@Lexzymarket
 * @Telegram t.me/Lexzymarket
 */

// Core exports
export { LexzyClient } from './core/LexzyClient.js';
export { LexzySocket } from './core/LexzySocket.js';

// Mods exports
export { ChannelMod } from './mods/ChannelMod.js';
export { StoreMod } from './mods/StoreMod.js';
export { AutoReplyMod } from './mods/AutoReplyMod.js';

// Utils exports
export { LexzyLogger } from './utils/logger.js';

// Re-export Baileys
export { 
    makeWASocket, 
    useMultiFileAuthState,
    DisconnectReason,
    Browsers,
    makeCacheableSignalKeyStore,
    makeInMemoryStore 
} from '@whiskeysockets/baileys';

export type { 
    WASocket, 
    ConnectionState,
    AnyMessageContent,
    SocketConfig 
} from '@whiskeysockets/baileys';