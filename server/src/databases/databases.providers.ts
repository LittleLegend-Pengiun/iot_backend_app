import { DataSource } from "typeorm";

export const createDatabaseProviders = (options) => {
    const appDataSource = [
        {
            provide: 'DATA_SOURCE',
            useFactory: async () => {
                const dataSource = new DataSource({
                    type: 'postgres',
                    host: process.env.DB_HOST,
                    port: parseInt(process.env.DB_PORT),
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_DATABASE,
                    synchronize: true,
                    logging: true,
                    entities: [
                        __dirname + '/../**/*.entity{.ts,.js}',
                    ],
                    subscribers: [],
                    migrations: [],
                })
                return dataSource.initialize();
            }
        }
    ]
    return appDataSource;
}
