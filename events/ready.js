//===============READY EVENT================
module.exports = {
    name: 'ready',
    async execute(client){
        const {MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
        setTimeout(() => {
            sendmsg()
        }, 3000)
        var sendChannel = client.channels.cache.get(client.config.mainEmbedChannel)
        console.log(client.user.username + " запустился!")
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
    const embed = new MessageEmbed()
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
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId('requestEmbed')
            .setLabel('Подать Заявку')
            .setEmoji(':tyanka:898590397285171211')
            .setStyle('SUCCESS')
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