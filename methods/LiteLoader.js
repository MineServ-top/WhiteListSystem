//===============LITELOADER METHOD================
module.exports = {
    name: 'LiteLoader',
    async execute(cmd,conf,msg,t){
        const time = new Date()
        if(t == 'wlcmd'){
            var str = mc.runcmdEx(cmd)
            console.log(time+" | Running command | "+cmd)
            console.log(time+" | Response | "+str.output)
            msg.channel.send({content:'out:\n ```'+str.out+'```'})
        }
        else{
            var str = mc.runcmdEx(cmd)
            console.log(time+" | Running command | "+cmd)
            console.log(time+" | Response | "+str.output)
        }
    }
}