/**
 * 🔥 LEXZYMARKET Enhanced Logger
 */

export class LexzyLogger {
    static info(message: string, ...args: any[]) {
        console.log(`🛒 [LEXZYMARKET-INFO] ${message}`, ...args);
    }

    static error(message: string, ...args: any[]) {
        console.error(`❌ [LEXZYMARKET-ERROR] ${message}`, ...args);
    }

    static warn(message: string, ...args: any[]) {
        console.warn(`⚠️ [LEXZYMARKET-WARN] ${message}`, ...args);
    }

    static debug(message: string, ...args: any[]) {
        console.debug(`🔧 [LEXZYMARKET-DEBUG] ${message}`, ...args);
    }

    static success(message: string, ...args: any[]) {
        console.log(`✅ [LEXZYMARKET-SUCCESS] ${message}`, ...args);
    }
}