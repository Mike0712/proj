({
    access: 'public',
    method: async ({ room }) => {
        const clients = domain.chat.getRoom(room);

        return 'ok';
    }
})