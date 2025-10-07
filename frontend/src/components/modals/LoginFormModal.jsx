import React from 'react';
import { X, ShieldCheck, UserCheck } from 'lucide-react';

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

export default LoginFormModal;
