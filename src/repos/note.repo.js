import * as br from './base_repo.js';
import { noteModel } from '../db/model/note_model.js';

let model = noteModel;
export const createNote = async ({ data }) => {
    return await br.create({ data, model });
}

export const find = async ({ where = {}, select = "", populate = [] }) => {
    return await br.find({ model, where, select, populate });
}

export const aggregate = async ({ pipeline = [] }) => {
    return await br.aggregate({ model, pipeline });
}

export const findOne = async ({ where = {} }) => {
    return await br.findOne({ model, where });
}

export const findOneAndUpdate = async ({ where = {}, data = {} }) => {
    return await br.findOneAndUpdate({ model, where, data });
}

export const updateMany = async ({ where = {}, data = {} }) => {
    return await br.updateMany({ model, where, data });
}

export const findOneAndReplace = async ({ where = {}, data = {} }) => {
    return await br.findOneAndReplace({ model, where, data });
}

export const deleteMany = async ({ where = {} }) => {
    return await br.deleteMany({ model, where });
}

export const findOneAndDelete = async ({ where = {} }) => {
    return await br.findOneAndDelete({ model, where });
}

export const pagination = async ({ where = {}, limit = 5, page = 1, populate = [], sort = {} }) => {
    return await br.pagination({
        model, where, limit, page, populate, sort

    })
}
