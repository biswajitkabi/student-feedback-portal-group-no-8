import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoursesModule } from './courses/courses.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const databaseUrl = process.env.DATABASE_URL;
        
        if (!databaseUrl) {
          throw new Error('DATABASE_URL environment variable is not set');
        }

        // Parse the DATABASE_URL
        const url = new URL(databaseUrl);
        
        console.log('Connecting to database:', {
          host: url.hostname,
          port: url.port || '5432',
          database: url.pathname.slice(1),
          username: url.username,
        });

        return {
          type: 'postgres' as const,
          host: url.hostname,
          port: parseInt(url.port) || 5432,
          username: url.username,
          password: decodeURIComponent(url.password),
          database: url.pathname.slice(1),
          ssl: {
            rejectUnauthorized: false,
          },
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: false, // Always false in production
          logging: true,
        };
      },
    }),
    CoursesModule,
    FeedbackModule,
  ],
})
export class AppModule {}