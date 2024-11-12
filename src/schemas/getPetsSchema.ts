export const getPetsSchemaTs = {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        age: { type: 'number', minimum: 0 },
        weightInKg: { type: 'number', minimum: 0, nullable: true },
        kind: {type: 'string'}
      },
      required: ['name', 'age'],
    },
  } as const