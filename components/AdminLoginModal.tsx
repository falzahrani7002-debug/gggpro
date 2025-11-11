
import React, { useState } from 'react';
import { XIcon, LockIcon } from './Icons';

interface AdminLoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

// In a real app, this would be a proper authentication flow.
const ADMIN_PASSWORD = 'admin'; 

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLoginSuccess();
    } else {
      setError('كلمة المرور غير صحيحة. حاول مرة أخرى.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md relative border border-yellow-400/50">
        <button onClick={onClose} className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-gray-400 hover:text-white">
          <XIcon />
        </button>
        <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-700">
                <LockIcon className="h-6 w-6 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-white mt-4">دخول لوحة التحكم</h3>
            <p className="text-gray-400 mt-2">الرجاء إدخال كلمة المرور للوصول إلى وضع الإدارة.</p>
        </div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور"
              className="w-full bg-gray-900 text-white rounded-md border-2 border-gray-600 focus:border-yellow-400 focus:ring-yellow-400 px-4 py-3 text-center"
              autoFocus
            />
          </div>
          {error && <p className="text-red-400 text-sm mt-2 text-center">{error}</p>}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-yellow-400 text-black font-bold py-3 px-4 rounded-md hover:bg-yellow-300 transition-colors duration-300"
            >
              دخول
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
