const Discord = require('discord.js')
const login = require('../auth/token.json')


//Create Announment channel
exports.broadcast = async (bot, message, args)=>{

    //Check For Permission
    if(message.author.id != `125687298485518336`) return message.reply("You do not have permission to do this")

    // Get Message args
    var mArgs = message.content.split(" ")
    var ann = mArgs.slice(1).join(" ");

    // Get Server
    let servers = bot.guilds

    // Check If Admin
    servers.forEach(async server => {

        if(!server.me.permissions.has('ADMINISTRATOR')) return console.log (`** Not an ADMIN in ${server.name}`)

        // Look for Janets Room
        var findChannel = server.channels.find(ch => ch.name === 'janets-room')
        if(findChannel){ 

            // Send Broadcast
            findChannel.send(ann)
            return console.log(`Broadcast Sent to ${server.name}`)
        }else if(!findChannel){

            // Create Channel
            server.createChannel(`janets-room`, `text`, [{
                id: server.id,
                deny: ['MANAGE_MESSAGES'],
                deny: ['SEND_MESSAGES']
              }])
            .then(ch =>{

                // Create Room
                console.log(`Created Room in ${server.name}`)

                // Send
                ch.send(ann)
                return console.log(`Broadcast Sent to ${server.name}`)
            })
            .catch(e =>{
                return console.log(`** Error Creating room in ${server.name}`)
            });
        }
    });
}