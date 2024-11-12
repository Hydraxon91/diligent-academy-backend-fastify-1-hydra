export const getOwnerSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            age: { type: 'number', minimum: 0 }
        },
        required: ['name', 'age'],
    }
} as const