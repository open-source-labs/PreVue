const Session = require('../models/sessionModel');
const sessionController = {};

// check cookie for res.cookie.ssid
// query DB for that cookie value
// if found, user is verified
sessionController.isLoggedIn = (req, res, next) => {
  let query = { cookieId: req.cookies.ssid };
  if ('id' in res.locals) query = { _id: res.locals.id };
  console.log(query);
  Session.findOne(query)
    .then((result) => {
      console.log(result);
      next();
    })
    .catch((err) =>
      next({
        log: err,
        error: `error found in sessionController.isLoggedIn`,
      })
    );
};

sessionController.startSession = (req, res, next) => {
  //write code here
  // Session.create(...)
  Session.create({ cookieId: res.locals.id }) // findOneAndUpdate()?
    .then((result) => {
      console.log('result', result);
      next();
    })
    .catch((err) => {
      next({
        log: err,
        error: `error found in sessionController.startSession`,
      });
    });
};

sessionController.oauthVerify = (req, res, next) => {
  console.log("in oauth...");
  // console.log(req.query);
  const code = req.query.code;
  if (!code) return next();
  // POST back to github
  const params = {
    client_id: "2f0260d8014e87506756",
    client_secret: "dd34ad49787c7e80e208a533f26a932bae4a8558",
    code,
    // redirect_uri: "localhost:3000/secret",
  };
  const OAUTH_URI = "https://github.com/login/oauth/access_token";
  // console.log(OAUTH_URI);
  fetch(OAUTH_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(params),
  })
  // const text = await request.text();
  // console.log(text);
  // Session.findOneAndUpdate(
  //   { cookieId: text },
  //   { cookieId: text },
  //   { upsert: true, returnOriginal: false }
  // )
  //   .then((result) => {
  //     if (result) console.log("done?");
  //     console.log(result);
  //     // update ssid:
  //     res.locals.ssid = result._id.toString();
  //     res.cookie("ssid", result._id.toString(), { httpOnly: true });
  //     console.log(result);
  //     return next();
  //   })
    .catch((err) => {
      console.log("error");
      console.log(err);
      return next(); //already in database
    });
};

module.exports = sessionController;
