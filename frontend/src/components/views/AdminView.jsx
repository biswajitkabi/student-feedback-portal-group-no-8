import React from 'react';
import { Plus } from 'lucide-react';
import CourseCard from '../cards/CourseCard.jsx';

const AdminView = ({ courses, loading, error, setCourseForm, setEditMode, setShowCourseForm, ...props }) => (
    <div className="space-y-6">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg p-6 text-white">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Admin Panel</h2>
                    <p className="text-purple-100">Manage courses</p>
                </div>
                <button
                    onClick={() => {
                        setCourseForm({ id: null, name: '', code: '', instructor: '' });
                        setEditMode(false);
                        setShowCourseForm(true);
                    }}
                    className="bg-white text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors flex items-center gap-2 font-semibold"
                >
                    <Plus size={18} />
                    Add Course
                </button>
            </div>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">Error: {error}</p>
            </div>
        )}

        {loading && courses.length === 0 ? (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                <p className="mt-4 text-gray-600">Loading courses...</p>
            </div>
        ) : courses.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-600 text-lg">No courses available.</p>
                <p className="text-gray-500 text-sm mt-2">Click "Add Course" to create your first course.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} userRole="admin" {...props} />
                ))}
            </div>
        )}
    </div>
);

export default AdminView;
