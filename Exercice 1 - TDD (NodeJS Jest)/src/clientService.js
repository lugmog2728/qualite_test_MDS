let clients = [];
let currentId = 1;

function resetClients() {
    clients = [];
    currentId = 1;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    return phoneRegex.test(phone);
}

function isEmailUnique(email, excludeId = null) {
    return !clients.some(client => client.email === email && client.id !== excludeId);
}

function addClient(data) {
    const { firstName, lastName, email, phone } = data;

    if (!firstName) throw new Error("firstName is required");
    if (!lastName) throw new Error("lastName is required");
    if (!email) throw new Error("email is required");
    if (!validateEmail(email)) throw new Error("email is invalid");
    if (phone && !validatePhone(phone)) throw new Error("phone is invalid");
    if (!isEmailUnique(email)) throw new Error("email must be unique");

    const newClient = {
        id: currentId++,
        firstName,
        lastName,
        email,
        phone,
        address: data.address,
        city: data.city,
        postalCode: data.postalCode,
    };

    clients.push(newClient);
    return newClient;
}

function updateClient(id, updates) {
    const client = clients.find(c => c.id === id);
    if (!client) throw new Error("client not found");

    if (updates.email) {
        if (!validateEmail(updates.email)) throw new Error("email is invalid");
        if (!isEmailUnique(updates.email, id)) throw new Error("email must be unique");
    }

    if (updates.phone && !validatePhone(updates.phone)) {
        throw new Error("phone is invalid");
    }

    Object.assign(client, updates);
    return client;
}

function deleteClient(id) {
    const index = clients.findIndex(c => c.id === id);
    if (index === -1) throw new Error("client not found");

    clients.splice(index, 1);
}

function getClients() {
    return clients;
}

module.exports = {
    resetClients,
    addClient,
    updateClient,
    deleteClient,
    getClients,
};
