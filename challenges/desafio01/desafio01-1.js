// Calcular o IMC e nível de obesidade de uma pessoa.

const nome = 'Nivaldo';
const peso = 79;
const altura = 1.75;

const imc = peso / ( altura * altura);

if (imc >= 30 || imc <= 29.9) {
    console.log(`${nome} voce está acima do peso.`);
} else {
    console.log(`${nome} voce não está acima do peso.`);
};



// Calcular a aposentadoria de uma pessoa.

const nome = 'Nivaldo';
const sexo = 'M';
const idade = 23;
const contribuicao = 3;
const calc = idade + contribuicao;


if (sexo === 'M') {
    if (contribuicao >= 35 && calc >= 95) {
        console.log(`${nome}, voce pode ser aposentar!`);
    } else {
        console.log(`${nome}, voce ainda nao pode ser aposentar!`);
    }
} else if (sexo === 'F') {
    if (contribuicao >= 30 && calc >= 85) {
        console.log(`${nome}, voce pode ser aposentar!`);
    } else {
        console.log(`${nome}, voce ainda nao pode ser aposentar!`);
    }
}


