import React, { useState, useEffect } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Star, TrendingUp, MessageSquare, BarChart3, RefreshCw, Plus, Edit, Trash2, X, Save, LogOut, UserCheck, ShieldCheck, User } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000';
const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#7c3aed'];

// --- User Data ---
const studentUsers = [
    { email: 'biswajit@gmail.com', password: 'biswajit@123' },
    { email: 'priya@gmail.com', password: 'priya@123' },
    { email: 'aditya@gmail.com', password: 'aditya@123' },
];
const adminUser = { email: 'admin@gmail.com', password: 'admin@123' };


// Helper Component: StarRating
const StarRating = ({ rating, size = 20, interactive = false, onRate }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    size={size}
                    className={`${star <= rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                        } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
                    onClick={() => interactive && onRate && onRate(star)}
                />
            ))}
        </div>
    );
};

// Helper Component: CourseCard
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
                    <Edit size={16} />
                    Edit
                </button>
                <button
                    onClick={() => handleDeleteCourse(course.id, course.name)}
                    className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                    <Trash2 size={16} />
                    Delete
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
                    <TrendingUp size={16} />
                    View Analytics
                </button>
                <button
                    onClick={() => {
                        setFeedbackForm(prev => ({ ...prev, courseId: course.id }));
                        setShowFeedbackForm(true);
                    }}
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                    <MessageSquare size={16} />
                    Give Feedback
                </button>
            </div>
        )}

        <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">{course.totalFeedbacks || 0} total feedbacks</p>
        </div>
    </div>
);

// View Component: CoursesView
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

// View Component: AdminView
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

// View Component: AnalyticsView
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

// Modal Component: CourseFormModal
const CourseFormModal = ({ show, editMode, courseForm, setCourseForm, handleSave, handleClose, loading }) => {
    if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {editMode ? 'Edit Course' : 'Add New Course'}
                    </h3>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name *</label>
                        <input type="text" value={courseForm.name} onChange={(e) => setCourseForm(prev => ({ ...prev, name: e.target.value }))} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="e.g., Data Structures & Algorithms" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Course Code *</label>
                        <input type="text" value={courseForm.code} onChange={(e) => setCourseForm(prev => ({ ...prev, code: e.target.value }))} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="e.g., CS301" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor Name *</label>
                        <input type="text" value={courseForm.instructor} onChange={(e) => setCourseForm(prev => ({ ...prev, instructor: e.target.value }))} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="e.g., Dr. Sarah Johnson" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={handleSave} disabled={loading} className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2">
                            <Save size={18} />
                            {loading ? 'Saving...' : editMode ? 'Update Course' : 'Create Course'}
                        </button>
                        <button onClick={handleClose} disabled={loading} className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal Component: FeedbackFormModal
const FeedbackFormModal = ({ show, courses, feedbackForm, setFeedbackForm, handleSubmit, handleClose, loading }) => {
    if (!show) return null;
    const course = courses.find(c => c.id === feedbackForm.courseId);
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Submit Feedback</h3>
                {course && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                        <p className="font-semibold text-gray-800">{course.name}</p>
                        <p className="text-sm text-gray-600">{course.code}</p>
                    </div>
                )}
                <div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Your Rating *</label>
                        <div className="flex justify-center">
                            <StarRating rating={feedbackForm.rating} size={40} interactive={true} onRate={(rating) => setFeedbackForm(prev => ({ ...prev, rating }))} />
                        </div>
                        {feedbackForm.rating > 0 && (
                            <p className="text-center mt-2 text-gray-600">You rated: {feedbackForm.rating} star{feedbackForm.rating > 1 ? 's' : ''}</p>
                        )}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Comments (Optional)</label>
                        <textarea value={feedbackForm.comment} onChange={(e) => setFeedbackForm(prev => ({ ...prev, comment: e.target.value }))} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" rows={4} placeholder="Share your experience with this course..." />
                    </div>
                    <div className="flex gap-3">
                        <button onClick={handleSubmit} disabled={feedbackForm.rating === 0 || loading} className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold">
                            {loading ? 'Submitting...' : 'Submit Feedback'}
                        </button>
                        <button onClick={handleClose} disabled={loading} className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold disabled:opacity-50">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Modal Component: LoginFormModal
const LoginFormModal = ({ show, role, handleLogin, handleClose, loginForm, setLoginForm, loading }) => {
    if (!show) return null;

    const title = role === 'admin' ? 'Admin Login' : 'Student Login';
    const emailPlaceholder = role === 'admin' ? 'admin@gmail.com' : 'student@example.com';
    const icon = role === 'admin' ? <ShieldCheck size={18} /> : <UserCheck size={18} />;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                    <button onClick={handleClose} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                        <input type="email" value={loginForm.email} onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder={emailPlaceholder} />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                        <input type="password" value={loginForm.password} onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))} className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent" placeholder="••••••••" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button onClick={handleLogin} disabled={loading} className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold flex items-center justify-center gap-2">
                            {icon} Login
                        </button>
                        <button onClick={handleClose} disabled={loading} className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-semibold">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// View Component: LoginView (The initial screen)
const LoginView = ({ onAdminLoginClick, onStudentLoginClick }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col items-center justify-center p-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Welcome to the Student Feedback Portal</h1>
                <p className="text-lg text-slate-300 mt-4">Please select your role to continue</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg shadow-xl p-8 max-w-md w-full border border-slate-700">
                <div className="space-y-6">
                    <button
                        onClick={onStudentLoginClick}
                        className="w-full bg-blue-600 text-white py-4 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg flex items-center justify-center gap-3"
                    >
                        <User size={22} />
                        Login as Student
                    </button>
                    <button
                        onClick={onAdminLoginClick}
                        className="w-full bg-purple-600 text-white py-4 px-4 rounded-lg hover:bg-purple-700 transition-colors font-semibold text-lg flex items-center justify-center gap-3"
                    >
                        <ShieldCheck size={22} />
                        Login as Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

// Main App Component
const StudentFeedbackPortal = () => {
    const [activeTab, setActiveTab] = useState('courses');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [loginMode, setLoginMode] = useState(null); // null | 'student' | 'admin'
    const [userRole, setUserRole] = useState(null); // null, 'student', 'admin'
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [feedbackForm, setFeedbackForm] = useState({ courseId: null, rating: 0, comment: '' });
    const [courseForm, setCourseForm] = useState({ id: null, name: '', code: '', instructor: '' });
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [editMode, setEditMode] = useState(false);

    // Fetch courses from backend
    const fetchCoursesWithStats = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/feedback/stats`);
            if (!response.ok) throw new Error('Failed to fetch courses');
            const data = await response.json();
            setCourses(data);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching courses:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on component mount if a user is logged in
    useEffect(() => {
        if (userRole) {
            fetchCoursesWithStats();
        }
    }, [userRole]);

    // Course CRUD operations
    const handleSaveCourse = () => editMode ? handleUpdateCourse() : handleCreateCourse();

    const handleCreateCourse = async () => {
        if (!courseForm.name || !courseForm.code || !courseForm.instructor) {
            alert('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: courseForm.name, code: courseForm.code, instructor: courseForm.instructor }),
            });
            if (!response.ok) throw new Error('Failed to create course');
            alert('Course created successfully!');
            handleCloseCourseForm();
            await fetchCoursesWithStats();
        } catch (err) {
            alert(`Error creating course: ${err.message}\n\nPlease check if your backend server is running at ${API_BASE_URL} and that the endpoint is available. Also, check the server logs for more details.`);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateCourse = async () => {
        if (!courseForm.name || !courseForm.code || !courseForm.instructor) {
            alert('Please fill all fields');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${courseForm.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: courseForm.name, code: courseForm.code, instructor: courseForm.instructor }),
            });
            if (!response.ok) throw new Error('Failed to update course');
            alert('Course updated successfully!');
            handleCloseCourseForm();
            await fetchCoursesWithStats();
        } catch (err) {
            alert(`Error updating course: ${err.message}\n\nPlease check your backend server and its logs.`);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCourse = async (courseId, courseName) => {
        if (!confirm(`Are you sure you want to delete "${courseName}"?\nThis will also delete all feedback for this course.`)) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete course');
            alert('Course deleted successfully!');
            await fetchCoursesWithStats();
        } catch (err) {
            alert(`Error deleting course: ${err.message}\n\nPlease check your backend server and its logs.`);
        } finally {
            setLoading(false);
        }
    };

    // Form handling
    const openEditForm = (course) => {
        setCourseForm({ id: course.id, name: course.name, code: course.code, instructor: course.instructor });
        setEditMode(true);
        setShowCourseForm(true);
    };

    const handleCloseCourseForm = () => {
        setShowCourseForm(false);
        setEditMode(false);
        setCourseForm({ id: null, name: '', code: '', instructor: '' });
    };

    const handleSubmitFeedback = async () => {
        if (feedbackForm.rating === 0) return;
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(feedbackForm),
            });
            if (!response.ok) throw new Error('Failed to submit feedback');
            alert('Feedback submitted successfully!');
            handleCloseFeedbackForm();
            await fetchCoursesWithStats();
        } catch (err) {
            alert(`Error submitting feedback: ${err.message}\n\nPlease check your backend server and its logs.`);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseFeedbackForm = () => {
        setShowFeedbackForm(false);
        setFeedbackForm({ courseId: null, rating: 0, comment: '' });
    };

    // Auth handling
    const handleLogin = () => {
        if (loginMode === 'admin') {
            if (loginForm.email === adminUser.email && loginForm.password === adminUser.password) {
                setUserRole('admin');
                setActiveTab('courses');
                handleCloseLoginForm();
            } else {
                alert('Invalid admin credentials. Please try again.');
            }
        } else if (loginMode === 'student') {
            const user = studentUsers.find(
                (u) => u.email === loginForm.email && u.password === loginForm.password
            );
            if (user) {
                setUserRole('student');
                setActiveTab('courses');
                handleCloseLoginForm();
            } else {
                alert('Invalid student credentials. Please try again.');
            }
        }
    };

    const handleLogout = () => {
        setUserRole(null);
        setActiveTab('courses');
    };

    const handleCloseLoginForm = () => {
        setLoginMode(null);
        setLoginForm({ email: '', password: '' });
    };

    // Props for child components
    const viewProps = {
        courses, loading, error, fetchCoursesWithStats, userRole,
        setSelectedCourse, setActiveTab, setFeedbackForm, setShowFeedbackForm,
        setCourseForm, setEditMode, setShowCourseForm, openEditForm, handleDeleteCourse,
    };

    // Render login screen or main portal
    if (!userRole) {
        return (
            <>
                <LoginView
                    onAdminLoginClick={() => setLoginMode('admin')}
                    onStudentLoginClick={() => setLoginMode('student')}
                />
                <LoginFormModal
                    show={!!loginMode}
                    role={loginMode}
                    handleLogin={handleLogin}
                    handleClose={handleCloseLoginForm}
                    loginForm={loginForm}
                    setLoginForm={setLoginForm}
                    loading={loading}
                />
            </>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-gray-800">Student Feedback Portal</h1>
                        <div className="flex items-center gap-2">
                            <button onClick={() => setActiveTab('courses')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'courses' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Courses</button>
                            <button onClick={() => setActiveTab('analytics')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Analytics</button>
                            {userRole === 'admin' && (
                                <button onClick={() => setActiveTab('admin')} className={`px-4 py-2 rounded-lg font-semibold transition-colors ${activeTab === 'admin' ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Admin</button>
                            )}
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 font-semibold">
                                <LogOut size={16} /> Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === 'courses' && <CoursesView {...viewProps} />}
                {activeTab === 'analytics' && <AnalyticsView selectedCourse={selectedCourse} courses={courses} setActiveTab={setActiveTab} setSelectedCourse={setSelectedCourse} />}
                {activeTab === 'admin' && userRole === 'admin' && <AdminView {...viewProps} />}
            </main>

            <FeedbackFormModal show={showFeedbackForm} courses={courses} feedbackForm={feedbackForm} setFeedbackForm={setFeedbackForm} handleSubmit={handleSubmitFeedback} handleClose={handleCloseFeedbackForm} loading={loading} />
            <CourseFormModal show={showCourseForm} editMode={editMode} courseForm={courseForm} setCourseForm={setCourseForm} handleSave={handleSaveCourse} handleClose={handleCloseCourseForm} loading={loading} />
        </div>
    );
};

export default StudentFeedbackPortal;

