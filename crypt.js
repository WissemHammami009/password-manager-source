// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc"; 

function crypt(message) {
    // secret key generate 32 bytes of random data
    const Securitykey = "wissemhammami54106903mrpan0092@@";
    // generate 16 bytes of random data
    const initVector = "wissemhamammi009";
    // the cipher function
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return encryptedData
}

function decrypt(encryptedData) {
    // secret key generate 32 bytes of random data
    const Securitykey = "wissemhammami54106903mrpan0092@@";
    // generate 16 bytes of random data
    const initVector = "wissemhamammi009";
    // the cipher function
 
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);

    let decryptedData = decipher.update(encryptedData, "hex", "utf-8");

    decryptedData += decipher.final("utf8");
    return decryptedData
}

module.exports = {crypt,decrypt}

