class Command {
    constructor(client, {
        name = null,
        description = null,
        usage = null,
        parameters = null,
        enabled = false,
        aliases = []
    }) {
        this.client = client;
        this.help = { name, description, usage, parameters };
        this.conf = { enabled, aliases };
    };
};

module.exports = Command;