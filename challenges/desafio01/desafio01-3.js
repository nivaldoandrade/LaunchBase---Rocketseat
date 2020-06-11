// Armazenar um array de usuarios(objetos) cada usuario terá nome e tecnologias(array).

// const usuarios = [
//     {nome: 'Nivaldo', techs: ['HTML','CSS']},
//     {nome: 'Brenda', techs: ['JavaScript','Node.js']},
//     {nome: 'Fulano', techs: ['HTML', 'Node.js','CSS']},
// ];

function listaUsuarios(usuarios) {
    for (let usuario of usuarios) {
         console.log(`${usuario.nome} trabalha com ${usuario.techs.join(', ')}.`)
        };
};

// listaUsuarios(usuarios);

// Receber os dados de um objeto de usuário e retornar SE usuario trabalha com CSS ou nao.

function checaSeUsuarioUsaCss(usuario) {
        if ((usuario.techs).find(tech => tech == 'CSS')){
            return true;
        } else {
            return false;
        };
    };

function imprimirUsuariaQueUsaCss(usuarios) {
   for (let usuario of usuarios) {
        const usuarioTrabalhaComCss = checaSeUsuarioUsaCss(usuario);
        if (usuarioTrabalhaComCss) {
            console.log(`O ${usuario.nome} trabalha com CSS.`)
        }
    }

};

// imprimirUsuariaQueUsaCss(usuarios);

// Calcular soma de receitas e despesas de usuários retornar(receitas - despesas)

const usuarios = [
    {
        nome: 'Nivaldo',
        receitas: [115.3, 48.7, 98.3, 14.5],
        despesas: [85.3, 13.5, 19.9]
    },
    {
        nome: 'Brenda',
        receitas: [24.6, 214.3, 45.3],
        despesas: [185.3, 12.1, 120.0]
    },
    {
        nome: 'Fulano',
        receitas: [9.8, 120.3, 340.2, 45.3],
        despesas: [450.2, 29.9]
    },
];

function despesasReceitas(usuarios) {
    for (let usuario of usuarios) {
        const saldo = calcularSaldo(usuario.despesas, usuario.receitas);
        imprimirSaldo(usuario, saldo);
    };
};

function calcularSaldo(despesas, receitas) {
        let somaDepesa = somaNumeros(despesas);
        let somaReceita = somaNumeros(receitas);
        let total = somaReceita - somaDepesa;

        return total;
}

function somaNumeros(numeros) {
    let soma = 0;

    for (let numero of numeros) {
        soma = soma + numero;
    };

    return soma;
}

function imprimirSaldo(usuario, saldo) {
    if (saldo > 0)
        console.log(`${usuario.nome} possui o saldo POSITIVO de ${saldo}`);
    else
        console.log(`${usuario.nome} possui o saldo NEGATIVO de ${saldo}`);
};

despesasReceitas(usuarios);