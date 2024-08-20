const { Client } = require("discord.js");
const fs = require('node:fs');
const scheduler = require('node-schedule');
const { consolelog } = require("my-utils");


module.exports = {
    id: 'scheduler',
    path: '/scheduler.js',
    reload_able: true,
    /**
     * 
     * @param {Client} client 
     */
    run: async (client) => {
        try {
            consolelog('SCHEDULER', `&aLoading...`);

            const schedules = fs.readdirSync('./schedules').filter(file => file.endsWith('.js'));

            for (const file of schedules) {
                const schedule = require(`../schedules/${file}`);

                const task = scheduler.scheduledJobs[`${schedule.id}`];
                if (task) task.cancel();

                scheduler.scheduleJob(schedule.id, schedule.time, () => schedule.run(client));
                consolelog('SCHEDULER', `&aStarted &d${schedule.id}`);
            }
        } catch (e) {
            console.error(e)
        }
    }
}