import { Feedback } from '../../feedback/entities/feedback.entity';
export declare class Course {
    id: number;
    name: string;
    code: string;
    instructor: string;
    createdAt: Date;
    updatedAt: Date;
    feedbacks: Feedback[];
}
