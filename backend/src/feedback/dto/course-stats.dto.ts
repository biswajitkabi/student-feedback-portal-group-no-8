export class CourseStatsDto {
  courseId: number;
  avgRating: number;
  totalFeedbacks: number;
  distribution: { rating: number; count: number }[];
}