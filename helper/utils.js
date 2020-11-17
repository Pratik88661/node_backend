const {
  winston,
} = global;
const fs = require('fs');
const bcrypt = require('bcrypt');
const utils = {};
utils.DBFORMAT = 'YYYY-MM-DD HH:mm:ss';
utils.DATEFORMAT = 'YYYY-MM-DD';
utils.TIMEFORMAT = 'HH:mm';

/*
  check empty value
*/
utils.empty = (mixedVar) => {
  let undef; let key; let i; let
    len;
  const emptyValues = ['undefined', null, false, 0, '', '0', undefined];
  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }
  if (typeof mixedVar === 'object') {
    for (key in mixedVar) {
      return false;
    }
    return true;
  }

  return false;
};

/*
  generate password hash
*/
utils.hash = (data) => {
  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS);
  const hash = bcrypt.hashSync(data, salt);
  return hash;
};

/*
  compare password hash
*/
utils.compare = (data, hash) => {
  return bcrypt.compareSync(data, hash);
};

/*
  get html content from file path
*/
utils.getHtmlContent = (filePath, callback) => {
  let content = '';
  fs.readFile(filePath, 'utf8', (err, html) => {
    utils.echoLog(err);
    if (!err) {
      content = html;
    }
    callback(null, content);
  });
};

/*
  convert into the capital letter
*/
utils.capitalizeFirstLetter = (inStr) => {
  if (utils.empty(inStr)) return inStr;

  return inStr.replace(/\w\S*/g, (tStr) => {
    return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
  });
};

/*
  development echo log
*/
utils.echoLog = (error) => {
  if (process.env.NODE_ENV === 'development') {
    winston.info(error);
  }
};

/*
  generate random number
*/
utils.randNumber = (length = 30) => {
  let text = "";
  let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  return text;
};

module.exports = utils;
