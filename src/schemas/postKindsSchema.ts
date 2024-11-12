export const postKindsSchema = {
    body:{
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 50 }
        },
        required: ['name'],
        additionalProperties: false
    }
} as const