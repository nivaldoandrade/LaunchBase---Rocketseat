const Product = require('../app/models/Product');

const { formatPrice, date } = require("../lib/utils");


async function getImage(productId) {
    let files = await Product.files(productId);
    files = files.map(file => ({
        ...file,
        src:`${file.path.replace("public\\images\\", "/images/")}`
    }));

    return files;
};

async function format(product) {
    const files = await getImage(product.id);
    product.img = files[0].src;
    product.files = files;
    product.formattedOldPrice = formatPrice(product.old_price);
    product.formattedPrice = formatPrice(product.price);

    const { day, month, hour, minute } = date(product.updated_at);

    product.published =  {
        date: `${day}/${month}`,
        hour: `${hour}:${minute}`
    };

    return product;
}


const LoadService = {
    load(service, filters) {
        this.filters = filters;
        return this[service]()
    },
    async product() {
        try {
            const product = await Product.findOne(this.filters);
            return format(product);
        } catch (error) {
            console.error(error);
        };
    },
    async products() {
        try {
            const products = await Product.findAll(this.filter);
            const productsPromise = products.map(format);
            return Promise.all(productsPromise);
        } catch (error) {
            console.error(error);
        }

    },
    format,
}



module.exports = LoadService;