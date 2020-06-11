// Armazenar dados da empresa Rocketseat em um objeto.

const empresa = {
    nome: 'Rocketseat',
    cor: 'Roxo',
    foco: 'Programação',
endereço : {
        rua: 'Rua Guilherme Gembala',
        numero: 260
    }
}

console.log(`A empresa ${empresa.nome} está localizada em ${empresa.endereço.rua}, ${empresa.endereço.numero}`);


// Armazenar dados de um programador em um objeto e suas tecnologias em um array

const usuario = {
    nome: 'Nivaldo',
    idade: 23,
    tecnologias: [
    {nome: 'C++', especialidade: 'Desktop'},
    {nome: 'Python', especialidade: 'Data Sciene'},
    {nome: 'JavaScript', especialidade: 'Web/Mobile'}
    ]
}


console.log(`O usuário ${usuario.nome} tem ${usuario.idade} anos e usa a tecnologia ${usuario.tecnologias[0].nome} com especialidade em ${usuario.tecnologias[0].especialidade}`)
