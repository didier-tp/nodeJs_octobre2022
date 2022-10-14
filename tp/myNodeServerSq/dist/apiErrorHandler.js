"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiErrorHandler = exports.ConflictError = exports.NotFoundError = exports.ErrorWithStatus = void 0;
// ErrorWithStatus est une version améliorée de Error (err.message)
// avec un attribut status (404,500,...) permettant une automatisation
// du retour du status http dans le "apiErrorHandler"
//NB: Error is a very special class (native)
//subclass cannot be test with instanceof , ...
class ErrorWithStatus extends Error {
    constructor(message, status = 500) {
        super(message);
        this.msg = message;
        this.status = status;
    }
    static extractStatusInNativeError(e) {
        let status = 500; //500 (Internal Server Error)
        let jsonStr = JSON.stringify(e);
        let errWithStatus = JSON.parse(jsonStr);
        if (errWithStatus.status)
            status = errWithStatus.status;
        return status;
    }
}
exports.ErrorWithStatus = ErrorWithStatus;
class NotFoundError extends ErrorWithStatus {
    constructor(message = "not found", status = 404) {
        super(message, status);
    }
}
exports.NotFoundError = NotFoundError;
class ConflictError extends ErrorWithStatus {
    constructor(message = "conflict (with already existing)", status = 409) {
        super(message, status);
    }
}
exports.ConflictError = ConflictError;
const apiErrorHandler = function (err, req, res, next) {
    //console.log("in apiErrorHandler err=", err + " " + JSON.stringify(err));
    //console.log("in apiErrorHandler typeof err=",typeof err);
    if (typeof err == 'string') {
        res.status(500).json({ errorCode: '500', message: 'Internal Server Error :' + err });
    }
    else if (err instanceof Error) {
        //console.log("in apiErrorHandler err is instanceof Error");
        let status = ErrorWithStatus.extractStatusInNativeError(err);
        res.status(status).json({ errorCode: `${status}`, message: err.message });
    }
    else
        res.status(500).json({ errorCode: '500', message: 'Internal Server Error' });
};
exports.apiErrorHandler = apiErrorHandler;
