const { models: { users: usersModel } } = global;
const utils = require('../../../../helper/utils')
const userService = require('./user.service');
const { SERVERERROR, SUCCESSCODE, UNAUTHORISED, ERROR400, PAGE422, NOTFOUND } = require('../../../../constants/common');
const { STATUS } = require('../../../../constants/model');
const userController = {};

// user local sign up start
userController.createAccount = async (req, res) => {
    try {
        let body = req.body;
        if (body.password) {
            const hashPassword = utils.hash(body.password);
            body.password = hashPassword;
        }
        body.status = STATUS.ACTIVE;

        //create user
        let user = await userService.createUser(body);
        //user response to json
        let userResponse = user.toJSON();

        //get Token
        let secretToken = jwt.createSecretToken({
            userId: user.id,
        });

        //success response
        res.status(SUCCESSCODE.STANDARD).json({
            "message": l10n.t('CREATED_SUCCESSFULLY', { FIELD: 'User' }),
            "status": true,
            "data": { userId: userResponse.id, "token": secretToken, "firstName": user.firstName, lastName: user.lastName }
        });

    } catch (error) {
        console.log("create account error===", error);
        if (error.errors && error.errors[0].path == "facebookId") {
            return res.status(PAGE422.CODE).json({
                errors: { message: error.errors[0].message },
                status: false,
            });
        } else {
            return res.status(SERVERERROR.CODE).json({
                errors: { message: req.t(SERVERERROR.MESSAGE) },
                status: false,
            });
        }

    }
}
//user local sign up end

//user login start
userController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await userService.getUserByEmail(email);

        if (user) {
            user = user.toJSON()
            const isLoggedIn = usersModel.authenticate(password, user.password);
            if (isLoggedIn) {
                let secretToken = jwt.createSecretToken({
                    userId: user.id,
                });

                res.status(SUCCESSCODE.STANDARD).json({
                    "message": l10n.t('LOGIN_SUCCESSFULLY'),
                    "status": true,
                    "data": { userId: user.id, "token": secretToken, "firstName": user.firstName, lastName: user.lastName }
        
                });

            } else {
                return res.status(UNAUTHORISED.CODE).json({
                    errors: {
                        "msg": req.t("MOBILE_PASSWORD_MISMATCH"),
                    }, "status": false
                });
            }

        } else {
            return res.status(ERROR400).json({
                errors: {
                    "msg": req.t("NO_RECORDS_FOUND"),
                }, "status": false
            });
        }

    } catch (error) {
        console.log("Error at userController/login", error);
        if (error == "Error: data and hash arguments required") {
            return res.status(SERVERERROR.CODE).json({
                errors: { msg: req.t("SET_YOUR_PASSWORD") }
                , "status": false
            });
        }
        return res.status(SERVERERROR.CODE).json({
            errors: { msg: req.t(SERVERERROR.MESSAGE) }
            , "status": false
        });

    }
}
//user login end

//social login API
userController.socialLogin = async (req, res) => {
    try {
        const { isUserExist,body:{firstName,lastName,email} } = req;
        let user = {};
        if(isUserExist){
            user = await userService.getUserByEmail(email);
        }else{
            const insertUserDetails = {
                email,
                firstName,
                lastName,
                status : STATUS.ACTIVE
            };

            user = await userService.createUser(insertUserDetails);
        }
        //get Token
        let secretToken = jwt.createSecretToken({
            userId: user.id,
        });
        //success response
        res.status(SUCCESSCODE.STANDARD).json({
            "message": l10n.t('CREATED_SUCCESSFULLY', { FIELD: 'User' }),
            "status": true,
            "data": { userId: user.id, "token": secretToken, "firstName": user.firstName, lastName: user.lastName }
        });
    } catch (error) {
        console.log("Error at userController/socialLogin ",error);
        return res.status(SERVERERROR.CODE).json({
            errors: { message: req.t(SERVERERROR.MESSAGE) }
            , "status": false
        });
    }
}

module.exports = userController;