const authMiddleware = (roles) => {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if (roles.includes(userRole)) {
            return next();
        } else {
            return res.status(403).json({ error: 'You do not have permission to perform this action.' });
        }
    };
};

export default authMiddleware;
