require('dotenv').config();
const axios = require('axios');

const oAuthController = {};
const GITHUB_OAUTH_CLIENT_ID = process.env.GITHUB_OAUTH_CLIENT_ID;
const GITHUB_OAUTH_CLIENT_SECRET = process.env.GITHUB_OAUTH_CLIENT_SECRET;
const GITHUB_ACCESS_TOKEN_REQUEST_URL = `https://github.com/login/oauth/access_token`;
const GITHUB_REDIRECT_URI =
  'http://localhost:5173/users/oauth/access_token/redirect';
let str = GITHUB_OAUTH_CLIENT_ID.toString();
let newStr = GITHUB_REDIRECT_URI.toString();

// first step of OAuth; redirects user to github with specific client id and redirect uri's concatenated
oAuthController.oAuthLogin = async (req, res, next) => {
  try {
    console.log('sending get request to github ');
    let redirectStr =
      `https://github.com/login/oauth/authorize?` +
      'client_id=' +
      str +
      '&redirect_uri=' +
      newStr;
    let redirectURL = new URL(redirectStr);
    res.locals.url = redirectURL;
    console.log('res.locals', res.locals.url);
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
    console.log('reached requestGitHubIdentity controller');
    const { code } = req.query;
    const { data } = await axios.post(
      GITHUB_ACCESS_TOKEN_REQUEST_URL,
      {
        client_id: GITHUB_OAUTH_CLIENT_ID,
        client_secret: GITHUB_OAUTH_CLIENT_SECRET,
        code
      },
      {
        headers: {
          Accept: 'application/json'
        }
      }
    );
    console.log(data);

    // if all's good, attach access_token to res.locals and move on!
    res.locals.access_token = data.access_token;
    return next();
  } catch (error) {
    console.log(error);
    return next({
      log: `Error occurred in the oauthController.requestGitHubIdentity middleware\n Error: ${error.message}`,
      status: 400, // bad request
      err: { err: 'Error occurred in getting your Github user identity' }
    });
  }
};

// how a given user is actually authenticated
// https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
oAuthController.queryGitHubAPIWithAccessToken = async (req, res, next) => {
  try {
    const auth = res.locals.access_token;
    const { data } = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${auth}` }
    });
    console.log('response from the api');
    console.log(data);

    // set info from api to res.locals
    res.locals = {
      ...res.locals,
      ...processGitHubData(data)
    };

    return next();
  } catch (error) {
    return next({
      log: `Error occurred in the oauthController.queryGitHubAPIWithAccessToken middleware\n Error: ${error.message}`,
      status: 400, // bad request
      err: { err: 'Error occurred in querying Github API with access token' }
    });
  }
};

// // Helper function for converting Github API data to fields for database input
function processGitHubData(data) {
  const { login, id } = data;
  // only works with two names
  return {
    username: login,
    id: id
  };
}

module.exports = oAuthController;
