import React from 'react';
import StarRating from '../common/StarRating';

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

export default FeedbackFormModal;
