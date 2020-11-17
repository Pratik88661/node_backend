const {
    models: {
        users: usersModel
    }
} = global

const userService = {};
//-----------users model query start---------------
userService.createUser = (data) => {
    return usersModel.create(data);
};
userService.updateUser = (data, query) => {
    return usersModel.update(data, query);
}
userService.getUserByEmail = (email) => {
    return usersModel.findOne({ where: { email } })
};
userService.getUserByNumber = (mobileNumber) => {
    return usersModel.findOne({ where: { "mobileNumber": mobileNumber,"status":"active" } })
}
userService.getUserById = (id) => {
    return usersModel.findOne({ where: { "id": id } })
}
userService.getUser = (where) => {
    return usersModel.findOne(where);
};
//-----------users model query end---------------
module.exports = userService;