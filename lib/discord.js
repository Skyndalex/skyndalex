const fetch = require("node-fetch");
const { token } = require("../config.json");

const url = "https://discord.com/api/v8";

async function request(method, endpoint, data) {
    var body = {
        method: method,
        headers: {
            "content-type": "application/json",
            "authorization": `Bot ${token}`
        }
    };

    if (data) body["body"] = JSON.stringify(data);
    
    try {
        const resp = await fetch(url + endpoint, body);
        const json = await resp.json();

        return json;
    } catch(e) {
        return;
    }
}

exports.createMessage = (msg, data) => {
    return request("POST", "/channels/" + msg.channel_id + "/messages", data);
}

exports.getCurrentUser = () => {
    return request("GET", "/users/@me");
}

exports.getMessages = (channel, limit) => {
    return request("GET", "/channels/" + channel + "/messages?limit=" + limit);
}

exports.getMessage = (channel, message) => {
    return request("GET", "/channels/" + channel + "/messages/" + message);
}

exports.createReaction = (channel, message, emoji) => {
    return request("PUT", "/channels/" + channel + "/messages/" + message + "/reactions/" + emoji + "/@me");
}

exports.deleteReaction = (channel, message, emoji) => {
    return request("DELETE", "/channels/" + channel + "/messages/" + message + "/reactions/" + emoji + "/@me");
}

exports.deleteUserReaction = (channel, message, emoji, user) => {
    return request("DELETE", "/channels/" + channel + "/messages/" + message + "/reactions/" + emoji + "/" + user);
}

exports.editMessage = (channel, message) => {
    return request("DELETE", "/channels/" + channel + "/messages/" + message);
}

exports.deleteMessage = (channel, message) => {
    return request("DELETE", "/channels/" + channel + "/messages/" + message);
}

exports.bulkDeleteMessages = (channel, messages) => {
    return request("POST", "/channels/" + channel + "/messages/bulk-delete", messages);
}

exports.getGuild = (guild) => {
    return request("GET", "/guilds/" + guild);
}

exports.getGuildMembers = (guild) => {
    return request("GET", "/guilds/" + guild + "/members?limit=1000");
}

exports.getGuildMember = (guild, member) => {
    return request("GET", "/guilds/" + guild + "/members/" + member);
}

exports.kickMember = (guild, member) => {
    return request("DELETE", "/guilds/" + guild + "/members/" + member);
}

exports.banMember = (guild, member, reason, delete_message_days) => {
    return request("PUT", "/guilds/" + guild + "/bans/" + member + `?delete_message_days=${delete_message_days}&reason=${reason}`);
}

exports.getGuildChannels = (guild) => {
    return request("GET", "/guilds/" + guild + "/channels");
}

exports.getChannel = (channel) => {
    return request("GET", "/channels/" + channel);
}