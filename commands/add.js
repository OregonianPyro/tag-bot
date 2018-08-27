const Command = require('../base/command.js');

module.exports = class extends Command {
    constructor(client) {
        super(client, {
            name: 'add',
            description: 'Adds a new tag.',
            usage: '{prefix}add <tag name> <tag value>',
            parameters: 'stringTagName, stringTagValue',
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
        if (!args[0]) return message.channel.send(`\`${this.client.emotes.x}\` You must provide a name for the tag.`);
        if (!args[1]) return message.channel.send(`\`${this.client.emotes.x}\`You must provide a value for the tag.`);
        if (this.client.tags.hasProp(message.guild.id, args[0])) return message.channel.send(`\`${this.client.emotes.x}\`A tag with the name \`${args[0]}\` already exists.`);
        if (this.client.commands.has(args[0] || this.client.aliases.has(args[0]))) return message.channel.send(`\`${this.client.emotes.x}\`A command with name already exists on the bot.`);
        this.client.tags.setProp(message.guild.id, args[0], args.slice(1).join(' '));
        return message.channel.send(`\`${this.client.emotes.check}\` Successfully added the tag \`${args[0]}\`.`);
    };
};