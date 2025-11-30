const chalk = require('chalk');

class LexzyLogger {
    static info(message, ...args) {
        console.log(chalk.blue(`🛒 [LEXZY-INFO] ${message}`), ...args);
    }

    static error(message, ...args) {
        console.error(chalk.red(`❌ [LEXZY-ERROR] ${message}`), ...args);
    }

    static warn(message, ...args) {
        console.warn(chalk.yellow(`⚠️ [LEXZY-WARN] ${message}`), ...args);
    }

    static debug(message, ...args) {
        console.debug(chalk.gray(`🔧 [LEXZY-DEBUG] ${message}`), ...args);
    }

    static success(message, ...args) {
        console.log(chalk.green(`✅ [LEXZY-SUCCESS] ${message}`), ...args);
    }

    static rainbow(message, ...args) {
        const rainbow = [chalk.red, chalk.yellow, chalk.green, chalk.blue, chalk.magenta];
        let coloredMessage = '';
        for (let i = 0; i < message.length; i++) {
            coloredMessage += rainbow[i % rainbow.length](message[i]);
        }
        console.log(coloredMessage, ...args);
    }
}

module.exports = { LexzyLogger };