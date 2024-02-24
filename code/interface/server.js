import { handler } from './build/handler.js';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import * as auth from './auth.cjs';

const app = express();

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(process.env.PORT, () => {
	console.log('listening on port: ' + process.env.PORT);
});