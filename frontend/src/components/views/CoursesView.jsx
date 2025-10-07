import React from 'react';
import { RefreshCw } from 'lucide-react';
import CourseCard from '../cards/CourseCard.jsx';

const CoursesView = ({ courses, loading, error, fetchCoursesWithStats, ...props }) => (
    <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Course Feedback System</h2>
                    <p className="text-blue-100">View course ratings and submit your feedback</p>
                </div>
                <button
                    onClick={fetchCoursesWithStats}
                    disabled={loading}
                    className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 font-semibold"
                >
                    <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
                    Refresh
                </button>
            </div>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">Error: {error}</p>
                <p className="text-sm mt-1">Make sure the backend server is running on http://localhost:3000</p>
            </div>
        )}

        {loading && courses.length === 0 ? (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
        ) : courses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">No courses available yet.</p>
                {props.userRole === 'admin' && <p className="text-gray-500 text-sm mt-2">Go to Admin panel to add courses.</p>}
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} {...props} />
                ))}
            </div>
        )}
    </div>
);

export default CoursesView;

