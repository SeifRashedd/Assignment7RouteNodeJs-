import * as br from './base_repo.js';
import { userModel } from '../db/model/users_model.js';

let model = userModel;
export const signup = async ({ data }) => {
    return await br.create({ data, model });
}

export const findOne = async ({ where = {} }) => {
    return await br.findOne({ model, where });
}

export const updateOne = async ({ where = {}, data = {} }) => {
    return await br.updateOne({ model, where, data });
}

export const findOneAndDelete = async ({ where = {} }) => {
    return await br.findOneAndDelete({ model, where });
}

export const pagination = async ({ where = {}, limit = 5, page = 1, populate = [], sort = {} }) => {
    return await br.pagination({
        model, where, limit, page, populate, sort

    })
}