const { models: { users: usersModel } } = global;
const utils = require('../../../../helper/utils')
const surveyService = require('./survey.service');
const { SERVERERROR, SUCCESSCODE, UNAUTHORISED, ERROR400, PAGE422, NOTFOUND } = require('../../../../constants/common');
const { STATUS, DEVICE } = require('../../../../constants/model');
const {RECORDS_PER_PAGE_LIMIT} = require('../../../../config/config');
const surveyController = {};

//create survey questions
surveyController.createSurveyQuestions = async (req, res) => {
    try{
        await surveyService.createSurveyQuestions(req.body);
        res.status(SUCCESSCODE.STANDARD).json({
            "message": l10n.t('SUCCESS'),
            "status": true
        });

    }catch(error){
        console.log("Error at surveyController/createSurveyQuestions--",error);
        
        return res.status(SERVERERROR.CODE).json({
            errors: { message: req.t(SERVERERROR.MESSAGE) },
            status:false
        });
    }
}

//fetch survey questions
surveyController.fetchSurveyQuestions = async (req, res) => {
    try{
        const { id }=req.query;
        const query = {
            where:{
                id
            },
            attributes:['question','optionA','optionB','optionC','optionD'],
            raw:true
        };
        const fetchSurvey = await surveyService.fetchSurveyQuestionsByQuery(query);
        res.status(SUCCESSCODE.STANDARD).json({
            "message": l10n.t('SUCCESS'),
            "status": true,
            "data": fetchSurvey
        });
    }catch(error){
        console.log("Error at surveyController/fetchSurveyQuestions--",error);
        return res.status(SERVERERROR.CODE).json({
            errors: { message: req.t(SERVERERROR.MESSAGE) },
            status:false
        });
    }
}

//fetch survey questions
surveyController.fetchAllSurveyQuestions = async (req, res) => {
    try{
        const { search, page } = req.body;
        let skip=0;
        let limit = RECORDS_PER_PAGE_LIMIT ;
        if(page && page > 0){
            skip = page * limit
        }
        const fetchAllQuestions = await surveyService.fetchAllQuestions(limit,skip,search);
        let response = {
            page:0,
            data:[]
        };

        if(fetchAllQuestions.rows.length > 0){
            response.total = fetchAllQuestions.count;
            response.page = Math.ceil(fetchAllQuestions.count/limit);
            response.data = fetchAllQuestions.rows
        }
        res.status(SUCCESSCODE.STANDARD).json({
            "message": l10n.t('SUCCESS'),
            "status": true,
            "data": response
        });
    }catch(error){
        console.log("Error at surveyController/fetchSurveyQuestions--",error);
        return res.status(SERVERERROR.CODE).json({
            errors: { message: req.t(SERVERERROR.MESSAGE) },
            status:false
        });
    }
}

//fetch survey questions
surveyController.createUserSurvey = async (req, res) => {
    try{
        const { id, answer, description, userId }=req.body;
        const create = {
            questionId:id,
            answer,
            description,
            userId
        };
        await surveyService.createSurvey(create);
        res.status(SUCCESSCODE.STANDARD).json({
            "message": l10n.t('SUCCESS'),
            "status": true
        });
    }catch(error){
        console.log("Error at surveyController/createUserSurvey--",error);
        return res.status(SERVERERROR.CODE).json({
            errors: { message: req.t(SERVERERROR.MESSAGE) },
            status:false
        });
    }
}
module.exports = surveyController;