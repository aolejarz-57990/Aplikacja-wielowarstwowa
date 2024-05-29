function encrypt(content, password) { 
    return CryptoJS.AES.encrypt(JSON.stringify({ content }), password).toString();
}

function decrypt(crypted, password) {
    try {
        return JSON.parse(CryptoJS.AES.decrypt(crypted, password).toString(CryptoJS.enc.Utf8)).content;
    }
    catch(e) {
        return "";
    }
}

function request(settings, onSuccess) {
    try {
        $.ajax(settings).done( response => {
            if(typeof(onSuccess)=="function") {
                onSuccess(response);
            }
        });
    }
    catch(e) {
        console.log(e);
    }
}

function dodaj(a,b) {
    return a+b;
}

module.exports = {
    encrypt,
    decrypt,
    request,
    dodaj
};