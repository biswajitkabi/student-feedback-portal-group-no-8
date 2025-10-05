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
        const databaseUrl = process.env.DATABASE_URL;
        
        // If in production, use hardcoded Render database config
        if (isProduction) {
          return {
            type: 'postgres' as const,
            host: 'dpg-d3h78dvfte5s73cmvg3g-a.oregon-postgres.render.com', // UPDATE WITH YOUR ACTUAL REGION
            port: 5432,
            username: 'studentfeeback_user',
            password: 'q72epzAxeHJhWTZNl5LRN0ydbqE37tux',
            database: 'studentfeeback',
            ssl: {
              rejectUnauthorized: false,
            },
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            synchronize: false,
            logging: true,
          };
        }
        
        // Local development with individual environment variables
        return {
          type: 'postgres' as const,
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'Biswa@711',
          database: process.env.DB_NAME || 'student_feedback_db',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: !isProduction,
          logging: true,
        };
      },
    }),
    CoursesModule,
    FeedbackModule,
  ],
})
export class AppModule {}