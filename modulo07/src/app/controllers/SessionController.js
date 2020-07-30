const crypto = require('crypto');
const { hash } = require('bcryptjs');

const mailer = require('../../lib/mailer');
const User = require('../models/User');

module.exports = {
    loginForm(req, res) {
        return res.render("session/index");
    },
    login(req, res) {
        req.session.userId = req.user.id;

        return res.redirect('/users');
    },
    logout(req, res) {
        req.session.destroy();
        return res.redirect("/");
    },
    forgotForm(req, res) {
        return res.render("session/forgot-password");
    },
    async forgot(req, res) {
        const user = req.user

        const token = crypto.randomBytes(20).toString('hex');

        let now = new Date();
        now = now.setHours(now.getHours() + 1);

        await User.update(user.id, {
            reset_token: token,
            reset_token_expires: now,
        });

        await mailer.sendMail({
            to: req.body.email,
            from: 'no-reply@launchstore.com.br',
            subject: 'Recuperação de senha',
            html:`<h2>Tardo mais nunca falho!!</h2>
            <p>Não se preocupe, clique no link abaixo para resetar a sua senha:</p>
            <p>
                <a href="http://localhost:3000/users/reset-password?token=${token}">RECUPERA SENHA</a>
            </p>
            `
        });

        return res.render("session/forgot-password", {
            success: 'Por favor, verifique seu email para resetar a sua senha'
        });
    },
    resetForm(req, res) {
        return res.render("session/reset-password", { token: req.query.token });
    },
    async reset(req, res) {
        const { user } = req;
        const { password, token } = req.body;

        try {
            const newPassword = await hash(password, 8);

            await User.update(user.id, {
                password: newPassword,
                reset_token: "",
                reset_token_expires: ""
            });

            return res.render("session/index", {
                user: req.body,
                success: 'Sua senha foi atualizada com sucesso! Por favor, efetue o login com a nova senha.'
            });     
        } catch (error) {
            console.error(error);
            return res.render("session/reset-password", {
                user: req.body,
                token,
                error: 'Erro inesperado! Por favor, tente novamente.' 
            })
        }
    },
}