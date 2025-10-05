import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CourseStatsDto } from './dto/course-stats.dto';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private feedbackRepository: Repository<Feedback>,
    @InjectRepository(Course)
    private courseRepository: Repository<Course>,
  ) {}

  async create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback> {
    const course = await this.courseRepository.findOne({
      where: { id: createFeedbackDto.courseId }
    });
    
    if (!course) {
      throw new NotFoundException(`Course with ID ${createFeedbackDto.courseId} not found`);
    }

    const feedback = this.feedbackRepository.create(createFeedbackDto);
    return await this.feedbackRepository.save(feedback);
  }

  async findByCourse(courseId: number): Promise<Feedback[]> {
    return await this.feedbackRepository.find({
      where: { courseId },
      order: { createdAt: 'DESC' }
    });
  }

  async getCourseStats(courseId: number): Promise<CourseStatsDto> {
    const course = await this.courseRepository.findOne({
      where: { id: courseId }
    });
    
    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    const feedbacks = await this.feedbackRepository.find({
      where: { courseId }
    });

    const totalFeedbacks = feedbacks.length;
    const avgRating = totalFeedbacks > 0
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedbacks
      : 0;

    const distribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: feedbacks.filter(f => f.rating === rating).length
    }));

    return {
      courseId,
      avgRating: Math.round(avgRating * 100) / 100,
      totalFeedbacks,
      distribution
    };
  }

  async getAllCoursesWithStats(): Promise<any[]> {
    const courses = await this.courseRepository.find();
    
    const coursesWithStats = await Promise.all(
      courses.map(async (course) => {
        const stats = await this.getCourseStats(course.id);
        return {
          id: course.id,
          name: course.name,
          code: course.code,
          instructor: course.instructor,
          avgRating: stats.avgRating,
          totalFeedbacks: stats.totalFeedbacks,
          distribution: stats.distribution
        };
      })
    );

    return coursesWithStats;
  }
}