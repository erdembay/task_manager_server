const ApiError = require("../errors/ApiError");
const httpStatus = require("http-status");
const mongoIdChecker = (field) => (req,res,next) => {
    if(!req?.params[field || "id"]?.match(/^[0-9a-fA-F]{24}$/)){
        next(new ApiError("Lütfen Geçerli Bir ID bilgisi giriniz.", httpStatus.BAD_REQUEST));
        return;
    }
    next();
};
module.exports = mongoIdChecker;