import React from 'react';
import { X, Save } from 'lucide-react';

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

export default CourseFormModal;
