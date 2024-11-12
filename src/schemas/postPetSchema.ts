export const postPetSchemaTs = {
    body:{
        type: 'object',
        properties: {
            name: { type: 'string', minLength: 1, maxLength: 50 },
            age: { type: 'number', minimum: 0 },
            weightInKg: { type: 'number', minimum: 0 },
        },
        required: ['name', 'age', 'weightInKg'],
        additionalProperties: false
    }
} as const