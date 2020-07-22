const User = require('../models/User');
const { compare } = require('bcryptjs');

async function login(req, res, next) {
    const { email, password } = req.body;

    const user = await User.findOne({where: {email} });

    if(!user) {
        return res.render('users/register', {
            user: req.body,
            error: 'Usuário não cadastrado.'
        });
    }

    const passed = await compare(password, user.password);

    if(!passed) {
        return res.render('session/index', {
            user: req.body,
            error: 'Senha incorreta.'
        })
    }

    req.user = user;

    next(); 
};

async function forgot(req, res, next) {
    const { email } = req.body;

    const user = await User.findOne({where: {email} });

    if(!user) {
        return res.render("session/forgot-password", {
            user: req.body,
            error: 'Email não cadastrado.'
        });
    }; 

    req.user = user;

    next();
};

async function reset(req, res, next) {
    const {password, email, passwordRepeat, token } = req.body;

    const user = await User.findOne({ where: {email} });

    if(!user) {
        return res.render("session/reset-password", {
            user: req.body,
            token,
            error: 'Usuário não cadastrado.'
        })
    }

    if(password !== passwordRepeat) {
        return res.render("session/reset-password", {
            user: req.body,
            token,
            error: 'A senha e a repeticão da senha estão incorretas.'
        });
    };

    if(token !== user.reset_token) {
        return res.render("session/reset-password", {
            user: req.body,
            token,
            error: 'Token inválido! Por favor, solicite uma nova recuperação de senha.'
        });
    };

    let now = new Date();
    now = now.setHours(now.getHours());
    
    if(now > user.reset_token_expires) {
        return res.render("session/reset-password", {
            error: 'Token expirado! Por favor, solicite uma nova recuperação de senha.' 
        });
    };

    req.user = user;

    next();

}

module.exports = {
    login,
    forgot,
    reset,
};