import type { WASocket } from '@whiskeysockets/baileys';
import { LexzyLogger } from '../utils/logger.js';

export interface ChannelResult {
    success: boolean;
    message: string;
    data?: any;
    error?: any;
}

export class ChannelMod {
    constructor(private sock: WASocket) {}

    /**
     * 🔥 LEXZYMARKET MOD: Follow WhatsApp Channel
     */
    async follow(jid: string): Promise<ChannelResult> {
        try {
            if (!jid.endsWith('@newsletter')) {
                return {
                    success: false,
                    message: '❌ Invalid channel JID. Must end with @newsletter',
                    error: 'INVALID_JID_FORMAT'
                };
            }

            const result = await this.sock.chatModify(
                { subscribe: true },
                jid,
                undefined,
                { logger: LexzyLogger }
            );

            LexzyLogger.success(`✅ LEXZYMARKET - Followed channel: ${jid}`);
            
            return {
                success: true,
                message: `🔥 LEXZYMARKET - Successfully followed channel: ${jid}`,
                data: result
            };
            
        } catch (error: any) {
            LexzyLogger.error(`❌ LEXZYMARKET - Failed to follow channel: ${jid}`, error);
            
            return {
                success: false,
                message: `❌ LEXZYMARKET - Failed to follow channel: ${jid}`,
                error: error?.message || error
            };
        }
    }

    /**
     * 🔥 LEXZYMARKET MOD: Unfollow WhatsApp Channel
     */
    async unfollow(jid: string): Promise<ChannelResult> {
        try {
            if (!jid.endsWith('@newsletter')) {
                return {
                    success: false,
                    message: '❌ Invalid channel JID. Must end with @newsletter',
                    error: 'INVALID_JID_FORMAT'
                };
            }

            const result = await this.sock.chatModify(
                { subscribe: false },
                jid,
                undefined,
                { logger: LexzyLogger }
            );

            LexzyLogger.success(`✅ LEXZYMARKET - Unfollowed channel: ${jid}`);
            
            return {
                success: true,
                message: `🔥 LEXZYMARKET - Successfully unfollowed channel: ${jid}`,
                data: result
            };
            
        } catch (error: any) {
            LexzyLogger.error(`❌ LEXZYMARKET - Failed to unfollow channel: ${jid}`, error);
            
            return {
                success: false,
                message: `❌ LEXZYMARKET - Failed to unfollow channel: ${jid}`,
                error: error?.message || error
            };
        }
    }
}