const LoadProductService = require('../../services/LoadProductService');
const User = require('../models/User');
const mailer = require('../../lib/mailer');


const email = (seller, product, buyer) => `
<h2>Olá ${seller.name},</h2>
<p>Voce tem um novo pedido de compra:</p>
<p>Produto: ${product.name}</p>
<p>Preço: ${product.formattedPrice}</p>
<p><br/><br/></p>
<h3>Dados do comprador:</h3>
<p>${buyer.name}</p>
<p>${buyer.email}</p>
<p>${buyer.address}</p>
<p>${buyer.cep}</p>
<p><br/><br/></p>
<p><strong>Entre em contato com o comprador para finalizar a venda!</strong></p>
<p><br/><br/></p>
<p>Atenciosamente,<br/>Equipe Launchstore</p>
`

module.exports = {
    async post(req, res) {
        try {
            
            const product = await LoadProductService.load('product', { where: { id: req.body.id } });

            const seller = await User.findOne({ where: { id: product.user_id } });

            const buyer = await User.findOne({ where: { id: req.session.userId } });

            mailer.sendMail({
                to: seller.email,
                from: 'reply@launchstore.com.br',
                subject: `Novo pedido de compra - ${product.name}`,
                html: email(seller, product, buyer)
            });

            res.render("orders/success");
        } catch (error) {
            console.error(error);
            res.render("orders/error");
        }
    },
}
