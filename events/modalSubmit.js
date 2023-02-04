//===========MODAL SUBMIT EVENT============
module.exports = {
    name: 'modalSubmit',
    async execute(modal, client, message, guild){
        const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
        if(modal.customId === 'requestModal'){
            const requestsChan = client.channels.cache.get(client.config.requestsChannel)
            const nicksChan = client.channels.cache.get(client.config.nicknamesChannel)

            const nickResponse = modal.getTextInputValue('nickInput')
            const nameResponse = modal.getTextInputValue('nameInput')
            const cheatsResponse = modal.getTextInputValue('cheatsInput')
            const findResponse = modal.getTextInputValue('findInput')
            const buildResponse = modal.getTextInputValue('buildInput')

            client.db.set(modal.channel.id, nickResponse)

            modal.member.setNickname(nickResponse).catch((e)=>{console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[31mERROR \x1b[37m| \x1b[36mПроизошла Ошибка > \x1b[31m'+e+'\x1b[0m')})            
            const adminEmbed = new MessageEmbed()
            .setColor('#00ffe1')
            .setAuthor({
                name: 'Заявка Участника'
            })
            .setDescription('**Ник участника: <@'+modal.user.id+'>, канал: <#'+modal.channel.id+'>\nДля принятия / отклонения заявки перейдите к каналу.**')
            .addFields(
                { 
                    name: 'Никнейм Игрока:', 
                    value: '`'+nickResponse+'`',
                },
                { 
                    name: 'Имя / Возраст Игрока:',
                    value: '`'+nameResponse+'`',
                },
                { 
                    name: 'Отношение к Читам:',
                    value: '`'+cheatsResponse+'`',
                },
                { 
                    name: 'Как нашёл сервер:',
                    value: '`'+findResponse+'`',
                },
                { 
                    name: 'Цель на Проекте:',
                    value: '`'+buildResponse+'`',
                },
                )
                .setThumbnail(modal.user.avatarURL())
                .setFooter({
                    text: client.config.footerText
                })
                const adminRow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setURL(`https://discord.com/channels/${modal.guild.id}/${modal.channel.id}`)
                    .setLabel('перейти к заявке')
                    .setEmoji('⚡')
                    .setStyle('LINK'),
                )
                requestsChan.send({
                    embeds: [adminEmbed],
                    components: [adminRow]
                })
                const nickEmbed = new MessageEmbed()
                .setColor('#00ffe1')
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

                const rqEmbed = new MessageEmbed()
                .setColor('#00ffe1')
                .setAuthor({
                    name: 'Заявка подана!'
                })
                .setDescription('**Заявка была отправлена админам на рассмотрение! Пожалуйста ожидайте!**')
                .addFields(
                    { 
                        name: 'Никнейм Игрока:', 
                        value: '`'+nickResponse+'`',
                    },
                    { 
                        name: 'Имя / Возраст Игрока:',
                        value: '`'+nameResponse+'`',
                    },
                    { 
                        name: 'Отношение к Читам:',
                        value: '`'+cheatsResponse+'`',
                    },
                    { 
                        name: 'Как нашёл сервер:',
                        value: '`'+findResponse+'`',
                    },
                    { 
                        name: 'Цель на Проекте:',
                        value: '`'+buildResponse+'`',
                    },
                    )
                .setThumbnail(client.config.thumbImage)
                .setFooter({
                    text: client.config.footerText
                })
                const remBtn = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('deleteChan')
                    .setLabel('удалить заявку')
                    .setEmoji('🥺')
                    .setStyle('DANGER'),
                )
                const admBtn = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('addPlayer')
                    .setLabel('принять заявку')
                    .setEmoji('🍑')
                    .setStyle('SUCCESS'),
                    new MessageButton()
                    .setCustomId('removePlayer')
                    .setLabel('отклонить заявку')
                    .setEmoji('🍆')
                    .setStyle('DANGER'),
                    )

                    modal.reply({
                        embeds: [rqEmbed],
                        components: [remBtn, admBtn]
                    }
                )
            }
        }
    }