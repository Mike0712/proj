async () => {
    if (application.worker.id === 'W1') {
        console.debug('Init rabbitmq');
    }
    const { url, services } = config.rabbitmq;

    for (const service of services) {
        if (!service.workers.includes(application.worker.id)) {
            continue;
        }
        const client = new domain.rabbit.RabbitApp(service.name, { url, workerId: application.worker.id });
        client.createChannels();
        domain.rabbit[service] = client;
    }
}