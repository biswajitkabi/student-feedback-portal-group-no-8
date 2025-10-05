import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  create(@Body() createFeedbackDto: CreateFeedbackDto) {
    return this.feedbackService.create(createFeedbackDto);
  }

  @Get('course/:courseId')
  findByCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.feedbackService.findByCourse(courseId);
  }

  @Get('stats/:courseId')
  getCourseStats(@Param('courseId', ParseIntPipe) courseId: number) {
    return this.feedbackService.getCourseStats(courseId);
  }

  @Get('stats')
  getAllCoursesWithStats() {
    return this.feedbackService.getAllCoursesWithStats();
  }
}