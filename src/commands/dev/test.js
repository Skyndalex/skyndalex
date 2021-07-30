const disbut = require("discord-buttons")
exports.run = async (client, message, args) => {
    let button = new disbut.MessageButton()
    .setStyle('green')
    .setLabel('Siema') 
    .setID('click_to_function');
  
 await message.channel.send('@czubix cfel', button.reply.send()) 
}
exports.help = {
	name: "test",
	aliases: ["ttt"],
	category: "dev",
}