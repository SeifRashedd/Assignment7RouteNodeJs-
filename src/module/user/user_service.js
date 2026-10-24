import * as ur from '../../repos/user.repo.js';

export const signup = async (data) => {
    let isEmailExist = await ur.findOne({ where: { email: data.email } });
    if (isEmailExist) {
        throw new Error("Email already exists", { cause: 404 });
    }

    let user = await ur.signup({ data});
    return user;
}


export const signin = async ({ email, password } = {}) => {
    let user = await ur.findOne({ where: { email } });
    if (!user || user.password !== password) {
        throw new Error("invalid email or password", { cause: 401 });
    }

    delete user.password;
    return user;
}


export const findUsers = async ({ page, limit } = {}) => {
    return await ur.pagination({ page, limit })
}

export const findUser = async (id) => {
    let user = await ur.findOne({ where: { _id: id } });
    if (!user) {
        throw new Error("user not found", { cause: 404 });
    }

    delete user.password;
    return user;
}


export const updateUser = async (id, data = {}) => {
    let user = await ur.findOne({ where: { _id: id } });
    if (!user) {
        throw new Error("user not found", { cause: 404 });
    }

    delete data.password;

    if (data.email) {
        let isEmailExist = await ur.findOne({ where: { email: data.email, _id: { $ne: id } } });
        if (isEmailExist) {
            throw new Error("email already exist", { cause: 409 });
        }
    }

    await ur.updateOne({ where: { _id: id }, data });
}


export const deleteUser = async (id) => {
    let user = await ur.findOneAndDelete({ where: { _id: id } });
    if (!user) {
        throw new Error("user not found", { cause: 404 });
    }
}
