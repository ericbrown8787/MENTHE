const { getFiles } = require("../util/functions");
const fs = require("fs");

module.exports = (bot, reload) => {
  const { client } = bot;

  fs.readdirSync("./commands/").forEach((category) => {
    let commands = getFiles(`./commands/${category}`, ".js");
    commands.forEach((fileName) => {
      if (reload) {
        delete require.cache[
          require.resolve(`../commands/${category}/${fileName}`)
        ];
      }
      const command = require(`../commands/${category}/${fileName}`);
      client.commands.set(command.name, command);
    });
  });
  console.log(`Loaded ${client.commands.size} commands`);
};
