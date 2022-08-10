const { dataUser } = require('../dbContent/users/user');
const { mapError } = require('../helper/handleError');

const getUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const isUser = checkIfUserExists(userId);
        if (isUser) throw new Error('NOT_FOUND');
        const userResponse = dataUser.filter(user => user.id === Number(userId));
        res.status(200).send(userResponse[0]);
    } catch (e) {
        res.status(400).json(mapError[e.message])
    }
};

const createUser = async (req, res) => {
    try {
        const userId = req.body.id;
        const isUser = checkIfUserExists(userId);
        if (!isUser) throw new Error('RESOURCE_ALREADY_EXISTS');
        const newDataUsers = [...dataUser, req.body];
        res.send(newDataUsers);
    } catch (e) {
        res.status(500).json(mapError[e.message])
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.body.id;
        const isUser = checkIfUserExists(id);
        if (isUser) throw new Error('NOT_FOUND')
        const user = updateUserInfo(req.body);
        const oldUsers = dataUser.filter(item => item.id !== id);
        const newUsers = [...oldUsers, user];
        res.status(200).json(newUsers);
    } catch (e) {
        console.log(e);
        res.status(400).send(mapError[e.message]);
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.query.id;
        const isUser = checkIfUserExists(userId);
        if (isUser) throw new Error('NOT_FOUND');
        dataUser.filter(item => item.id !== Number(userId));
        res.status(202).json();
    } catch (e) {
        const stackError = mapError[e.message];
        res.status(404).json(stackError);
    }
}


// Private functions

const updateUserInfo = ({ id, name, birthDate }) => {
    return dataUser.reduce((acc, currentUser) => {
        const checkedUser = currentUser.id === id;
        if (checkedUser) {
            acc = { ...acc, ...{ id, name, birthDate } }
        }
        return acc;
    }, {});
};

const checkIfUserExists = (id) => {
    const user = dataUser.filter(item => item.id === Number(id));
    return !(user.length > 0);
};



module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser
}