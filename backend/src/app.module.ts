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
    TypeOrmModule.forRoot({
      type: 'postgres',
      // HARDCODED for testing - Replace with your actual values
      host: 'dpg-d3h78dvfte5s73cmvg3g-a.oregon-postgres.render.com',
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
      extra: {
        max: 10,
        connectionTimeoutMillis: 20000,
      },
    }),
    CoursesModule,
    FeedbackModule,
  ],
})
export class AppModule {}