const {validateToken} = require("../services/authentication");

function checkCookie(cookie) {
    return (req, res, next) => {
        const tokenCookieVal = req.cookies[cookie];
        
        if (!tokenCookieVal) return next();
        
        try {
            const userPayLoad = validateToken(tokenCookieVal);
            req.user = userPayLoad;
        } catch (error) {}
        
        return next();  
    };
}

module.exports = {
    checkCookie,
};