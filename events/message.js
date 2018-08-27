module.exports = class {
    constructor(client) {
        this.client = client;
    };
    
    /**
     * @param {object} message The message received.
     */
    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type !== 'text') return;
        if (message.content.indexOf('+') !== 0) return;
        const args = message.content.split(' ').slice(1);
        let command = message.content.split(' ')[0];
        command = command.slice('+'.length).toLowerCase();
        if (!this.client.commands.has(command) && !this.client.aliases.has(command) && !this.client.tags.hasProp(message.guild.id, command)) return;
        if (this.client.commands.has(command) || this.client.aliases.has(command)) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
            if (!cmd) return;
            try {
                await cmd.run(message, args);
            } catch (e) {
                message.react(this.client.emotes.x);
                message.channel.send(`\`ERROR\`\`\`\`${e.message}\`\`\``);
                return console.error(e.stack);
            };
        } else if (this.client.tags.hasProp(message.guild.id, command)) {
            return message.channel.send(this.client.tags.getProp(message.guild.id, command));
        };
    };
};