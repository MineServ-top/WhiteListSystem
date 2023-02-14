//===========MODAL SUBMIT EVENT============
module.exports = {
    name: 'modalSubmit',
    async execute(modal, client, message, guild){
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
        var conf = client.config
        if(modal.customId === 'requestModal'){
            const requestsChan = client.channels.cache.get(client.config.requestsChannel)
            const nicksChan = client.channels.cache.get(client.config.nicknamesChannel)

            const responce1 = modal.getTextInputValue('input1')
            const responce2 = modal.getTextInputValue('input2')
            const responce3 = modal.getTextInputValue('input3')
            const responce4 = modal.getTextInputValue('input4')
            const responce5 = modal.getTextInputValue('input5')

            client.db.set(modal.channel.id, nickResponse)

            modal.member.setNickname(nickResponse).catch((e)=>{console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[31mERROR \x1b[37m| \x1b[36mПроизошла Ошибка > \x1b[31m'+e+'\x1b[0m')})            
            const adminEmbed = new EmbedBuilder()
            .setColor('#00bd6d')
            .setAuthor({
                name: 'Заявка Участника'
            })
            .setDescription('**Ник участника: <@'+modal.user.id+'>, канал: <#'+modal.channel.id+'>\nДля принятия / отклонения заявки перейдите к каналу.**')
            .addFields(
                { 
                    name: conf.WhiteList.Question1.Label, 
                    value: '`'+responce1+'`',
                },
                { 
                    name: conf.WhiteList.Question2.Label,
                    value: '`'+responce2+'`',
                },
                { 
                    name: conf.WhiteList.Question3.Label,
                    value: '`'+responce3+'`',
                },
                { 
                    name: conf.WhiteList.Question4.Label,
                    value: '`'+responce4+'`',
                },
                { 
                    name: conf.WhiteList.Question5.Label,
                    value: '`'+responce5+'`',
                },
                )
                .setThumbnail(modal.user.avatarURL())
                .setFooter({
                    text: client.config.footerText
                })
                const adminRow = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setURL(`https://discord.com/channels/${modal.guild.id}/${modal.channel.id}`)
                    .setLabel('перейти к заявке')
                    .setEmoji('⚡')
                    .setStyle(ButtonStyle.Link),
                )
                requestsChan.send({
                    embeds: [adminEmbed],
                    components: [adminRow]
                })
                const nickEmbed = new EmbedBuilder()
                .setColor('#00bd6d')
                .setAuthor({
                    name: 'Никнейм Участника'
                })
                .setDescription('**Discord: <@'+modal.user.id+'> игровой ник: '+nickResponse+'**')
                .setThumbnail(modal.user.avatarURL())
                .setFooter({
                    text: client.config.footerText
                })
                nicksChan.send({
                    embeds: [nickEmbed],
                })

                const rqEmbed = new EmbedBuilder()
                .setColor('#00bd6d')
                .setAuthor({
                    name: 'Заявка подана!'
                })
                .setDescription('**Заявка была отправлена админам на рассмотрение! Пожалуйста ожидайте!**')
                .addFields(
                    { 
                        name: conf.WhiteList.Question1.Label, 
                        value: '`'+responce1+'`',
                    },
                    { 
                        name: conf.WhiteList.Question2.Label,
                        value: '`'+responce2+'`',
                    },
                    { 
                        name: conf.WhiteList.Question3.Label,
                        value: '`'+responce3+'`',
                    },
                    { 
                        name: conf.WhiteList.Question4.Label,
                        value: '`'+responce4+'`',
                    },
                    { 
                        name: conf.WhiteList.Question5.Label,
                        value: '`'+responce5+'`',
                    },
                    )
                .setThumbnail(client.config.thumbImage)
                .setFooter({
                    text: client.config.footerText
                })
                const remBtn = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('deleteChan')
                    .setLabel('удалить заявку')
                    .setEmoji('🥺')
                    .setStyle(ButtonStyle.Danger),
                )
                const admBtn = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId('addPlayer')
                    .setLabel('принять заявку')
                    .setEmoji('🥐')
                    .setStyle(ButtonStyle.Success),
                    new ButtonBuilder()
                    .setCustomId('removePlayer')
                    .setLabel('отклонить заявку')
                    .setEmoji('🍆')
                    .setStyle(ButtonStyle.Danger),
                    )

                    modal.reply({
                        embeds: [rqEmbed],
                        components: [remBtn, admBtn]
                    }
                )
            }
        }
    }