async () => {
    if (domain.rabbit && typeof domain.rabbit === 'object') {
        for (const mq of Object.values(domain.rabbit)) {
            if (mq && mq.close) {
                await mq.close(true);
            }
        }
    }
}