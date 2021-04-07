const r = require('rethinkdb')
module.exports = async (client, member) => {
    const role = await r.table('settings').get(`${member.guild.id}`).run(client.con)
    member.roles.add(role.autoRole)
}