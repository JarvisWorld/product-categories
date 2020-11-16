const CONFIG = require('./../config/config');
let encryption = (data) => {
    return Buffer.from(data).toString('base64');
}
let decryption = (data) => {
    return Buffer.from(data, 'base64').toString('ascii');

}
module.exports = {
    encryption: encryption,
    decryption: decryption
}