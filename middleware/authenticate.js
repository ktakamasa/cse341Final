const dotenv = require('dotenv');
dotenv.config();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_RENDER_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

const isAuthenticated = (req, res, next) => {
  if (req.oidc.user === undefined) {
    return res.status(401).json({ error: 'User not authenticated' });
  }
  next();
};

module.exports = { config, isAuthenticated };
