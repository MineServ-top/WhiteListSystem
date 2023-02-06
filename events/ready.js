//===============READY EVENT================
module.exports = {
    name: 'ready',
    async execute(client){
        const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
        setTimeout(() => {
            sendmsg()
        }, 3000)
        var sendChannel = client.channels.cache.get(client.config.mainEmbedChannel)
        time = new Date()
        console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mБот \x1b[33m'+client.user.username+' \x1b[36mзапустился.\x1b[0m')
        function clearOldMessages(sendChannel,nbr){
            return sendChannel.messages.fetch({limit: 99}).then(messages => {
                messages = messages.filter(msg => (msg.author.id == client.user.id && !msg.system))
                let promises = []
                let i = 0
                messages.each(mesasge => {
                    if (i >= nbr) {
                promises.push(
                    mesasge.delete().catch(function(error) {
                        return
                    })
                    )
                }
                i += 1
            })
            return Promise.all(promises).then(() => {
                return
            }) 
        }).catch(function(error) {
            return
        }
    )
}
function getLastMessage(sendChannel) {
    return sendChannel.messages.fetch({limit: 20}).then(messages => {
        messages = messages.filter()
        return messages.first()
    }).catch(function(error) {
        return
    })
}
async function sendmsg(){
    await clearOldMessages(sendChannel, 1)
    let startmessage = await getLastMessage(sendChannel)
    if (startmessage != undefined) {
        return startmessage
    }
    await clearOldMessages(sendChannel, 0)
    const embed = new EmbedBuilder()
    .setColor('#00ffe1')
    .setAuthor(
        {
        name: 'Подать Заявку'
        })
    .setDescription('**Нажмите на кнопку ниже, чтобы подать заявку для входа на сервер!**')
    .setThumbnail(client.config.thumbImage)
    .setFooter(
        {
            text: client.config.footerText
        })
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId('requestEmbed')
            .setLabel('Подать Заявку')
            .setEmoji('📝')
            .setStyle(ButtonStyle.Success)
            )
            sendChannel.send(
                {
                    embeds: [embed],
                    components: [row]
                }
            )
        }
    }
}