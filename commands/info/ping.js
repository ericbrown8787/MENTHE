module.exports = {
  name: "ping",
  category: "info",
  permissions: [],
  devOnly: false, //if true, then only users listed in "owners" array in index.js will be able to use this
  run: async ({ client, message, args }) => {
    message.reply("Pong.");
  },
};
