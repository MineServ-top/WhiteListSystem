//============INTEGRATION CREATE EVENT============
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client){
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType, PermissionsBitField } = require('discord.js')
        const { Modal, TextInputComponent, showModal } = require('discord-modals')
        var conf = client.config
        const time = new Date()
        function rcon(cmd){
            const Rcon = require('rcon')
            const o = {tcp:true,challenge:false}
            const conn = new Rcon(conf.RCon.IP, conf.RCon.Port, conf.RCon.Password, o)
            conn.on('auth', function(){
                console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mАвторизовался в RCon.\x1b[0m')
                console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mВыполняется команда > \x1b[33m'+cmd+'\x1b[0m')
                conn.send(cmd)
            }).on('response', function(str){
                console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mОтвет > \x1b[33m'+str+'\x1b[0m')
                conn.disconnect()
            }).on('error', function(err){
                console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[31mERROR \x1b[37m| \x1b[36mПроизошла Ошибка > \x1b[31m'+err+'\x1b[0m')
            }).on('end', function(){
                console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mСоединение закрыто.\x1b[0m')
            })
            conn.connect()
          }
        if (!interaction.isButton()) return
        if (interaction.customId == "requestEmbed"){
            if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id+'-wl')){
                return interaction.reply({
                    content: 'У вас уже есть заявка!',
                    ephemeral: true
                })
            }
            interaction.guild.channels.create({
                name: 'заявка-'+interaction.user.username,
                topic: interaction.user.id+'-wl',
                parent: conf.requestParent,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                {
                    id: interaction.user.id,
                    allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: conf.adminRole,
                    allow: [PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                }],
            }).then(async c => {
                const sendChannel = client.channels.cache.get(c.id)
                interaction.reply({
                    content: `Заявка создана! Пожалуйста заполните анкету! <#${c.id}>`,
                    ephemeral: true
                })
                const embed = new EmbedBuilder()
                .setColor('#00bd6d')
                .setAuthor(
                    {
                        name: 'Заявка Создана'
                    })
                .setDescription('**Нажмите на кнопку ниже, чтобы заполнить анкету для входа на сервер!**')
                .setThumbnail(conf.thumbImage)
                .setFooter(
                    {
                        text: conf.footerText
                    })
                const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('requestChanEmbed')
                        .setLabel('Заполнить Анкету')
                        .setEmoji('💫')
                        .setStyle(ButtonStyle.Success)
                        )
                    sendChannel.send(
                        {
                            embeds: [embed],
                            components: [row]
                        }
                    )
                }
            ).catch(e =>{console.log(e)})
        }
        const reqModal = new Modal()
        .setCustomId('requestModal')
        .setTitle('Заполните Анкету')
        .addComponents(
            new TextInputComponent()
            .setCustomId('nickInput')
            .setLabel(conf.WhiteList.Question1.Label)
            .setPlaceholder(conf.WhiteList.Question1.Placeholder)
            .setStyle(conf.WhiteList.Question1.Style)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('nameInput')
            .setLabel(conf.WhiteList.Question2.Label)
            .setPlaceholder(conf.WhiteList.Question2.Placeholder)
            .setStyle(conf.WhiteList.Question2.Style)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('cheatsInput')
            .setLabel(conf.WhiteList.Question3.Label)
            .setPlaceholder(conf.WhiteList.Question3.Placeholder)
            .setStyle(conf.WhiteList.Question3.Style)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('findInput')
            .setLabel(conf.WhiteList.Question4.Label)
            .setPlaceholder(conf.WhiteList.Question4.Placeholder)
            .setStyle(conf.WhiteList.Question4.Style)
            .setRequired(true),
            new TextInputComponent()
            .setCustomId('buildInput')
            .setLabel(conf.WhiteList.Question5.Label)
            .setPlaceholder(conf.WhiteList.Question5.Placeholder)
            .setStyle(conf.WhiteList.Question5.Style) //'SHORT' or 'LONG'
            .setRequired(true)
            )
            if (!interaction.isButton()) return
            if (interaction.customId == "requestChanEmbed"){
                showModal(reqModal, {
                    client: client,
                    interaction: interaction
                }
            )   
        }

        const admin = '<@'+interaction.user.id+'>'
        const nickname = String(client.db.get(interaction.channel.id))
        
        if (interaction.customId == "addPlayer"){
            if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                var cmd = conf.WhiteList.addCommand.replaceAll('$user',nickname)
                rcon(cmd)
                console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mИгрок \x1b[33m'+nickname+' \x1b[36mбыл добавлен в вайтлист!\x1b[0m')
                interaction.reply({
                    content: '**Заявка одобрена админом '+admin+' и игрок "'+nickname+'" успешно добавлен в вайтлист!**'
                })
            }
            else{
                interaction.reply({
                    content: '**У вас недостаточно прав для использования данной кнопки!**',
                    ephemeral: true
                })
            }
        }

        if (interaction.customId == "removePlayer"){
            if(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)){
                var cmd = conf.WhiteList.remCommand.replaceAll('$user',nickname)
                rcon(cmd)
                console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mИгрок \x1b[33m'+nickname+' \x1b[36mбыл удалён из вайтлиста!\x1b[0m')
                interaction.reply({
                    content: '**Заявка отклонена '+admin+' и игрок "'+nickname+'" удалён из в вайтлиста!**',
                })
            }
            else{
                interaction.reply({
                    content: '**У вас недостаточно прав для использования данной кнопки!**',
                    ephemeral: true
                })
            }
        }
        if (interaction.customId == "deleteChan"){
            const embed = new EmbedBuilder()
                .setColor('#00bd6d')
                .setAuthor({
                    name: 'Удаление Заявки'
                })
                .setDescription('**Вы точно хотите удалить заявку? Это действие невозможно отменить!**')
                .setThumbnail(conf.thumbImage)
                .setFooter({
                    text: conf.footerText
                })
            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setCustomId('not')
                .setLabel('отменить')
                .setEmoji('💚')
                .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                .setCustomId('yes')
                .setLabel('удалить')
                .setEmoji('❤️')
                .setStyle(ButtonStyle.Danger),
            )
            interaction.reply({
                embeds: [embed],
                components: [row]
            })
        }
        if (interaction.customId == "not"){
            const embed = new EmbedBuilder()
            .setColor('#00bd6d')
            .setAuthor({
                name: 'Удаление Заявки'
            })
            .setDescription('**Удаление заявки отменено!**')
            .setThumbnail(conf.thumbImage)
            .setFooter({
                text: conf.footerText
            })
            interaction.reply({
                embeds: [embed]
            })
        }
        if (interaction.customId == "yes"){
            const embed = new EmbedBuilder()
            .setColor('#00bd6d')
            .setAuthor({
                name: 'Удаление Заявки'
            })
            .setDescription('**Заявка будет удалена через 10 секунд! Это действие невозможно отменить!**')
            .setThumbnail(conf.thumbImage)
            .setFooter({
                text: conf.footerText
            })
            interaction.reply({
                embeds: [embed]
            })
            setTimeout(() => {
                const delChan = client.channels.cache.get(interaction.channel.id)
                delChan.delete()
                client.db.delete(interaction.channel.id)
            }, 10000)
        }
    }
}