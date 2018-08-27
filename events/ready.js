module.exports = class {
    constructor(client) {
        this.client = client;
    };

    async run() {
        console.log(this.client.chalk.greenBright(`${this.client.user.tag} | Connected successfully with ${this.client.guilds.size} guilds.`));
    };
};