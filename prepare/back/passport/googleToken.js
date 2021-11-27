const passport = require('passport');
const { User } = require('../models');
const passportCustom = require('passport-custom');
const CustomStrategy = passportCustom.Strategy;

const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
module.exports = () => {
  passport.use('google-token-verify',
    new CustomStrategy(
      (req, done) => {
        const { tokenId } = req.body;
        client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.GOOGLE_CLIENT_ID
        }).then(async (response) => {
          try {
            const { email_verified, email } = response.getPayload();
            if (email_verified) {
              const user = await User.findOne({
                where: { email }
              });
              if (!user) {
                return done(null, false, { reason: `Incorrect email or password.` });
              }
              return done(null, user);
            } else {
              return done(null, false, { reason: `Incorrect email or password.` });
            }
          } catch (error) {
            console.error(error);
            return done(error);
          }
        });
      })
  )
};


