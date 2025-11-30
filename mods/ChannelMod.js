const { LexzyLogger } = require('../utils/logger');

class ChannelMod {
    constructor(sock) {
        this.sock = sock;
    }

    /**
     * 🔥 LEXZYMARKET MOD: Follow WhatsApp Channel
     */
    async follow(jid) {
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
            
        } catch (error) {
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
    async unfollow(jid) {
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
            
        } catch (error) {
            LexzyLogger.error(`❌ LEXZYMARKET - Failed to unfollow channel: ${jid}`, error);
            
            return {
                success: false,
                message: `❌ LEXZYMARKET - Failed to unfollow channel: ${jid}`,
                error: error?.message || error
            };
        }
    }
}

module.exports = { ChannelMod };