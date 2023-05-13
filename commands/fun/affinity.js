const { SlashCommandBuilder, EmbedBuilder, CommandInteraction, MessageAttachment } = require('discord.js');
const { bold, italic, strikethrough, underscore, spoiler, quote, blockQuote } = require('discord.js');
var moment = require('moment');

// dependencies for pseudo seeded random
const seedrandom = require('seedrandom');

module.exports = {
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('affinity')
        .setDescription('Ask Stolas the affinity level between two persons')
        .setDMPermission(false)

        .addUserOption(option =>
            option
                .setName('user_1')
                .setDescription("The first user")
                .setRequired(true))
        .addUserOption(option =>
            option
                .setName('user_2')
                .setDescription("The second user")
                .setRequired(true)),
    async execute(interaction) {

        // get the variables
        const user_1 = interaction.options.getUser('user_1');
        const user_2 = interaction.options.getUser('user_2');
        var now = moment().format('MM/DD/YYYY HH:mm:ss');

        // generate the random percentage using the user ids as seed
        const generator = seedrandom(`${user_1.id + user_2.id}`);
        var randomPercentage = Math.trunc((generator() * 100) % 101);
        if ((user_1.id == 671035455466242089 && user_2.id == 204737976222089216) || (user_1.id == 204737976222089216 && user_2.id == 671035455466242089)) {
            randomPercentage = 105;
        }

        // here's the list of reply Stolas will give. It goes from 5% to 100% incrementing by steps of 5
        const reply = [
            "Well, it seems like your chances are about as good as a snowball's chance in hell.",           //0-4%
            "I'm afraid the stars just aren't aligning for you two.",                                       //5-9%
            "Hm, it appears that your personalities may clash. But who am I to judge?",                     //10-14%
            "There's a slim chance, but don't get your hopes up.",                                          //15-19%
            "I wouldn't call it impossible, but it certainly won't be a walk in the park.",                 //20-24%
            "The universe seems to be undecided on this one.",                                              //25-29%
            "It's not looking great, but stranger things have happened.",                                   //30-34%
            "There's a glimmer of hope, but it's still a long shot.",                                       //35-39%
            "It's a possibility, but it may require some compromise on both sides.",                        //40-44%
            "Your compatibility isn't completely hopeless, but it won't be easy.",                          //45-49%
            "Well, well, it seems you two are right in the middle. Fate is a fickle thing, isn't it?",      //50-54%
            "There's potential for something great here, but it won't be without its challenges.",          //55-59%
            "I'm seeing some promising signs. Perhaps a relationship is on the horizon.",                   //60-64%
            "Things are looking up! You two may just have what it takes.",                                  //65-69%
            "Now we're talking! You're starting to look like a perfect match.",                             //70-74%
            "I must say, the stars seem to be in your favor. Keep up the good work.",                       //75-79%
            "You two are practically made for each other. This is very exciting!",                          //80-84%
            "Wow, the universe has really outdone itself with this one. It's almost too good to be true.",  //85-89%
            "I'm getting a strong feeling that this is meant to be. Congratulations!",                      //90-94%
            "I can confidently say that you two are soulmates. The universe has spoken.",                   //95-99%
            "My my, you two are a match made in heaven. I'm honored to witness such a perfect pairing.",    //100%
            "As I look upon you two, I can see that the universe has brought you together for a reason. You are each other's missing pieces, destined to complete one another. May your love be as eternal as the stars themselves." //100%+
        ];
        const replyIndex = (Math.floor(randomPercentage / 5));
        if (replyIndex > 21) {
            replyIndex = 21;
        }

        console.log(`${now} - ${interaction.user.username} (${interaction.user.id}) '/affinity ${user_1.id} ${user_2.id}' issued => ${randomPercentage} : ${reply[replyIndex]}`)
        // create the custom image
        // One day because this fucking sucks i hate this!

        // create the answer embed
        const answerEmbed = new EmbedBuilder()
        .setColor('#6b048a')
        .setAuthor({name: 'Stolas Bot by Eth22', iconURL: interaction.client.user.displayAvatarURL(), url: 'https://eth22.fr'})
        .setTitle(`Affinity analysis : `)
        .addFields(
            { name: `${underscore(bold('Requested by'))}`, value: `<@${interaction.user.id}>`},
            { name: `${bold(`Affinity : ${randomPercentage}%`)}` , value: `<@${user_1.id}> with <@${user_2.id}>`, inline: true},
            { name: `${bold('My verdict :')}` , value: `${reply[replyIndex]}`},
        )
        //set image maybe one day
        .setFooter({text: `${now}`, iconURL: interaction.client.user.displayAvatarURL()})

        return interaction.reply({embeds: [answerEmbed]});
        return interaction.reply({content: `I seem to have run into a problem using \`${interaction.commandName}\`. Please try again.`, ephemeral: true});

    },
};
