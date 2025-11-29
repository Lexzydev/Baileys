import { makeWASocket, type WASocket, type SocketConfig } from '@whiskeysockets/baileys';
import { LexzyLogger } from '../utils/logger.js';

export class LexzyClient {
    public sock: WASocket;
    
    constructor(config: SocketConfig = {}) {
        const finalConfig: SocketConfig = {
            printQRInTerminal: true,
            logger: LexzyLogger,
            ...config
        };

        this.sock = makeWASocket(finalConfig);
        this.setupEvents();
        
        LexzyLogger.success('🔥 LexzyClient initialized successfully!');
        LexzyLogger.info('📺 YouTube: @Lexzymarket');
        LexzyLogger.info('📱 Telegram: t.me/Lexzymarket');
    }

    private setupEvents() {
        this.sock.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            
            if (connection === 'open') {
                LexzyLogger.success('✅ Connected to WhatsApp!');
                LexzyLogger.info('🚀 BAILEYS MODS BY LEXZYMARKET is ready!');
            }
            
            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== 401;
                if (shouldReconnect) {
                    LexzyLogger.warn('🔄 Connection lost, reconnecting...');
                }
            }
        });

        this.sock.ev.on('creds.update', () => {
            LexzyLogger.debug('🔑 Credentials updated');
        });
    }

    /**
     * Wait for connection
     */
    async waitForConnection(): Promise<void> {
        return new Promise((resolve) => {
            this.sock.ev.once('connection.update', (update) => {
                if (update.connection === 'open') {
                    resolve();
                }
            });
        });
    }
}