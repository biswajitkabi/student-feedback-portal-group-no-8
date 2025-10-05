import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(createFeedbackDto: CreateFeedbackDto): Promise<import("./entities/feedback.entity").Feedback>;
    findByCourse(courseId: number): Promise<import("./entities/feedback.entity").Feedback[]>;
    getCourseStats(courseId: number): Promise<import("./dto/course-stats.dto").CourseStatsDto>;
    getAllCoursesWithStats(): Promise<any[]>;
}
