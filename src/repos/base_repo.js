export const create = async ({
    model, data
}) => {
    return await model.create(data);
}


export const find = async ({
    model, where = {}, select = "", populate = []
}) => {
    return await model.find(where).select(select).populate(populate).lean();
}


export const aggregate = async ({
    model, pipeline = []
}) => {
    return await model.aggregate(pipeline);
}


export const findOne = async ({
    model, where = {}
}) => {
    return await model.findOne(where).lean({ virtuals: true });
}


export const updateOne = async ({
    model, where = {}, data = {}
}) => {
    return await model.updateOne(where, data, { runValidators: true });
}


export const updateMany = async ({
    model, where = {}, data = {}
}) => {
    return await model.updateMany(where, data, { runValidators: true });
}


export const findOneAndUpdate = async ({
    model, where = {}, data = {}
}) => {
    return await model.findOneAndUpdate(where, data, {
        runValidators: true,
        returnDocument: 'after',
    }).lean({ virtuals: true });
}


export const findOneAndReplace = async ({
    model, where = {}, data = {}
}) => {
    return await model.findOneAndReplace(where, data, {
        runValidators: true,
        returnDocument: 'after',
    }).lean({ virtuals: true });
}


export const deleteMany = async ({
    model, where = {}
}) => {
    return await model.deleteMany(where);
}


export const findOneAndDelete = async ({
    model, where = {}
}) => {
    return await model.findOneAndDelete(where).lean({ virtuals: true });
}



export const pagination = async ({
    model, where, limit, page, sort, populate
}) => {
    page = Number(page) || 1;
    limit = Number(limit) || 5;
    let skip = (page - 1) * limit;
    let data = await model.find(where).skip(skip).limit(limit).sort(sort).populate(populate).lean({ virtuals: true });
    let total = await model.countDocuments(where);
    let totalPages = Math.ceil(total / limit);
    return {
        data,
        meta:
        {
            currentPage: page,
            total,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        }
    };
}






// page = Number(page) || 1;
//     limit = Number(limit) || 5;
//     let skip = (page - 1) * limit;
//     let users = await userModel.find({}).skip(skip).limit(limit).populate('posts').lean({ virtuals: true });
//     return users;