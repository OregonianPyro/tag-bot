const Command = require('../base/command.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'edit',
            description: 'Edits the value of a previous tag.',
            usage: '{prefix}edit <tag name> <new value>',
            parameters: 'stringTagName, stringNewValue',
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
        if (!args[0]) return message.channel.send(`\`${this.client.emotes.x}\` You must provide the name of the tag  you want to edit.`);
        if (!args[1]) return message.channel.send(`\`${this.client.emotes.x}\`You must provide a value for the tag.`);
        if (!this.client.tags.hasProp(message.guild.id, args[0])) return message.channel.send(`\`${this.client.emotes.x}\` That tag does not exist.`);
        this.client.tags.deleteProp(message.guild.id, args[0]);
        this.client.tags.setProp(message.guild.id, args[0], args.slice(1).join(' '));
        return message.channel.send(`\`${this.client.emotes.check}\` Successfully edited the tag \`${args[0]}\``);
    };
};