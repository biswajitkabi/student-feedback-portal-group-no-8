import React, { useState, useEffect } from 'react';

// Constants
import { API_BASE_URL, studentUsers, adminUser } from "./components/constants";


// Component Imports
import Navbar from './components/layout/Navbar';
import CoursesView from './components/views/CoursesView';
import AnalyticsView from './components/views/AnalyticsView';
import AdminView from './components/views/AdminView';
import LoginView from './components/views/LoginView';
import FeedbackFormModal from './components/modals/FeedbackFormModal';
import CourseFormModal from './components/modals/CourseFormModal';
import LoginFormModal from './components/modals/LoginFormModal';

const StudentFeedbackPortal = () => {
    // State Management
    const [activeTab, setActiveTab] = useState('courses');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    const [showCourseForm, setShowCourseForm] = useState(false);
    const [loginMode, setLoginMode] = useState(null);
    const [userRole, setUserRole] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [feedbackForm, setFeedbackForm] = useState({ courseId: null, rating: 0, comment: '' });
    const [courseForm, setCourseForm] = useState({ id: null, name: '', code: '', instructor: '' });
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });
    const [editMode, setEditMode] = useState(false);

    // Data Fetching
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

    useEffect(() => {
        if (userRole) {
            fetchCoursesWithStats();
        }
    }, [userRole]);

    // Handlers
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

    // Form and Modal Control
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

    const handleCloseFeedbackForm = () => {
        setShowFeedbackForm(false);
        setFeedbackForm({ courseId: null, rating: 0, comment: '' });
    };

    const handleCloseLoginForm = () => {
        setLoginMode(null);
        setLoginForm({ email: '', password: '' });
    };

    // Authentication
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

    const viewProps = {
        courses, loading, error, fetchCoursesWithStats, userRole,
        setSelectedCourse, setActiveTab, setFeedbackForm, setShowFeedbackForm,
        setCourseForm, setEditMode, setShowCourseForm, openEditForm, handleDeleteCourse,
    };

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
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} handleLogout={handleLogout} />

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

