import React from 'react';
import { User, ShieldCheck } from 'lucide-react';

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

export default LoginView;
