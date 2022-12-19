(class RabbitApp {

    #url;

    #connection;

    #requestQueueName;

    #responseQueueName;

    constructor(serviceName, { url, workerId = '' }) {
        this.#url = url;
        this.#requestQueueName = `${serviceName}:request`;
        this.#responseQueueName = `${serviceName}:response${workerId}`;
    }

    get connection() {
        return this.#connection;
    }

    async createConnection() {
        const { amqplib } = npm;
        if (!this.#connection) {
            this.#connection = await amqplib.connect(this.#url);

            for (const event of ['error', 'close']) {
                this.#connection.on(event, () => {
                    this.#connection = null;
                    this.createConnection(amqplib);
                });
            }
        }

        return this.#connection;
    }

    async createChannels() {
        const connection = await this.createConnection();
        this.requestChannel = await connection.createChannel();
        this.responseChannel = await connection.createChannel();

        const opt = { autoDelete: true, durable: true, noAck: true }
        await this.requestChannel.assertQueue(this.#requestQueueName, opt);
        await this.responseChannel.assertQueue(this.#responseQueueName, opt);
    }

    async deleteQueues() {
        await this.requestChannel.deleteQueue(this.#requestQueueName);
        await this.responseChannel.deleteQueue(this.#responseQueueName);
    }

    async close(deleteQueues = false) {
        if (deleteQueues) {
            await this.deleteQueues();
        }
        await this.requestChannel.close();
        await this.responseChannel.close();
        await this.#connection.close();
    }
})