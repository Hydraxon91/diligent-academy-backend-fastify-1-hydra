export const CONFIG = {
    dbConnectionString: process.env.DB_CONNECTION_STRING!,
    port: Number(process.env.PORT)!
} as const