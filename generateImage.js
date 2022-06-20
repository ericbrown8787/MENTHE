const Canvas = require("canvas");
const Discord = require("discord.js");
// const background = "https://i.ibb.co/fDfmZ8j/pixel-cat.png";
const background = "./img/elevators.jpg";
const dim = {
  height: 675,
  width: 1200,
  margin: 50,
};

const av = {
  size: 256,
  x: 480,
  y: 170,
};

const generateImage = async (member) => {
  let username = member.user.username;
  let discrim = member.user.discriminator;
  let avatarURL = member.user.displayAvatarURL({
    format: "png",
    dynamic: false,
    size: av.size,
  });

  const canvas = Canvas.createCanvas(dim.height, dim.width);
  const ctx = canvas.getContext("2d");

  //Draw Background
  const backimg = await Canvas.loadImage(background);
  ctx.drawImage(backimg, 0, 0);

  //Draw black tinted box
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillRect(
    dim.margin,
    dim.margin,
    dim.width - 2 * dim.margin,
    dim.height - 2 * dim.margin
  );

  //Clip path for circular avatar image
  const avimg = await Canvas.loadImage(avatarURL);
  ctx.save();

  ctx.beginPath();
  ctx.arc(
    av.x + av.size / 2,
    av.y + av.size / 2,
    av.size / 2,
    av.size / 2,
    0,
    Math.PI * 2,
    true
  );
  ctx.closePath();
  ctx.clip();

  ctx.drawImage(avimg, av.x, av.y);
  ctx.restore();

  //Text
  ctx.fillStyle = "white";
  ctx.textAlign = "center";

  //Draw in welcome
  ctx.font = "50px roboto";
  ctx.fillText("Welcome", dim.width / 2, dim.margin + 70);

  //Draw in username
  ctx.font = "60px Roboto";
  ctx.fillText(
    username + discrim,
    dim.width / 2,
    dim.height - dim.margin - 125
  );

  //Draw server
  ctx.font = "40px Roboto";
  ctx.fillText("to the server", dim.width / 2, dim.height - dim.margin - 50);

  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome.png"
  );

  return attachment;
};

module.exports = generateImage;
