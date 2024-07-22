const clientMiddleware = (req, res, next) => {
    console.log("User object:", req.user);
    console.log("User role:", req.user?.role);
    if (req.user && (req.user.role === 'Client' || (req.user.role && req.user.role.includes('Client')))) {
        return next();
    } else {
        return res.status(403).json({ message: "Only Client are allowed" });
    }
};
const adminMiddleware = (req, res, next) => {
    console.log("User object:", req.user);
    console.log("User role:", req.user?.role);
    if (req.user && (req.user.role === 'Admin' || (req.user.role && req.user.role.includes('Admin')))) {
        return next();
    } else {
        return res.status(403).json({ message: "Only Admin are allowed" });
    }
};

module.exports = {clientMiddleware,adminMiddleware};
