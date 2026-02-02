import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await updateUser({ name, email, password: password || undefined });
            setMessage('success');
            setPassword('');
        } catch (error) {
            setMessage('error');
        }
    };

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Update your account information
                    </p>
                </div>

                <div className="card">
                    {message && (
                        <div className={`mb-6 px-4 py-3 rounded-lg text-sm ${message === 'success'
                                ? 'bg-green-50 border border-green-200 text-green-700'
                                : 'bg-red-50 border border-red-200 text-red-700'
                            }`}>
                            {message === 'success' ? 'Profile updated successfully!' : 'Failed to update profile'}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Full name
                            </label>
                            <input
                                id="name"
                                type="text"
                                className="input-field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                New password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="input-field"
                                placeholder="Leave blank to keep current password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p className="mt-1 text-xs text-gray-500">
                                Only fill this if you want to change your password
                            </p>
                        </div>

                        <button type="submit" className="btn-primary">
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
