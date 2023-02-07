      const { EmbedBuilder, PermissionsBitField, ButtonBuilder, ActionRowBuilder,} = require("discord.js");



const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("To Ban Someone In The Server.")
    .addUserOption((option) => option.setName("user")
    .setDescription("Enter The Member")
    .setRequired(true))
    
      .addStringOption((option) => option.setName("reason")
    .setDescription("Type Banned Reason")
    .setRequired(true)),







run: async (client, interaction) => {
    const banuserId = interaction.options.get('user').value;
    const reason =
      interaction.options.get('reason')?.value || 'interaction-error';

    await interaction.deferReply();

    const banuser = await interaction.guild.members.fetch(banuserId);

    if (!banuser) {
      await interaction.editReply("\`\`This Member is Not In The Server\`\`");
      return;
    }

    if (banuser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "\`\`You Can't Banned Server Owner\`\` "
      );
      return;
    }

    const banuserRolePosition = banuser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position; 
    const botRolePosition = interaction.guild.members.me.roles.highest.position; 

    if (banuserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "\`\`You Can't Ban Member Role Has Highest Than Your Role\`\`"
      );
      
      return;
    }

      if(interaction.user.id === interaction.guild.ownerId) {
      await interaction.reply({content: "Your The Owner . - Please Give You Highest Role"})
        
        return;
    }


  

    if (banuserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "\`\`I Can't Ban Member Role Has Highest Than Me or the same Role as me\`\`"
      );
      return;
    }

    try {
      await banuser.ban({ reason });
      await interaction.editReply(
        ` **Banned** ${banuser} `\`Infinitely\`\` **Banned Reason :** ${reason}`
      );
    } catch (error) {
      console.log(`not work`);
  }
 }
              }
