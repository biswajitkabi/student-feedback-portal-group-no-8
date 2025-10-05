import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { FeedbackModule } from './feedback/feedback.module';

function looksLikeUrl(v?: string) {
  return typeof v === 'string' && v.startsWith('postgres');
}

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): TypeOrmModuleOptions => {
        const envDatabaseUrl = config.get<string>('DATABASE_URL');
        const dbHost = config.get<string>('DB_HOST');
        const envDbUrlFromHost = looksLikeUrl(dbHost) ? dbHost : undefined;

        // choose url in this order:
        // 1) DATABASE_URL
        // 2) DB_HOST (if someone accidentally put full URL there)
        // 3) fallback to components (host/port/username/...)
        const databaseUrl = envDatabaseUrl || envDbUrlFromHost;

        if (databaseUrl) {
          console.log('Using full DATABASE URL for DB connection (env var used):', envDatabaseUrl ? 'DATABASE_URL' : 'DB_HOST(as url)');
          // parse host for debug logging (not for connection)
          try {
            const parsed = new URL(databaseUrl);
            console.log(`DB host parsed: ${parsed.hostname}`);
          } catch (e) {
            console.warn('Could not parse DATABASE_URL for debug:', e.message);
          }

          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: true,            // set false in production
            logging: ['error', 'warn'],
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          };
        }

        // else use individual env fields (local dev)
        console.log('Using individual DB env vars (local dev)');
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST', 'localhost'),
          port: parseInt(config.get<string>('DB_PORT', '5432'), 10),
          username: config.get<string>('DB_USERNAME', 'postgres'),
          password: config.get<string>('DB_PASSWORD', ''),
          database: config.get<string>('DB_NAME', 'student_feedback_db'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true, // set false in production
          logging: true,
        } as TypeOrmModuleOptions;
      },
    }),

    CoursesModule,
    FeedbackModule,
  ],
})
export class AppModule {}
