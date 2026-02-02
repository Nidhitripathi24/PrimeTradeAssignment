import { useState, useEffect } from 'react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const { data } = await api.get('/notes');
                setNotes(data);
            } catch (error) {
                console.error("Failed to fetch notes", error);
            }
        };
        fetchNotes();
    }, []);

    const handleCreateNote = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/notes', { title, content });
            setNotes([data, ...notes]);
            setTitle('');
            setContent('');
        } catch (error) {
            alert('Failed to create note');
        }
    };

    const handleDeleteNote = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;
        try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            alert('Failed to delete note');
        }
    };

    return (
        <div className="min-h-screen py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="page-title" style={{ color: 'white', WebkitTextFillColor: 'white' }}>
                        Welcome back, {user?.name}! 👋
                    </h1>
                    <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px', marginTop: '0.5rem' }}>
                        Manage your notes and stay organized
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Note Form */}
                    <div className="lg:col-span-1">
                        <div className="card" style={{ position: 'sticky', top: '7rem' }}>
                            <h2 className="section-title">
                                ✍️ Create New Note
                            </h2>
                            <form onSubmit={handleCreateNote} className="space-y-5">
                                <div>
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        className="input-field"
                                        placeholder="Note title..."
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="content" className="form-label">
                                        Content
                                    </label>
                                    <textarea
                                        id="content"
                                        className="input-field resize-none"
                                        rows="6"
                                        placeholder="Write your note here..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn-primary">
                                    Add Note
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Notes List */}
                    <div className="lg:col-span-2">
                        <h2 className="section-title" style={{ color: 'white', marginBottom: '1.5rem' }}>
                            📚 Your Notes ({notes.length})
                        </h2>

                        {notes.length === 0 ? (
                            <div className="empty-state">
                                <svg className="mx-auto h-16 w-16 opacity-40" style={{ color: '#667eea' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p style={{ marginTop: '1rem', color: '#4a5568', fontSize: '15px', fontWeight: '500' }}>
                                    No notes yet. Create your first note!
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notes.map(note => (
                                    <div key={note._id} className="note-card group">
                                        <div style={{ paddingRight: '3rem', paddingLeft: '1rem' }}>
                                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2d3748', marginBottom: '0.75rem' }}>
                                                {note.title}
                                            </h3>
                                            <p style={{ color: '#4a5568', whiteSpace: 'pre-wrap', lineHeight: '1.7', fontSize: '15px' }}>
                                                {note.content}
                                            </p>
                                            <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <svg style={{ width: '14px', height: '14px', color: '#a0aec0' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <span style={{ fontSize: '13px', color: '#a0aec0', fontWeight: '500' }}>
                                                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteNote(note._id)}
                                            className="btn-delete"
                                            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
                                            title="Delete note"
                                        >
                                            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
