module.exports = class {
    constructor(client) {
        this.client = client;
    };

    /**
     * @param {object} guild The guild the bot joined.
     */
    async run(guild) {
        this.client.tags.set(guild.id, {});
    };
};