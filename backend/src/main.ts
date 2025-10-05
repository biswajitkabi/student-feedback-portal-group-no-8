import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  // Debug logging for environment variables
  console.log('=== Environment Check ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PORT:', process.env.PORT);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  
  if (process.env.DATABASE_URL) {
    try {
      const url = new URL(process.env.DATABASE_URL);
      console.log('Database Connection Details:');
      console.log('- Protocol:', url.protocol);
      console.log('- Hostname:', url.hostname);
      console.log('- Port:', url.port || '5432');
      console.log('- Database:', url.pathname.slice(1));
      console.log('- Username:', url.username);
      console.log('- Password length:', url.password.length, 'chars');
    } catch (error) {
      console.error('ERROR: Invalid DATABASE_URL format:', error.message);
    }
  } else {
    console.warn('WARNING: DATABASE_URL not found!');
  }
  console.log('========================\n');

  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  const allowedOrigins = [
    'http://localhost:5173',
    'https://your-frontend-domain.onrender.com', // Add your production frontend URL
  ];
  
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? allowedOrigins 
      : 'http://localhost:5173',
    credentials: true,
  });
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`\n=== Application Started ===`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Server running on port: ${port}`);
  console.log(`Local URL: http://localhost:${port}`);
  console.log('===========================\n');
}

bootstrap().catch((error) => {
  console.error('\n=== BOOTSTRAP ERROR ===');
  console.error('Failed to start application:', error);
  console.error('======================\n');
  process.exit(1);
});