const Discord = require('discord.js')
const config = require('../config/bot.json')
const request = require('request')

//8Ball
exports.ball = (bot, message, args)=>{

    if(!args[0]) return message.channel.send(`Please ask a question`);

    answers = [
        `It is certain.`,
        `It is decidedly so.`,
        `Without a doubt.`,
        `Yes - definitely.`,
        `Yes - definitely.`,
        `As I see it, yes.`,
        `Most likely.`,
        `Outlook good.`,
        `Yes.`,
        `Signs point to yes.`,
        `Reply hazy, try again.`,
        `Ask again later.`,
        `Better not tell you now.`,
        `Cannot predict now.`,
        `Concentrate and ask again.`,
        `Don't count on it.`,
        `My reply is no.`,
        `My sources say no.`,
        `Outlook not so good.`,
        `Outlook not so good.`
    ]

    //Get Random Int
    let int = Math.round(Math.random()*19)

    //Answer
    let embed = new Discord.RichEmbed()
    .setTitle(args.join(" ").toUpperCase())
    .setDescription(answers[int])
    message.channel.send(embed)
    return;

}

//Roll the Dice
module.exports.dice = async (bot, message, args) =>{

    if(isNaN(args[0])) return message.channel.send(`You can't roll ${args.join(" ")}`)

    if(!args[0]){
        var number = 6;
    } else {
        var number = Math.round(args[0]);
    }

    let int = Math.floor(Math.random()*number)+1

    let embed = new Discord.RichEmbed()
    .setDescription(`You rolled a ${int} 🎲 : 1d${number}`)
    .setFooter(`Rolled by ${message.author.username}`,message.author.avatarURL)
    message.channel.send(embed)
    
}

//shoot
exports.shoot = (bot , message, args) =>{
    
    //Check For Permission
    let permissions = message.member.permissions;
    canDo = permissions.has("MANAGE_MESSAGES")
    if(!canDo) return message.reply("You do not have permission to do this")

    message.delete()

    message.channel.send({
    file: "https://i.imgflip.com/2dpsw0.jpg" // Or replace with FileOptions object
});
    
};

//Dog
exports.dog = (bot, message, args)=>{
    request('https://random.dog/woof.json', function (error, response, body) {

        if(response.statusCode != 200) return message.channel.send(`Error - Code: ${response.statusCode}`)

        data = JSON.parse(body)
        message.channel.send(data.url)

    });
}

//Shibe
exports.shibe = (bot, message, args)=>{
    request('http://shibe.online/api/shibes', function (error, response, body) {

        if(response.statusCode != 200) return message.channel.send(`Error - Code: ${response.statusCode}`)

        data = JSON.parse(body)
        message.channel.send(data[0])

    });
}


//Cat
exports.cat = (bot, message, args)=>{
    request('http://aws.random.cat/meow', function (error, response, body) {

        if(response.statusCode != 200) return message.channel.send(`Error - Code: ${response.statusCode}`)

        data = JSON.parse(body)
        message.channel.send(data.file)

    });
}

//Duck
exports.duck = (bot, message, args)=>{
    request('https://random-d.uk/api/v1/random', function (error, response, body) {

        if(response.statusCode != 200) return message.channel.send(`Error - Code: ${response.statusCode}`)

        data = JSON.parse(body)
        message.channel.send(data.url)

    });
}


