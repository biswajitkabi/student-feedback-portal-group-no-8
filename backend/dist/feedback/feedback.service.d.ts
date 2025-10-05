import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { Course } from '../courses/entities/course.entity';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { CourseStatsDto } from './dto/course-stats.dto';
export declare class FeedbackService {
    private feedbackRepository;
    private courseRepository;
    constructor(feedbackRepository: Repository<Feedback>, courseRepository: Repository<Course>);
    create(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>;
    findByCourse(courseId: number): Promise<Feedback[]>;
    getCourseStats(courseId: number): Promise<CourseStatsDto>;
    getAllCoursesWithStats(): Promise<any[]>;
}
