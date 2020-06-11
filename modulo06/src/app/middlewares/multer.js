const multer = require('multer');
const crypto = require('crypto');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/images');
    },
    filename: (req, file, cb) => {
        const hash = crypto.randomBytes(6).toString('hex');
        const fileName = `${hash}-${file.originalname}`;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const isAccepted = ['image/png', 'image/jpg', 'image/jpeg'].find(acceptedFomart => acceptedFomart == file.mimetype);

    if(isAccepted) {
        return cb(null, true);
    };    

    return cb(null, false);
};


module.exports = multer({
    storage,
    fileFilter
});