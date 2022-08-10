const { dataTshirt } = require('../dbContent/products/tshirts');
const { mapError } = require('../helper/handleError');
const { sizes } = require('../utils/constants/tshirt');
const _ = require('lodash');

const getTshirtBySize = async (req, res) => {
    try {
        const { size } = req.query;
        const checkedSize = isSize(size);
        if (!checkedSize) throw Error('TSHIRT_SIZE_NOT_FOUND');
        const response = dataTshirt.reduce((acc, product) => {
            const checkedSize = product.size === size;
            if (checkedSize) acc = [...acc, product]
            return acc;
        }, []);
        res.send(response);
    } catch (e) {
        res.status(400).json(mapError[e.message])
    }
};

const getTshirt = async (req, res) => {
    try {
        const id = req.query.id;
        const tshirt = dataTshirt.filter(item => item.id === Number(id));
        if (isEmpty(tshirt)) throw Error('NOT_FOUND');
        const response = _.head(tshirt);
        res.status(200).json(response);
    } catch (e) {
        res.status(400).json(mapError[e.message]);
    }
}

const createTshirt = async (req, res) => {
    try {
        const newTshirt = [...dataTshirt, req.body];
        res.send(newTshirt);
    } catch (e) {
        res.status(500).json(mapError[e.message])
    }
}

const updateTshirt = async (req, res) => {
    try {
        const id = req.body.id
        const tshirtExist = checkIfTshirtOnData(id)
        if (tshirtExist) throw new Error('NOT_FOUND')
        const tshirt = updateTshirtInfo(req.body)
        const oldTshirts = dataTshirt.filter(tshirt => tshirt.id !== id)
        const newTshirts = [...oldTshirts, tshirt]
        res.status(201).json(newTshirts)
    }
    catch (e) {
        res.status(400).json(mapError[e.message])
    }
}


const deleteTshirt = async(req, res) =>{
    try{
        const id = req.query.id
        const tshirt = checkIfTshirtOnData(id)
        if(tshirt) throw new Error('NOT_FOUND')
        dataTshirt.filter(item => item.id !== Number(id));
        res.status(202).json()
    }
    catch(e){
        res.status(400).json(mapError[e.message])
    }
}



// Private functions
const isSize = (size) => sizes.includes(size);

const isEmpty = (content) => !(content.length > 0);

const checkIfTshirtOnData = (id) => {
    const tshirt = dataTshirt.filter(item => item.id === Number(id))
    return !(tshirt.length > 0)
}

const updateTshirtInfo = ({ id, size, description }) => {
    return dataTshirt.reduce((acc, currentTshirt) => {
        const checkedTshirt = currentTshirt.id === id;
        if (!checkedTshirt) {
            acc = { ...acc, ...{ id, size, description } }
        }
        return acc
    }, {});
}

module.exports = {
    getTshirtBySize,
    getTshirt,
    createTshirt,
    updateTshirt,
    deleteTshirt
}