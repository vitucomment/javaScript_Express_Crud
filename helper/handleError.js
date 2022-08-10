const mapError = {
    'NOT_FOUND': {
        httpCode: 400,
        message: 'Resource not found',
    },
    'RESOUCE_ALREADY_EXISTS': {
        httpCode: 500,
        message: 'Resource already exists'
    },
    'TSHIRT_SIZE_NOT_FOUND': {
        httpCode: 400,
        message: 'Resource not found'
    }
};

module.exports = {
    mapError,
}