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
        <div className="min-h-screen py-12">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="page-title" style={{ color: 'white', WebkitTextFillColor: 'white' }}>
                        Profile Settings
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', marginTop: '0.5rem' }}>
                        Manage your account information
                    </p>
                </div>

                <div className="card">
                    {message && (
                        <div className={message === 'success' ? 'alert-success mb-6' : 'alert-error mb-6'}>
                            {message === 'success' ? '✓ Profile updated successfully!' : '✗ Failed to update profile'}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="form-label">
                                Full Name
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
                            <label htmlFor="email" className="form-label">
                                Email Address
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
                            <label htmlFor="password" className="form-label">
                                New Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                className="input-field"
                                placeholder="Leave blank to keep current password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <p style={{ marginTop: '0.5rem', fontSize: '13px', color: '#a0aec0' }}>
                                Only fill this if you want to change your password
                            </p>
                        </div>

                        <button type="submit" className="btn-primary">
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;
