import { Course } from '../../courses/entities/course.entity';
export declare class Feedback {
    id: number;
    courseId: number;
    rating: number;
    comment: string;
    createdAt: Date;
    course: Course;
}
