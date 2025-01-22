const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");
const passwordCheck = (req,res,next) => {
    if(req?.body?.password != req?.body?.passwordRepeat){
        next(new ApiError("Tekrar edilen şifre aynı değildir!", httpStatus.BAD_REQUEST));
        return;
    }
    next();
};
module.exports = passwordCheck;