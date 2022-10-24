import { Module, Global, DynamicModule } from '@nestjs/common';
import { Connection } from './connection.provider';
import { createDatabaseProviders } from './databases.providers';

@Global()
@Module({
    //  statically declared Connection provider
    providers: [Connection]
})
export class DatabasesModule {
    static forRoot(options?): DynamicModule {
        // the dynamically generated repository providers
        const customProviders = createDatabaseProviders(options);
        return {
            module: DatabasesModule,
            // are exported from the module
            providers: [...customProviders],
            exports: [...customProviders],
        };
    }
}
