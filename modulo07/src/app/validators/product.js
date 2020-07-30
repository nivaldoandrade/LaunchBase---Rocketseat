function post(req, res, next) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == '' && key != 'remove_files') {
            return res.send(`Por favor, preencha todos os campos.`)
        };
    };

    if(!req.files && req.files.length == 0) {
        return res.send('Por favor, adicione pelo menos 1 imagem.');
    };

    next();
}

function put(req, res, next) {
    const keys = Object.keys(req.body);

    for(key of keys) {
        if(req.body[key] == '' && key != 'remove_files' && key != 'photos' && key != 'image_fetuared') {
            return res.send('Por favor, preencha todos os campos.');
        };
    };

    next();
}


module.exports = {
    post,
    put,
}