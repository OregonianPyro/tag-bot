const Command = require('../base/command.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'delete',
            description: 'Deletes a tag.',
            usage: '{prefix}delete <tag name>',
            parameters: 'stringTagName',
            enabled: true,
            aliases: ['remove', 'rem', 'del']
        });
    };

    /**
     * @param {object} message The received message.
     * @param {array} args Array of arguments.
     */
    async run(message, args) {
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            message.react(this.client.emotes.x);
            return message.channel.send(`\`${this.client.emotes.x}\` You must have the permission **MANAGE_GUILD** to run this command.**`);
        };
        if (!args[0]) return message.channel.send(`\`${this.client.emotes.x}\` You must provide the name of the tag  you want to delete.`);
        if (!this.client.tags.hasProp(message.guild.id, args[0])) return message.channel.send(`\`${this.client.emotes.x}\` That tag does not exist.`);
        this.client.tags.deleteProp(message.guild.id, args[0]);
        return message.channel.send(`\`${this.client.emotes.check}\` Successfully deleted the tag \`${args[0]}\``);
    };
};