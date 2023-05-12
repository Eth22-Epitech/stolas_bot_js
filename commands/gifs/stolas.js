const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { tenor_key } = require('../../config.json');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('stolas')
		.setDescription('Sends a random Stolas gif')
        .setDMPermission(false),
    async execute(interaction) {

        const url = `https://tenor.googleapis.com/v2/search?q=${'Stolas'}&key=${tenor_key}&limit=${'50'}&media_filter=${'gif'}`;
        const res = await fetch(url);

        if (res.status == 200) {

            const json = await res.json();
            const randomIndex = Math.floor(Math.random() * 50);
            const randomGif = json.results[randomIndex].media_formats.gif.url
            console.log(`/stolas issued => ${randomGif}`);

            const resultGif = new EmbedBuilder()
                .setColor('#0099FF')
                .setAuthor({name: 'Stolas Bot by Eth22', iconURL: interaction.user.displayAvatarURL(), url: 'https://eth22.fr'})
                .setTitle('Stolas gif')
                .setURL(randomGif)
                .setImage(randomGif)
                .setFooter({text: 'Future debug info here', iconURL: interaction.user.displayAvatarURL()})

            return interaction.reply({embeds: [resultGif]});
        } else {
            return interaction.reply({content: `I seem to have run into a problem using \`${command.data.name}\`. Please try again.`, ephemeral: true});
        }
    },
};
