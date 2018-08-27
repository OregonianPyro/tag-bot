const Command = require('../base/command.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'rename',
            description: 'Edits the name of a previous tag.',
            usage: '{prefix}rename <tag name> <new name>',
            parameters: 'stringTagName, stringNewName',
            enabled: true,
            aliases: []
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
        if (!args[0]) return message.channel.send(`\`${this.client.emotes.x}\` You must provide the old name of the tag you want to rename.`);
        if (!args[1]) return message.channel.send(`\`${this.client.emotes.x}\`You must provide a new name for the tag.`);
        if (!this.client.tags.hasProp(message.guild.id, args[0])) return message.channel.send(`\`${this.client.emotes.x}\` That tag does not exist.`);
        if (this.client.tags.hasProp(message.guild.id, args[1])) return message.channel.send(`\`${this.client.emotes.x}\`A tag with the name \`${args[1]}\` already exists.`);
        this.client.tags.setProp(message.guild.id, args[1], this.client.tags.getProp(message.guild.id, args[0]));
        this.client.tags.deleteProp(message.guild.id, args[0]);
        return message.channel.send(`\`${this.client.emotes.check}\` Successfully renamed the tag \`${args[0]}\` to \`${args[1]}\``);
    };
};