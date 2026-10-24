import * as nr from '../../repos/note.repo.js';
import * as ur from '../../repos/user.repo.js';
import { normalizeId } from '../../common/index.js';

export const createNote = async (userId, data = {}) => {
    let user = await ur.findOne({ where: { _id: userId } });
    if (!user) {
        throw new Error("user not found", { cause: 404 });
    }
    let note = await nr.createNote({ data: { ...data, userId } });
    return note;
}


export const findUserNotes = async ({ id, page, limit } = {}) => {
    return await nr.pagination({ where: { userId: id }, page, limit, sort: { createdAt: -1 } });
}

export const findNoteByContent = async ({ id, content } = {}) => {
    let note = await nr.findOne({ where: { userId: id, content } });
    if (!note) {
        throw new Error("note not found", { cause: 404 });
    }

    return note;
}

export const findNotesWithUser = async ({ id } = {}) => {
    return await nr.find({
        where: { userId: id },
        select: "title userId createdAt -_id",
        populate: { path: "userId", select: "email -_id" }
    });
}

export const aggregateNotes = async ({ id, title } = {}) => {
    let match = { userId: normalizeId(id) };
    if (title) {
        match.title = { $regex: title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" };
    }

    return await nr.aggregate({
        pipeline: [
            { $match: match },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            },
            { $unwind: "$user" },
            {
                $project: {
                    title: 1,
                    content: 1,
                    createdAt: 1,
                    "user.name": 1,
                    "user.email": 1
                }
            }
        ]
    });
}

export const deleteAllNotes = async (userId) => {
    // without an id the filter could match everything
    if (!userId) {
        throw new Error("user id is required", { cause: 400 });
    }

    let result = await nr.deleteMany({ where: { userId } });
    if (!result.deletedCount) {
        throw new Error("no notes found", { cause: 404 });
    }
}

export const findNotes = async ({ page, limit } = {}) => {
    return await nr.pagination({ page, limit })
}

export const findNote = async (noteId, userId) => {
    let note = await nr.findOne({ where: { _id: noteId } });
    if (!note) {
        throw new Error("note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("you are not the owner", { cause: 403 });
    }

    return note;
}


export const updateNote = async (noteId, userId, data = {}) => {
    let note = await nr.findOne({ where: { _id: noteId } });
    if (!note) {
        throw new Error("note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("you are not the owner of this note", { cause: 403 });
    }

    delete data.userId;

    let updatedNote = await nr.findOneAndUpdate({ where: { _id: noteId }, data });
    return updatedNote;
}


export const updateAllNotesTitle = async (userId, { title } = {}) => {
    if (!title) {
        throw new Error("title is required", { cause: 400 });
    }

    let result = await nr.updateMany({ where: { userId }, data: { title } });
    if (!result.matchedCount) {
        throw new Error("no notes found", { cause: 404 });
    }
}


export const replaceNote = async (noteId, userId, data = {}) => {
    let note = await nr.findOne({ where: { _id: noteId } });
    if (!note) {
        throw new Error("note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("you are not the owner of this note", { cause: 403 });
    }

    let replacedNote = await nr.findOneAndReplace({
        where: { _id: noteId },
        data: { ...data, userId: note.userId, createdAt: note.createdAt }
    });
    return replacedNote;
}


export const deleteNote = async (noteId, userId) => {
    let note = await nr.findOne({ where: { _id: noteId } });
    if (!note) {
        throw new Error("note not found", { cause: 404 });
    }

    if (note.userId.toString() !== userId) {
        throw new Error("you are not the owner", { cause: 403 });
    }

    let deletedNote = await nr.findOneAndDelete({ where: { _id: noteId } });
    return deletedNote;
}
