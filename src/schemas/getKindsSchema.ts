export const getKindsSchema = {
    type: 'array',
    items: {
        type: 'object',
        properties: {
            name: { type: 'string' },
        },
        required: ['name'],
    }
} as const