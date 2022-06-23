//Gets dependencies from /node_modules
const Discord = require("discord.js");
const env = require("dotenv").config();

const generateImage = require("./generateImage");

//gets TOKEN from local .env
const TOKEN = process.env.TOKEN;

//Create client
const client = new Discord.Client({
    //Specifies intents
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"

    ]
});

let bot = {
    client, 
    prefix: "n.",
    owners: ["545960289695170560"]
}

client.commands = new Discord.Collection();
client.events = new Discord.Collection();
client.loadEvents = (bot, reload) => require("./handlers/events")(bot,reload);
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot,reload);


client.loadEvents(bot,false);
client.loadCommands(bot,false);
module.exports = bot;

// //Channel ID variables
// const welcomeID = "988176523414634517"

// client.on("ready",()=>{
//     console.log(`Logged in as ${client.user.tag}`)
// });

// client.on("messageCreate",(message) => {
//     if (message.content == "hi"){
//         message.reply("Hello World!")
//     }
// })

// client.on("guildMemberAdd", async (member) => {
//     const img = await generateImage(member);
//     member.guild.channels.cache.get(welcomeID).send({
//         content: `<@${member.id}> Welcome to the server!`,
//         files: [img]
//     });
// });

//Logs in with token
client.login(TOKEN);