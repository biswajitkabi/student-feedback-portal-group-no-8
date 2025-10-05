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
        const isProduction = process.env.NODE_ENV === 'production';
        
        // If DATABASE_URL exists (Render), use it
        if (process.env.DATABASE_URL) {
          return {
            type: 'postgres' as const,
            url: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false,
            },
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false, // IMPORTANT: false in production
            logging: true,
          };
        }
        
        // Otherwise use individual environment variables (local development)
        return {
          type: 'postgres' as const,
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'Biswa@711',
          database: process.env.DB_NAME || 'student_feedback_db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: !isProduction, // false in production
          logging: true,
        };
      },
    }),
    CoursesModule,
    FeedbackModule,
  ],
})
export class AppModule {}