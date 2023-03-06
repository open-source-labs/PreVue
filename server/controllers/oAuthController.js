require('dotenv').config();
const axios = require('axios');

const oAuthController = {};
const GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const GITHUB_OAUTH_CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;
const GITHUB_ACCESS_TOKEN_REQUEST_URL = `https://github.com/login/oauth/access_token`;
const GITHUB_REDIRECT_URI =
  'http://localhost:3000/home';
let str = GITHUB_OAUTH_CLIENT_ID.toString();
let newStr = GITHUB_REDIRECT_URI.toString();


oAuthController.oAuthLogin = async (req, res, next) => {
  try {
    console.log('sending get request to github ');
    let redirectStr = `https://github.com/login/oauth/authorize?` + 'client_id=' + str + '&redirect_uri=' + newStr;
    let redirectURL = new URL(redirectStr);
    // await axios.get(redirectURL.href); 
    // return res.redirect(redirectURL.href);
    res.locals.url = redirectURL;
    console.log('res.locals', res.locals.url)
    // return res.redirect(GITHUB_REQUEST_URL.href)
    return next();
  } catch (error) {
    return next({
      log: 'Error occurred in the oauthController.oAuthLogin middleware',
      status: 400, // bad request
      err: {
        err: 'Error occurred in sending user to login to GitHub to login'
      }
    });
  }
};

// Get temporary "code" from Github (in req.query) in oauthController and AWAIT post request it back to exchange it for an access token (to Github API for user data)
oAuthController.requestGitHubIdentity = async (req, res, next) => {
  try {
    console.log('hello from requestGitHubIdentity');
    const { code } = req.query;
    // const body =
    // GITHUB_ACCESS_TOKEN_REQUEST_URL.searchParams.append('code', code);
    // GITHUB_ACCESS_TOKEN_REQUEST_URL.searchParams.append(
    //   'redirect_uri',
    //   GITHUB_REDIRECT_URI
    // );
    console.log('code: ', code);
    console.log();

    const { data } = await axios.post(
      GITHUB_ACCESS_TOKEN_REQUEST_URL,
      {
        client_id: GITHUB_OAUTH_CLIENT_ID,
        client_secret: GITHUB_OAUTH_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );
    console.table(data);
    // if (data.error)
    //   throw new Error(
    //     `${data.error}: ${data.error_description} For more info: ${data.error_uri}`
    //   );

    // if all's good, attach access_token to res.locals and move on!
    res.locals.access_token = data.access_token;
    return next();
  } catch (error) {
    return next({
      log: `Error occurred in the oauthController.requestGitHubIdentity middleware\n Error: ${error.message}`,
      status: 400, // bad request
      err: { err: 'Error occurred in getting your Github user identity' },
    });
  }
};

module.exports = oAuthController;
