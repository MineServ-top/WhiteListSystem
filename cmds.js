const conf = require('./config.json')
const {MessageEmbed} = require('discord.js')
const prefix = conf.prefix
var t = 0
//=====WhiteList====
function rcon(cmd,type,msg){
  const time = new Date()
  const Rcon = require('rcon')
  const o = {tcp:true,challenge:false}
  const conn = new Rcon(conf.RCon.IP, conf.RCon.Port, conf.RCon.Password, o)
  conn.on('auth', function(){
      console.log("Authenticated")
      console.log(time+" | Running command | "+cmd)
      conn.send(cmd)
  }).on('response', function(str){
      if(type == '0'){
        console.log(time+" | Response | "+str)
        msg.channel.send({
          content: '**Response:**\n```'+str+'```',
        })
      }
      else{
          console.log(time+" | Response | "+str)
      }
      conn.disconnect()
  }).on('error', function(err){
      console.log(time+" | Error | "+err)
  }).on('end', function(){
      console.log(time+" | Connection closed")
  })
  conn.connect()
}
function wladd(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
  if (!nickname || !msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
  else{
    var cmd = conf.WhiteList.add.replaceAll('$user',nickname)
    rcon(cmd,'1',msg)
    msg.channel.send({
      content: '**Игрок с ником "'+nickname+'" успешно добавлен в вайтлист!**',
    })
    console.info('Игрок "'+nickname+'" добавлен в вайтлист')
  }
}
function wlrem(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
 if (!nickname || !msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
 else{
    var cmd = conf.WhiteList.rem.replaceAll('$user',nickname)
    rcon(cmd,'1',msg)
    console.info('Игрок "'+nickname+'" удалён из ВЛ')
    msg.channel.send({
      content: '**Игрок с ником "'+nickname+'" успешно удалён из вайтлиста!**',
    })
  }
}
//=====BANS====
function wlban(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
  if (!nickname || !msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
  else{
    var cmd = conf.WhiteList.ban.replaceAll('$user',nickname)
    rcon(cmd,'1',msg)
    msg.channel.send({
      content: '**Игрок с ником "'+nickname+'" успешно забанен!**',
    })
    console.info('Игрок "'+nickname+'" забанен!')
  }
}

function wlunban(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
 if (!nickname || !msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
 else{
  var cmd = conf.WhiteList.unban.replaceAll('$user',nickname)
  rcon(cmd,'1',msg)
  msg.channel.send({
    content: '**Игрок с ником "'+nickname+'" успешно разбанен!**',
  })
  console.info('Игрок "'+nickname+'" разбенен!')
  }
}

function wlcmd(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const cmd = arggs.join(' ')
  if (!cmd || !msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
  else{
    rcon(cmd,'0',msg)
    msg.channel.send({
      content: '**Команда "'+cmd+'" выполнена на сервере!**',
    })
    console.info('Команда "'+cmd+'" выполнена через дискорд!')
  }
}
function wlhelp(r, msg){
 if (!msg.member.permissions.has("ADMINISTRATOR")) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
 else{
  const embed = new MessageEmbed()
  .setColor('#00ffe1')
  .setAuthor(
    {
      name: 'MineServ WhiteList'
    })
  .setDescription('**Помощь по командам бота**')
  .setThumbnail(conf.thumbImage)
  .addFields(
    { name: '**Префикс бота:**', value: '`'+prefix+'`'},
    { name: '**wlhelp:**', value: '`Информация о командах бота.`'},
    { name: '**wlcmd:**', value: '`Выполнить на сервере команду.`'},
    { name: '**wladd:**', value: '`Добавить игрока в ВЛ.`'},
    { name: '**wlrem:**', value: '`Удалить игрока из ВЛ.`'},
    { name: '**wlban:**', value: '`Забанить игрока на игровом сервере.`'},
    { name: '**wlunban:**', value: '`Разбанить игрока на игровом сервере.`'},
  )
  .setFooter(
    {
      text: conf.footerText
    })
    msg.channel.send(
      {
        embeds: [embed]
      }
    )
  }
}
var comms_list = [
{
  name: "wladd",
  out: wladd,
  about: "добавить в вайтлист"
},
{
  name: "wlrem",
  out: wlrem,
  about: "удалить из вайтлиста"
},
{
  name: "wlban",
  out: wlban,
  about: "забанить игрока"
},
{
  name: "wlunban",
  out: wlunban,
  about: "разбанить игрока"
},
{
  name: "wlhelp",
  out: wlhelp,
  about: "Хелп"
},
{
  name: "wlcmd",
  out: wlcmd,
  about: "выполнить команду"
}];

module.exports.comms = comms_list