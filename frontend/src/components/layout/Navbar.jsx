import React from 'react';
import { LogOut } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, userRole, handleLogout }) => {
    return (
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
    );
};

export default Navbar;