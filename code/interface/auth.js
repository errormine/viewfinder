const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const vault = require("node-vault")({
  apiVersion: "v1",
  endpoint: "https://team-02m-vault-server-vm0.service.consul:8200",
});

const roleId = process.env.ROLE_ID;
const secretId = process.env.SECRET_ID;

vault.approleLogin({
  role_id: roleId,
  secret_id: secretId,
}).then((result) => {
  vault.token = result.auth.client_token; // Add token to vault object for subsequent requests.

  console.log("Vault authentication successful:", result);

  Promise.all([
    vault.read("secret/data/team02m-google-client-id"),
    vault.read("secret/data/team02m-google-client-secret")
  ]).then(([clientId, clientSecret]) => {
    const GOOGLE_CLIENT_ID = clientId.data.data["CLIENTID"];
    const GOOGLE_CLIENT_SECRET = clientSecret.data.data["CLIENTSECRET"];

    passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://system75.rice.iit.edu:5000/auth/google/callback",
      passReqToCallback: true,
    },
    function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }));
  });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});