function authorizeRoles(...roles) {
  return (req, res, next) => {
    console.log("Roles", roles);
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
}

module.exports = authorizeRoles;
