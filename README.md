# MineServ-WhiteList - лёгкий бот для вашего сервера!

У вас сервер с вайтлистом и вы не хотите возиться с плагинами на консоль в Discord? 
Тогда этот бот - ваш выбор!

Всё, что вам нужно для настройки бота - в конфиге 
```json
{
    "token": "",//токен бота
    "prefix": "!",//префикс бота

    "mainEmbedChannel": "",//канал, в который будет отправляться встраивание с кнопкой для создания канала

    "requestParent": "",//группа каналов, в которой будут создаваться каналы заявок
    "requestsChannel": "",//канал, в который будут отправляться заявки
    "nicknamesChannel": "",//канал, в который будут отправляться ники

    "adminRole": "",//роль администратора

    "thumbImage": "https://media.discordapp.net/attachments/1057078822375264349/1066034808523866223/WoWqWgf5J4U.png",
    "footerText": "MineServ.top | WhiteList",

    "RCon": {//конфигурация RCON
        "IP":"",//IP Rcon
        "Port":"",//Port Rcon
        "Password":""//Password Rcon
    },

    "WhiteList": {
        "addCommand":"wl add $user",//команда для добавления в вайтлист. $user - ник игрока
        "remCommand":"wl remove $user",//комана для удаления из вайтлиста. $user - ник игрока

        "banCommand":"ban $user",//команда для бана игрока. $user - ник игрока
        "unbanCommand":"pardon $user"//команда для разбана игрока. $user - ник игрока
    }
}
```
