const ResponseObj = {
    status: null,
    data: null,
    message: '',
    error: ""
}

const SendResponse = (status, data, message, error) => {

        ResponseObj.status = status,
        ResponseObj.data = data,
        ResponseObj.message = message,
        ResponseObj.error = error
}

module.exports = {
    SendResponse
};