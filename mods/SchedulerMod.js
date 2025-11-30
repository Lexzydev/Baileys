const cron = require('node-cron');
const { LexzyLogger } = require('../utils/logger');

class SchedulerMod {
    constructor(sock) {
        this.sock = sock;
        this.tasks = new Map();
    }

    /**
     * 🔥 Schedule message broadcast
     */
    scheduleBroadcast(jid, message, cronTime) {
        try {
            const task = cron.schedule(cronTime, () => {
                this.sock.sendMessage(jid, { text: message });
                LexzyLogger.success(`Scheduled message sent to ${jid}`);
            });

            const taskId = `task_${Date.now()}`;
            this.tasks.set(taskId, task);
            
            return {
                success: true,
                taskId,
                message: `📅 Scheduled task created: ${taskId}`
            };
        } catch (error) {
            LexzyLogger.error('Scheduling failed:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * 🔥 Cancel scheduled task
     */
    cancelTask(taskId) {
        const task = this.tasks.get(taskId);
        if (task) {
            task.stop();
            this.tasks.delete(taskId);
            return { success: true, message: `✅ Task ${taskId} cancelled` };
        }
        return { success: false, message: '❌ Task not found' };
    }

    /**
     * 🔥 List all scheduled tasks
     */
    listTasks() {
        return Array.from(this.tasks.keys());
    }
}

module.exports = { SchedulerMod };