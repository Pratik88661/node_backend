const utils = require('./utils');
const validator = {};

// custom validation methood which will return message based on passing parameter
validator.customMessage = (validation, param, length) => {
    if (validation === 'isInt') {
        return l10n.t('SHOULD_BE_INT', { FIELD: param });
    } else if (validation === 'isArray') {
        return l10n.t('SHOULD_BE_ARRAY', { FIELD: param });
    } else if (validation === 'isString') {
        return l10n.t('SHOULD_BE_STRING', { FIELD: param });
    } else if (validation === 'isRequired') {
        return l10n.t('FIELD_REQUIRED', { FIELD: param });
    } else if (validation === 'isIn') {
        return l10n.t('INVALID_VALUE', { FIELD: param });
    } else if (validation === 'isNegative') {
        return l10n.t('CANNOT_BE_NEGATIVE', { FIELD: param });
    } else if (validation === 'isMin') {
        return l10n.t('CHECK_MIN_LENGTH', { FIELD: param, LENGTH: length });
    } else if (validation === 'isMax') {
        return l10n.t('CHECK_MAX_LENGTH', { FIELD: param, LENGTH: length });
    }
}

// check negative value if there then it return true
validator.checkNegativeValue = (value) => {
    if (+value < 0) {
        return false;
    } else {
        return true;
    }
}

// check value is empty or not 
validator.checkExists = (value) => {
    if (utils.empty(value)) {
        return false;
    } else {
        return true;
    }
}
module.exports = validator;