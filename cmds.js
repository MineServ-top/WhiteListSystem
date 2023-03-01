const conf = require('./config.json')
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const prefix = conf.prefix
var t = 0
//=====WhiteList====
function rcon(cmd,type,msg){
  const time = new Date()
  const Rcon = require('rcon')
  const o = {tcp:true,challenge:false}
  const conn = new Rcon(conf.RCon.IP, conf.RCon.Port, conf.RCon.Password, o)
  conn.on('auth', function(){
    console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mАвторизовался в RCon.\x1b[0m')
    console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mВыполняется команда > \x1b[33m'+cmd+'\x1b[0m')
    conn.send(cmd)
  }).on('response', function(str){
      if(type == '0'){
        console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mЧерез Discord выполнена команда | ответ > \x1b[33m'+str+'\x1b[0m')
        msg.channel.send({
          content: '**Response:**\n```'+str+'```',
        })
      }
      else{
        console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mОтвет > \x1b[33m'+str+'\x1b[0m')
      }
      conn.disconnect()
  }).on('error', function(err){
    console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[31mERROR \x1b[37m| \x1b[36mПроизошла Ошибка > \x1b[31m'+err+'\x1b[0m')
  }).on('end', function(){
    console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mСоединение закрыто.\x1b[0m')
  })
  conn.connect()
}
function wladd(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
  if (!nickname || !msg.member.permissions.has(PermissionsBitField.Flags.Administrator)  || !msg.member.roles.cache.has(client.db.get(conf.guildId))) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
  else{
    var cmd = conf.WhiteList.addCommand.replaceAll('$user',nickname)
    rcon(cmd,'1',msg)
    msg.channel.send({
      content: '**Игрок с ником "'+nickname+'" успешно добавлен в вайтлист!**',
    })
    console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mИгрок \x1b[33m'+nickname+' \x1b[36mбыл добавлен в вайтлист!\x1b[0m')
  }
}
function wlrem(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
 if (!nickname || !msg.member.permissions.has(PermissionsBitField.Flags.Administrator) || !msg.member.roles.cache.has(client.db.get(conf.guildId))) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
 else{
    var cmd = conf.WhiteList.remCommand.replaceAll('$user',nickname)
    rcon(cmd,'1',msg)
    console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mИгрок \x1b[33m'+nickname+' \x1b[36mбыл удалён из вайтлиста!\x1b[0m')
    msg.channel.send({
      content: '**Игрок с ником "'+nickname+'" успешно удалён из вайтлиста!**',
    })
  }
}
//=====BANS====
function wlban(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
  if (!nickname || !msg.member.permissions.has(PermissionsBitField.Flags.Administrator)) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
  else{
    var cmd = conf.WhiteList.banCommand.replaceAll('$user',nickname)
    rcon(cmd,'1',msg)
    msg.channel.send({
      content: '**Игрок с ником "'+nickname+'" успешно забанен!**',
    })
    console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mИгрок \x1b[33m'+nickname+' \x1b[36mбыл забанен!\x1b[0m')
  }
}

function wlunban(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const nickname = arggs.join(' ')
 if (!nickname || !msg.member.permissions.has(PermissionsBitField.Flags.Administrator)) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
 else{
  var cmd = conf.WhiteList.unbanCommand.replaceAll('$user',nickname)
  rcon(cmd,'1',msg)
  msg.channel.send({
    content: '**Игрок с ником "'+nickname+'" успешно разбанен!**',
  })
  console.log('\x1b[1m\x1b[33m'+time+' \x1b[37m| \x1b[32mINFO \x1b[37m| \x1b[36mИгрок \x1b[33m'+nickname+' \x1b[36mбыл разбанен!\x1b[0m')
  }
}

function wlcmd(r, msg){
  const arggs = msg.content.split(' ').slice(1)
  const cmd = arggs.join(' ')
  if (!cmd || !msg.member.permissions.has(PermissionsBitField.Flags.Administrator)) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
  else{
    rcon(cmd,'0',msg)
    msg.channel.send({
      content: '**Команда "'+cmd+'" выполнена на сервере!**',
    })
  }
}
function wlhelp(r, msg){
 if (!msg.member.permissions.has(PermissionsBitField.Flags.Administrator)) return msg.channel.send({content: '**У вас нет прав на выполнение команды, либо вы допустили ошибку!**',})
 else{
  const embed = new EmbedBuilder()
  .setColor(conf.embedCollor)
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
