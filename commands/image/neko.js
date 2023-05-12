const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { nekomoe_key } = require('../../config.json');
var moment = require('moment');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('neko')
		.setDescription('Sends a random neko image from neko.moe')
        .setDMPermission(false)

        .addBooleanOption(option =>
            option.setName('nsfw')
                .setDescription('This parameter, when true, only works in nsfw channels!')
                .setRequired(true)),
    async execute(interaction) {

        var now = moment().format('MM/DD/YYYY hh:mm:ss');
        const nsfw = interaction.options.getBoolean('nsfw');

        if (nsfw == false) {
            const url = `https://nekos.moe/api/v1/random/image?nsfw=false`;
            const res = await fetch(url);

            if (res.status == 200) {

                const json = await res.json();
                const randomImage = `https://nekos.moe/image/` + json.images[0].id
                console.log(`${now} - /neko issued => ${randomImage}`);

                const resultGif = new EmbedBuilder()
                    .setColor('#0099FF')
                    .setAuthor({name: 'Stolas Bot by Eth22', iconURL: interaction.user.displayAvatarURL(), url: 'https://eth22.fr'})
                    .setTitle('Neko')
                    .setURL(randomImage)
                    .setImage(randomImage)
                    .setFooter({text: `${now}`, iconURL: interaction.user.displayAvatarURL()})

                return interaction.reply({embeds: [resultGif]});
            } else {
                return interaction.reply({content: `I seem to have run into a problem using \`${command.data.name}\`. Please try again.`, ephemeral: true});
            }
        } else if (nsfw == true) {
            if (interaction.channel.nsfw) {
                const url = `https://nekos.moe/api/v1/random/image?nsfw=true`;
                const res = await fetch(url);

                if (res.status == 200) {

                    const json = await res.json();
                    const randomImage = `https://nekos.moe/image/` + json.images[0].id
                    console.log(`${now} - /neko issued => ${randomImage}`);

                    const resultGif = new EmbedBuilder()
                        .setColor('#0099FF')
                        .setAuthor({name: 'Stolas Bot by Eth22', iconURL: interaction.user.displayAvatarURL(), url: 'https://eth22.fr'})
                        .setTitle('Neko')
                        .setURL(randomImage)
                        .setImage(randomImage)
                        .setFooter({text: `${now}`, iconURL: interaction.user.displayAvatarURL()})

                    return interaction.reply({embeds: [resultGif]});
                } else {
                    return interaction.reply({content: `I seem to have run into a problem using \`${command.data.name}\`. Please try again.`, ephemeral: true});
                }
            } else {
                return interaction.reply({content: `My dear, I'm afraid I must inform you that such commands are not permitted in this particular location. (Not a nsfw channel)`, ephemeral: true});
            }
        }

    },
};
