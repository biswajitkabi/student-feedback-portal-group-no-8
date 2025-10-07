import React, { useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import StarRating from '../common/StarRating.jsx';
import { COLORS } from "../constants";


const AnalyticsView = ({ selectedCourse, courses, setActiveTab, setSelectedCourse }) => {
    // If no course is selected, and there are courses available, default to the first one.
    useEffect(() => {
        if (!selectedCourse && courses.length > 0) {
            setSelectedCourse(courses[0]);
        }
    }, [selectedCourse, courses, setSelectedCourse]);

    const handleCourseSelect = (e) => {
        const courseId = e.target.value;
        const course = courses.find(c => c.id.toString() === courseId);
        if (course) {
            setSelectedCourse(course);
        }
    };
    
    if (courses.length === 0) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-gray-600">No courses available to analyze.</p>
            </div>
        );
    }

    if (!selectedCourse) {
         return (
            <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading analytics...</p>
            </div>
        );
    }

    const course = selectedCourse;

    const barData = (course.distribution || []).map(d => ({
        name: `${d.rating} Star`,
        count: d.count,
        percentage: course.totalFeedbacks > 0
            ? ((d.count / course.totalFeedbacks) * 100).toFixed(1)
            : '0.0'
    }));

    const pieData = (course.distribution || []).map(d => ({
        name: `${d.rating} Star`,
        value: d.count
    }));

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
                       <div className="w-full md:w-auto">
                            <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mb-2">Select a Course to Analyze</label>
                            <select
                                id="course-select"
                                onChange={handleCourseSelect}
                                value={selectedCourse?.id || ''}
                                className="w-full md:w-96 p-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {courses.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                                ))}
                            </select>
                        </div>
                    <div className="text-right flex-shrink-0">
                        <div className="text-4xl font-bold text-blue-600">
                            {course.avgRating ? course.avgRating.toFixed(2) : '0.00'}
                        </div>
                        <StarRating rating={Math.round(course.avgRating || 0)} size={20} />
                        <p className="text-sm text-gray-600 mt-1">{course.totalFeedbacks || 0} ratings</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {(course.distribution || []).map((dist, idx) => (
                        <div key={dist.rating} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold" style={{ color: COLORS[4 - idx] }}>
                                {dist.count}
                            </div>
                            <StarRating rating={dist.rating} size={14} />
                            <div className="text-xs text-gray-600 mt-1">
                                {course.totalFeedbacks > 0
                                    ? ((dist.count / course.totalFeedbacks) * 100).toFixed(1)
                                    : '0.0'}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-800">Rating Distribution (Bar)</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                content={({ active, payload }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="bg-white p-3 shadow-lg rounded border border-gray-200">
                                                <p className="font-semibold">{payload[0].payload.name}</p>
                                                <p className="text-blue-600">Count: {payload[0].value}</p>
                                                <p className="text-gray-600">Percentage: {payload[0].payload.percentage}%</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <div className="flex items-center gap-2 mb-4">
                        <BarChart3 className="text-green-600" />
                        <h3 className="text-xl font-bold text-gray-800">Rating Distribution (Pie)</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <button
                onClick={() => setActiveTab('courses')}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition-colors"
            >
                Back to Courses
            </button>
        </div>
    );
};

export default AnalyticsView;


