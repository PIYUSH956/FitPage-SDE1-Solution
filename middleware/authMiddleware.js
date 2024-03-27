const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// Middleware function for JWT authentication
exports.authenticateUser = async (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    try {
        // Check if token is provided
        if (!token) {
            return res.status(401).json({ error: 'Authentication token is missing' });
        }

        // Verify the token
        const decoded = jwt.verify(token, config.jwtSecret);

        // Check if decoded token contains user id
        if (!decoded.userId) {
            return res.status(401).json({ error: 'Invalid authentication token' });
        }

        // Fetch user from database using the user id from the token
        const user = await User.findById(decoded.userId);

        // Check if user exists
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
        }

        // Attach the user object to the request for further use in routes/controllers
        req.user = user;

        // Proceed to the next middleware/route handler
        next();
    } catch (error) {
        // If token verification fails or any other error occurs, return an error response
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
};
