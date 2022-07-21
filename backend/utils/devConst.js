const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET :'some-secret-key';
module.exports.EXPIRE_TOKEN = '7d';