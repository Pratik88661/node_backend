const {
    models: {
        survey_questions: surveyQuestionsModel,
        user_survey:userSurveyModel
    }
} = global

const surveyService = {};
//-----------users model query start---------------
surveyService.createSurveyQuestions = (data) => {
    return surveyQuestionsModel.create(data);
};
surveyService.fetchAllQuestions = (limit=null,skip=null,search) => {
    let query = {raw:true};
    if(limit){
        query.offset= skip;
        query.limit= limit;
    }
    if(search){
        query.where={
            question:{
                [Op.like]:'%'+search+'%'
            }
        }
    }
    return surveyQuestionsModel.findAndCountAll(query);
}

surveyService.updateUser = (data, query) => {
    return usersModel.update(data, query);
}
surveyService.fetchSurveyQuestionsByQuery = (query) => {
    return surveyQuestionsModel.findOne(query);
};

surveyService.createSurvey = (data) => {
    return userSurveyModel.create(data);
};

surveyService.getUserById = (id) => {
    return usersModel.findOne({ where: { "id": id } })
};

surveyService.getUser = (where) => {
    return usersModel.findOne(where);
};
//-----------users model query end---------------
module.exports = surveyService;