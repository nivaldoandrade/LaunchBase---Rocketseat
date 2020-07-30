const faker = require('faker');
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User');
const Product = require('./src/app/models/Product');
const File = require('./src/app/models/File');


let usersIds = [],
    totalUsers = 3,
    totalProducts = 30;

async function createUsers() {
    let users = [];
    const password = await hash('111', 8);

    while(users.length < totalUsers) {
        users.push({
            name: faker.name.firstName(),
            email: faker.internet.email(),
            password,
            cpf_cnpj: faker.random.number(999999999999),
            cep: faker.random.number(99999999),
            address: faker.address.streetName(),
        })
    }

    const usersPromisse = users.map(user => User.create(user));
    usersIds = await Promise.all(usersPromisse);
}

async function createProducts() {
    let products = [];

    while(products.length < totalProducts) {
        products.push({
            category_id: Math.ceil(Math.random() * 3),
            user_id: usersIds[Math.floor(Math.random() * totalUsers)],
            name: faker.name.title(),
            description: faker.lorem.paragraphs(Math.ceil(Math.random() * 10)),
            old_price: faker.random.number(9999),
            price: faker.random.number(9999),
            quantity: faker.random.number(99),
            status: Math.round(Math.random())
        });
    };

    const productsPromise = products.map(product => Product.create(product));
    let productsIds = await Promise.all(productsPromise);

    let files = [];

    while(files.length < 50) {
        files.push({
            product_id: productsIds[Math.floor(Math.random() * totalProducts)],
            name: faker.image.image(),
            path: 'public/images/placeholder.png'
        })
    }

    const filesPromise = files.map(file => File.create(file));

    await Promise.all(filesPromise);
};

async function init() {
    await createUsers();
    await createProducts();
}

init();

