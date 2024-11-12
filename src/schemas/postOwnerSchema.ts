export const postOwnerSchema = {
    body:{
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 50 },
            age: { type: 'number', minimum: 0 },
        },
        required: ['name', 'age'],
        additionalProperties: false
    }
} as const