import type { WASocket } from '@whiskeysockets/baileys';
import { LexzyLogger } from '../utils/logger.js';

export interface AutoReplyRule {
    trigger: string | RegExp;
    response: string | ((match: RegExpMatchArray) => string);
    description: string;
}

export class AutoReplyMod {
    private rules: AutoReplyRule[] = [];

    constructor(private sock: WASocket) {
        this.initializeDefaultRules();
        this.setupMessageHandler();
    }

    private initializeDefaultRules() {
        this.rules = [
            {
                trigger: /^!menu$/i,
                response: `🔥 *LEXZYMARKET BOT MENU*\n\n` +
                         `🛒 *STORE*\n` +
                         `!catalog - Lihat catalog products\n` +
                         `!order <id> <qty> - Buat order\n` +
                         `!status <order_id> - Cek status order\n\n` +
                         `📢 *CHANNEL* \n` +
                         `!follow <channel_jid> - Follow channel\n` +
                         `!unfollow <channel_jid> - Unfollow channel\n\n` +
                         `👥 *GROUP*\n` +
                         `!groupinfo - Info group\n` +
                         `!promote @user - Promote member\n` +
                         `!demote @user - Demote member\n\n` +
                         `🎨 *MEDIA*\n` +
                         `!sticker - Buat sticker dari gambar\n` +
                         `!tts <text> - Text to speech\n\n` +
                         `📞 *CONTACT*\n` +
                         `YouTube: @Lexzymarket\n` +
                         `Telegram: t.me/Lexzymarket`,
                description: 'Show main menu'
            },
            {
                trigger: /^!price$/i,
                response: `💰 *LEXZYMARKET PRICE LIST*\n\n` +
                         `🤖 WhatsApp Bot Script: Rp 149.000\n` +
                         `💻 Programming Course: Rp 299.000\n` +
                         `👕 Merchandise: Rp 99.000\n` +
                         `🔧 Custom Development: *Contact Admin*\n\n` +
                         `📞 t.me/Lexzymarket`,
                description: 'Price list'
            },
            {
                trigger: /^!support$/i,
                response: `📞 *LEXZYMARKET SUPPORT*\n\n` +
                         `💬 Telegram: t.me/Lexzymarket\n` +
                         `🎥 YouTube: @Lexzymarket\n` +
                         `🐙 GitHub: github.com/Lexzydev\n\n` +
                         `🕒 Response time: 1-2 hours`,
                description: 'Support contact'
            },
            {
                trigger: /^(hi|hello|halo|test)$/i,
                response: `👋 Hello! I'm LEXZYMARKET Bot!\n\n` +
                         `Type !menu untuk melihat semua command yang tersedia.`,
                description: 'Greeting response'
            }
        ];
    }

    private setupMessageHandler() {
        this.sock.ev.on('messages.upsert', async ({ messages }) => {
            const message = messages[0];
            if (!message.message || message.key.fromMe) return;

            const text = this.extractText(message.message);
            if (!text) return;

            for (const rule of this.rules) {
                const match = text.match(rule.trigger);
                if (match) {
                    await this.handleAutoReply(message.key.remoteJid!, rule, match);
                    break;
                }
            }
        });
    }

    private extractText(message: any): string | null {
        return message.conversation || 
               message.extendedTextMessage?.text || 
               message.imageMessage?.caption ||
               null;
    }

    private async handleAutoReply(jid: string, rule: AutoReplyRule, match: RegExpMatchArray) {
        try {
            const response = typeof rule.response === 'function' 
                ? rule.response(match) 
                : rule.response;

            await this.sock.sendMessage(jid, { text: response });
            LexzyLogger.info(`Auto-reply sent for trigger: ${rule.trigger}`);
        } catch (error) {
            LexzyLogger.error('Failed to send auto-reply:', error);
        }
    }

    /**
     * 🔥 Tambah custom auto-reply rule
     */
    addRule(trigger: string | RegExp, response: string | ((match: RegExpMatchArray) => string), description: string = 'Custom rule') {
        this.rules.push({ trigger, response, description });
        LexzyLogger.success(`New auto-reply rule added: ${description}`);
    }

    /**
     * 🔥 List semua rules
     */
    listRules() {
        return this.rules.map(rule => ({
            trigger: rule.trigger.toString(),
            description: rule.description
        }));
    }
}