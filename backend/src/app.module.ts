import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    // Load .env globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // ✅ Use forRootAsync to handle Render's DATABASE_URL cleanly
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');

        // If DATABASE_URL is not provided, fallback to local dev settings
        if (databaseUrl) {
          console.log('Using DATABASE_URL for connection');
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: true, // ❗Set false in production
            ssl: {
              rejectUnauthorized: false, // required for Render Postgres SSL
            },
          };
        } else {
          console.log('Using local DB connection');
          return {
            type: 'postgres',
            host: config.get<string>('DB_HOST', 'localhost'),
            port: parseInt(config.get<string>('DB_PORT', '5432')),
            username: config.get<string>('DB_USERNAME', 'postgres'),
            password: config.get<string>('DB_PASSWORD', 'Biswa@711'),
            database: config.get<string>('DB_NAME', 'student_feedback_db'),
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: true, // Set false in production
            logging: true,
          };
        }
      },
    }),

    CoursesModule,
    FeedbackModule,
  ],
})
export class AppModule {}
