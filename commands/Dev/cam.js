const { Client, Message, ActionRowBuilder, ButtonBuilder, MessageType } = require('discord.js')
const { disableComponents, randomItemPicker, basecode } = require("my-utils");
const { scheduledJobs } = require("node-schedule")
const fs = require('node:fs/promises');
const db = require('../../mongodb/index');
require('dotenv').config();

module.exports = {
    name: 'cam',
    category: 'Dev',
    /**
     *
     * @param {Client} client 
     * @param {Message<true>} message 
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        try {
            const member = await message.guild.members.fetch('868875618815713290')

            console.log(member)

            await message.react(client.emoji.greentick).catch(() => { })
        } catch (e) {
            console.error(e)
        }
    }
}