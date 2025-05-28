const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    console.log("Auth Middleware Request Reached");
    let token = req.header("Authorization");
    console.log("Token: " + token);

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided" });
    }

    try {
        // Remove "Bearer " prefix if present
        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        const decoded = jwt.verify(token, "SECRET_KEY");
        console.log("Decoded:", decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        res.status(400).json({ error: "Invalid token" });
    }
};
