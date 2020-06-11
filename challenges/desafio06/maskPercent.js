function percent(value) { 

    let options = {
        style: 'percent',
        minimumFractionDigits:2,
        maximumFractionDigits:4,
    }

    let formatter = new Intl.NumberFormat('pt-br', options);

    let discountFormat = formatter.format(value);

    console.log(discountFormat);
}

function fomartCPF(cpf) {

    cpf = String(cpf).replace(/\D/g , "");
    cpf = String(cpf).replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    console.log(cpf);
}

percent(0.234567)
fomartCPF(99999999999)


