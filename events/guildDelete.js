module.exports = class {
    constructor(client) {
        this.client = client;
    };

    /**
     * @param {object} guild The guild the bot left.
     */
    async run(guild) {
        this.client.tags.delete(guild.id);
    };
};