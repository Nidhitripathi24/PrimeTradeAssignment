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
        <div className="min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {user?.name}!
                    </h1>
                    <p className="mt-1 text-sm text-gray-600">
                        Manage your notes and stay organized
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Create Note Form */}
                    <div className="lg:col-span-1">
                        <div className="card sticky top-24">
                            <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                Create New Note
                            </h2>
                            <form onSubmit={handleCreateNote} className="space-y-4">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                                        Title
                                    </label>
                                    <input
                                        id="title"
                                        type="text"
                                        className="input-field"
                                        placeholder="Note title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
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
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            Your Notes ({notes.length})
                        </h2>

                        {notes.length === 0 ? (
                            <div className="card text-center py-12">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="mt-4 text-sm text-gray-600">No notes yet. Create your first note!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {notes.map(note => (
                                    <div key={note._id} className="card relative group hover:shadow-lg transition-shadow">
                                        <div className="pr-12">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                                {note.title}
                                            </h3>
                                            <p className="text-gray-700 whitespace-pre-wrap">
                                                {note.content}
                                            </p>
                                            <p className="mt-3 text-xs text-gray-500">
                                                {new Date(note.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteNote(note._id)}
                                            className="absolute top-6 right-6 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Delete note"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
