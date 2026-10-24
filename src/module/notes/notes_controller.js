import { Router } from 'express';
import { response } from '../../common/index.js';
import * as ns from './notes_service.js';

export let noteRouter = Router();


noteRouter.post('/', async (req, res, next) => {
    await ns.createNote(req.query.id, req.body);
    response({ res, status: 201, message: 'note created' });
});



noteRouter.get('/all', async (req, res, next) => {
    let notes = await ns.findNotes(req.query);
    response({ res, data: notes, status: 200, message: 'Notes fetched successfully' });
});



noteRouter.get('/paginate-sort', async (req, res, next) => {
    let notes = await ns.findUserNotes(req.query);
    response({ res, data: notes, status: 200, message: 'Notes fetched successfully' });
});


noteRouter.get('/aggregate', async (req, res, next) => {
    let notes = await ns.aggregateNotes(req.query);
    response({ res, data: notes, status: 200, message: 'Notes fetched successfully' });
});


noteRouter.get('/note-with-user', async (req, res, next) => {
    let notes = await ns.findNotesWithUser(req.query);
    response({ res, data: notes, status: 200, message: 'Notes fetched successfully' });
});


noteRouter.get('/note-by-content', async (req, res, next) => {
    let note = await ns.findNoteByContent(req.query);
    response({ res, data: note, status: 200, message: 'Note fetched successfully' });
});


noteRouter.get('/:noteId', async (req, res, next) => {
    let note = await ns.findNote(req.params.noteId, req.query.id);
    response({ res, data: note, status: 200, message: 'Note fetched successfully' });
});


noteRouter.patch('/all', async (req, res, next) => {
    await ns.updateAllNotesTitle(req.query.id, req.body);
    response({ res, status: 200, message: 'all notes updated' });
});


noteRouter.patch('/:noteId', async (req, res, next) => {
    let note = await ns.updateNote(req.params.noteId, req.query.id, req.body);
    response({ res, data: note, status: 200, message: 'note updated' });
});


noteRouter.put('/replace/:noteId', async (req, res, next) => {
    let note = await ns.replaceNote(req.params.noteId, req.query.id, req.body);
    response({ res, data: note, status: 200, message: 'note replaced' });
});


noteRouter.delete('/:noteId', async (req, res, next) => {
    let note = await ns.deleteNote(req.params.noteId, req.query.id);
    response({ res, data: note, status: 200, message: 'deleted' });
});


noteRouter.delete('/', async (req, res, next) => {
    await ns.deleteAllNotes(req.query.id);
    response({ res, status: 200, message: 'all notes deleted' });
});
