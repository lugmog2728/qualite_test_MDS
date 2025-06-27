const mockStripeInstance = {
    customers: {
        create: jest.fn(async (data) => ({
            id: "123",
            email: data.email,
            name: data.name,
        })),
        retrieve: jest.fn(async (id) => {
            if (id === "nonexistent") throw new Error("Customer not found");
            return { id, email: "mock@example.com", name: "Mock User", deleted: false };
        }),
        update: jest.fn(async (id, data) => ({ id, ...data })),
        del: jest.fn(async (id) => ({ id, deleted: id !== "undeletable" })),
    },
};

jest.mock("stripe", () => {
    return jest.fn(() => mockStripeInstance);
});

const {
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer,
} = require("./stripeService");

describe("customerService", () => {
    describe("createCustomer", () => {
        it("should create a customer", async () => {
            const customer = await createCustomer({ email: "test@example.com", name: "John Doe" });
            expect(customer).toHaveProperty("id");
            expect(mockStripeInstance.customers.create).toHaveBeenCalledWith({
                email: "test@example.com",
                name: "John Doe",
            });
        });

        it("should throw with invalid data", async () => {
            await expect(createCustomer(null)).rejects.toThrow("Invalid data");
        });
    });

    describe("getCustomer", () => {
        it("should return a customer", async () => {
            const customer = await getCustomer("123");
            expect(customer).toHaveProperty("id", "123");
        });

        it("should throw for missing ID", async () => {
            await expect(getCustomer()).rejects.toThrow("Customer ID is required");
        });

        it("should throw if customer doesn't exist", async () => {
            await expect(getCustomer("nonexistent")).rejects.toThrow("Failed to get customer");
        });
    });

    describe("updateCustomer", () => {
        it("should update customer data", async () => {
            const updated = await updateCustomer("123", { name: "Jane Doe" });
            expect(updated.name).toBe("Jane Doe");
        });

        it("should throw on missing ID", async () => {
            await expect(updateCustomer(null, {})).rejects.toThrow("Customer ID is required");
        });

        it("should throw on invalid data", async () => {
            await expect(updateCustomer("123", null)).rejects.toThrow("Invalid data");
        });
    });

    describe("deleteCustomer", () => {
        it("should delete a customer", async () => {
            const result = await deleteCustomer("123");
            expect(result).toBe(true);
        });

        it("should throw if deletion fails", async () => {
            await expect(deleteCustomer("undeletable")).rejects.toThrow("Customer could not be deleted");
        });
    });
});
