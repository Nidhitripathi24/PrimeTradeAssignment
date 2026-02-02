import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 50
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link
                        to="/"
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            background: 'white',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                            letterSpacing: '-0.5px',
                            textDecoration: 'none'
                        }}
                    >
                        NotesApp
                    </Link>

                    <div className="flex items-center gap-3">
                        {user ? (
                            <>
                                <Link to="/" className="navbar-link">
                                    Dashboard
                                </Link>
                                <Link to="/profile" className="navbar-link">
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: 'white',
                                        color: '#667eea',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        fontSize: '15px',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.3)';
                                    }}
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-link">
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    style={{
                                        padding: '0.75rem 1.5rem',
                                        background: 'white',
                                        color: '#667eea',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontWeight: '600',
                                        fontSize: '15px',
                                        textDecoration: 'none',
                                        display: 'inline-block',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(255, 255, 255, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(255, 255, 255, 0.3)';
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
