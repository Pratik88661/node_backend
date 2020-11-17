const {
    jwt,
} = global;
const utils = require('./utils');
const userService = require('../modules/v1/app/user/user.service');
const auth = {};
const {ERROR400}=require('../constants/common');
/* middleware that checked authentication token exists or not */
auth.checkToken = (req, res, next) => {
    let token = (req.headers && req.headers['x-auth-token']);
    if (utils.empty(token)) {
        token = (req.body && req.body['x-auth-token']);
    }
    if (utils.empty(token)) {
        return res.status(400).json({
            message: req.t('NOT_AUTHORIZED')
        });
    }
    req.token = token;
    return next();
};

/* 
-  middleware that verify jwt token valid or not
-  get user and set in request 
*/
auth.isAuthenticatedUser = async (req, res, next) => {
    let token = (req.headers && req.headers['x-auth-token']);
    console.log(token);
    const userData = jwt.verify(token);
    console.log("======",userData);
    if (utils.empty(userData.userId)) {
        return res.status(ERROR400).json({
            errors: { message: req.t('NOT_AUTHORIZED') },
            status: false
        });
    }
    const where = {
        "id": userData.userId,
    };
    userService.getUser(where).then((user) => {
        if (user) {
            req.authUser = user;
            return next();
        }
         return res.status(ERROR400).json({
            errors: { message: req.t('NOT_AUTHORIZED') },
            status: false
        });
    });
};

module.exports = auth;
