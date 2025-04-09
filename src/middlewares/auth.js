const adminAuth = (req, res, next) => {
    const token = "xyz";
    const authStatus = token === "xyz";
    if (authStatus) {
        console.log("Admin Authenticated successfully.");
        next();
    }else{
        res.status(401).send("Unauthorized request.");
    }
};

const userAuth = (req, res, next) => {
    const token = "xyz";
    const authStatus = token === "xyz";
    if (authStatus) {
        console.log("Admin Authenticated successfully.");
        next();
    }else{
        res.status(401).send("Unauthorized request.");
    }
};

module.exports = { adminAuth , userAuth };