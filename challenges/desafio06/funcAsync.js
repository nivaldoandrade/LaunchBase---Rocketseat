const funcao = async (number, result) => {
    let time = Math.floor((Math.random() * 100) + 1);
    const promise =  new Promise(resolve => { setTimeout((resolve(calculate(number, result)), time)) });
    promise.then(value => {console.log(value)});
    return promise;
};

function calculate(number, result) {
    return ((number*2) + result);
};

async function init () {
    let result;
    result =  await funcao(5, 0); // retorna 10
    result =  await funcao(12, result); // retorna 34
    result = await funcao(2, result); //retorna 38 
};

init()




