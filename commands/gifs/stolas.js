const { SlashCommandBuilder } = require('discord.js');
const { tenor_key } = require('../../config.json');
const fs = require('fs');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('stolas')
		.setDescription('Sends a random Stolas gif'),
    async execute(interaction) {
        const url = `https://tenor.googleapis.com/v2/search?q=${'Stolas'}&key=${tenor_key}&limit=${'50'}`;
        const res = await fetch(url);
        if (res.status == 200) {
            const json = await res.json();
            const randomIndex = Math.floor(Math.random() * 50);
            const randomGif = json.results[randomIndex].itemurl
            console.log(json);
            fs.appendFile('../../logs/discord_log.txt', `${new Date().toJSON().slice(0, 10)} issued /stolas`, (err) => {if (err) throw err;});
            return interaction.reply(randomGif);
        } else {
            fs.appendFile('../../logs/discord_log.txt', `${new Date().toJSON().slice(0, 10)} issued /stolas`, (err) => {if (err) throw err;});
            return interaction.reply({content: `It appears i got a problem using \`${command.data.name}\`. Please try again.`, ephemeral: true});
        }
    },
};
