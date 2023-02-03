//===============RCON METHOD================
module.exports = {
    name: 'rcon',
    async execute(cmd,conf,msg,t){
        const time = new Date()
        const Rcon = require('rcon')
        const o = {tcp:true,challenge:false}
        const conn = new Rcon(conf.RCon.IP, conf.RCon.Port, conf.RCon.Password, o)
        conn.on('auth', function(){
            console.log("Authenticated")
            console.log(time+" | Running command | "+cmd)
            conn.send(cmd)
        }).on('response', function(str){
            if(t == 'wlcmd'){

                console.log(time+" | Response | "+str)
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
}