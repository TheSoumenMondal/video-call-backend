import { StatusCodes } from "http-status-codes";
import BaseError from "./baseError.js";

class ValidationError extends BaseError{
    constructor(message : string){
        super(message);
        this.name = "ValidationError";
        this.statusCode = StatusCodes.BAD_REQUEST;
    }
}

export default ValidationError;