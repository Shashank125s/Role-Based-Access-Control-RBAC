function isAuthenticated(req,res,next){
   if(req.session.user){
       return next();
    }
    res.redirect('/login');
}

function hasRole(requiredRole) {
    return (req, res, next) => {
        const roleHierarchy = {
            user: 1,
            moderator: 2,
            admin: 3,
        };

        const userRole = req.session.user?.role;
        if (userRole && roleHierarchy[userRole] >= roleHierarchy[requiredRole]) {
            return next(); // Allow access
        }

        res.status(403).send('Access Denied'); 
    };
}


module.exports = {isAuthenticated,hasRole};