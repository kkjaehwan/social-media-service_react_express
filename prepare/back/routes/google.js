const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');
const axios = require('axios');

const { backUrl, frontUrl } = require('../config/urlconfig');

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_AUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_AUTH_REDIRECT_URL = `${backUrl}/google/auth/callback`;
const GOOGLE_AUTH_SCOPE_USERINFO = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";

router.get('/signup', isNotLoggedIn, (req, res, next) => {
  return res.redirect(`${GOOGLE_AUTH_URL}?scope=${encodeURIComponent(GOOGLE_AUTH_SCOPE_USERINFO)}&access_type=offline&include_granted_scopes=true&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${encodeURIComponent(GOOGLE_AUTH_REDIRECT_URL)}&client_id=${process.env.GOOGLE_CLIENT_ID}`);
});

router.get("/auth/callback", async (req, res, next) => {
  const { code } = req.query;
  const params = {
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: GOOGLE_AUTH_REDIRECT_URL,
    grant_type: 'authorization_code',//특정 스트링
  };
  try {
    // const { data } = await axios.post(`${GOOGLE_AUTH_TOKEN_URL}`, data:params);
    let access_token;
    await axios.post(`${GOOGLE_AUTH_TOKEN_URL}`,
      params, {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {
      access_token = response.data.access_token;
    }).catch(error => {
      console.log(`error:${error}`);
    });
    const { data: me } = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const { sub, email, name } = me;
    const userInformation = {
      email: email,
      nickname: name,
      password: sub,
    };
    await axios.post(`${backUrl}/user`,
      userInformation
    ).then((response) => {
      res.redirect(`${frontUrl}`);
    }).catch(error => {
      console.log(error);
      res.redirect(`${frontUrl}`);
    });
  } catch (error) {
    console.error(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('google-token-verify', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id'],
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id'],
        }]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

module.exports = router;