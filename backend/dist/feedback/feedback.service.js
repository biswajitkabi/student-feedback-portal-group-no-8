"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const feedback_entity_1 = require("./entities/feedback.entity");
const course_entity_1 = require("../courses/entities/course.entity");
let FeedbackService = class FeedbackService {
    feedbackRepository;
    courseRepository;
    constructor(feedbackRepository, courseRepository) {
        this.feedbackRepository = feedbackRepository;
        this.courseRepository = courseRepository;
    }
    async create(createFeedbackDto) {
        const course = await this.courseRepository.findOne({
            where: { id: createFeedbackDto.courseId }
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${createFeedbackDto.courseId} not found`);
        }
        const feedback = this.feedbackRepository.create(createFeedbackDto);
        return await this.feedbackRepository.save(feedback);
    }
    async findByCourse(courseId) {
        return await this.feedbackRepository.find({
            where: { courseId },
            order: { createdAt: 'DESC' }
        });
    }
    async getCourseStats(courseId) {
        const course = await this.courseRepository.findOne({
            where: { id: courseId }
        });
        if (!course) {
            throw new common_1.NotFoundException(`Course with ID ${courseId} not found`);
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
    async getAllCoursesWithStats() {
        const courses = await this.courseRepository.find();
        const coursesWithStats = await Promise.all(courses.map(async (course) => {
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
        }));
        return coursesWithStats;
    }
};
exports.FeedbackService = FeedbackService;
exports.FeedbackService = FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(feedback_entity_1.Feedback)),
    __param(1, (0, typeorm_1.InjectRepository)(course_entity_1.Course)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FeedbackService);
//# sourceMappingURL=feedback.service.js.map