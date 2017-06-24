class Response {
    static response(res, data) {
        var code = 200;
        if(data.status)
            code = data.success ? data.success.code : 200;
        else
            code = data.error ? data.error.code : 500;
        return res.status(code).send(data);
    }
}
export default Response;