function requireAdmin(req, res, next) {
  const key = req.headers['x-admin-key'];
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized — invalid admin key' });
  }
  next();
}

module.exports = requireAdmin;