//Gets dependencies from /node_modules
const Discord = require("discord.js");
const env = require("dotenv").config();

//gets TOKEN from local .env
const TOKEN = process.env.TOKEN;

//Create client
const client = new Discord.Client({
    //Specifies intents
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
});

client.on("ready",()=>{
    console.log(`Logged in as ${client.user.tag}`)
});

client.on("messageCreate",(message) => {
    if (message.content == "hi"){
        message.reply("Hello World!")
    }
})

//Logs in with token
client.login(TOKEN);