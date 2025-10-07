import React from 'react';
import { Star, TrendingUp, MessageSquare, Edit, Trash2 } from 'lucide-react';
import StarRating from '../common/StarRating';

const CourseCard = ({ course, userRole, openEditForm, handleDeleteCourse, setSelectedCourse, setActiveTab, setFeedbackForm, setShowFeedbackForm }) => (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200">
        <div className="flex justify-between items-start mb-4">
            <div>
                <h3 className="text-xl font-bold text-gray-800">{course.name}</h3>
                <p className="text-sm text-gray-500">{course.code}</p>
                <p className="text-sm text-gray-600 mt-1">{course.instructor}</p>
            </div>
            <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                    {course.avgRating ? course.avgRating.toFixed(1) : '0.0'}
                </div>
                <StarRating rating={Math.round(course.avgRating || 0)} size={16} />
            </div>
        </div>

        {userRole === 'admin' ? (
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => openEditForm(course)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Edit size={16} /> Edit
                </button>
                <button
                    onClick={() => handleDeleteCourse(course.id, course.name)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Trash2 size={16} /> Delete
                </button>
            </div>
        ) : (
            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => {
                        setSelectedCourse(course);
                        setActiveTab('analytics');
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                    <TrendingUp size={16} /> View Analytics
                </button>
                <button
                    onClick={() => {
                        setFeedbackForm(prev => ({ ...prev, courseId: course.id }));
                        setShowFeedbackForm(true);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                    <MessageSquare size={16} /> Give Feedback
                </button>
            </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">{course.totalFeedbacks || 0} total feedbacks</p>
        </div>
    </div>
);

export default CourseCard;