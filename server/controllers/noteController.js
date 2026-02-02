const Note = require('../models/Note');

// @desc    Get all notes
// @route   GET /api/v1/notes
// @access  Private
exports.getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single note
// @route   GET /api/v1/notes/:id
// @access  Private
exports.getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(note);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a note
// @route   POST /api/v1/notes
// @access  Private
exports.createNote = async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const note = new Note({
            title,
            content,
            user: req.user._id
        });

        const createdNote = await note.save();
        res.status(201).json(createdNote);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a note
// @route   PUT /api/v1/notes/:id
// @access  Private
exports.updateNote = async (req, res) => {
    const { title, content } = req.body;

    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            note.title = title || note.title;
            note.content = content || note.content;

            const updatedNote = await note.save();
            res.json(updatedNote);
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a note
// @route   DELETE /api/v1/notes/:id
// @access  Private
exports.deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (note) {
            if (note.user.toString() !== req.user._id.toString()) {
                return res.status(401).json({ message: 'Not authorized' });
            }

            await note.deleteOne();
            res.json({ message: 'Note removed' });
        } else {
            res.status(404).json({ message: 'Note not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
