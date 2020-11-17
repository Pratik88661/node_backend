const jwt = require('jsonwebtoken');
const fs = require('fs');
const jwtUtil = {};
jwtUtil.issuer = process.env.ISSUER;
jwtUtil.privateKEY = fs.readFileSync(`${__dirname}/../ssh/private.key`, 'utf8');
jwtUtil.publicKEY = fs.readFileSync(`${__dirname}/../ssh/public.key`, 'utf8');


/* create jwt secret token */
jwtUtil.createSecretToken = (data) => {
  const token = jwt.sign(
    data,
    jwtUtil.privateKEY,
    {
      expiresIn: '1h',
      issuer: "test",
      audience: "test",
      algorithm: 'RS256'
    }
  );
  return token;
};
/* verify jwt secret token*/
jwtUtil.verify = (token) => {
  let decoded = {};        
  if (token) {
    try {
      decoded = jwt.verify(
        token,
        jwtUtil.publicKEY, {
          algorithms: ['RS256'],
          issuer: "test",
        }
      );
    } catch (err) {
      console.log(err);
    }
  }        
  return decoded;
};

module.exports = jwtUtil;
