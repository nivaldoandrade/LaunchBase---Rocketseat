// Realizar operações bancárias da conta do usuário.


const user = {
    name: 'Nivaldo',
    transactions: [],
    balance: 0,
}

function intTransactions(user){
    createTransaction('credit',50 )
    createTransaction('credit',120)
    createTransaction('debit',80)
    createTransaction('debit',30)

    for (let transaction of user.transactions){
        const newbalance = typeTransaction(transaction);
        updateBalance(newbalance);
    }

    console.log(user.balance);
    getHigherTransactionByType('credit');
    getHigherTransactionByType('debit');
    getAverageTransactionValue();
    getTransactionCount();

};

intTransactions(user);

function createTransaction(type, value) {
    return user.transactions.push({
        type,
        value,
    });
};

function typeTransaction(transaction) {
    if (transaction.type == 'credit'){
        return user.balance + transaction.value;
    } else {
        return user.balance - transaction.value ;
    }
 };

function updateBalance(newbalance) {
    user.balance = newbalance;
}

function getHigherTransactionByType(type) {
    let value = 0;
    higherTransaction = '';
    for (let transaction of user.transactions){
        if (transaction.type == type) {
            if(transaction.value > value){
                value = transaction.value;
                higherTransaction = transaction;
            };  
        }
    } 
        console.log(higherTransaction);
};

function getAverageTransactionValue() {
    let sumTransaction = 0;

    for (let transaction of user.transactions) {
        sumTransaction = sumTransaction + transaction.value;
    }

    let averegaTransaction = sumTransaction / user.transactions.length;

    console.log(averegaTransaction);
};

function getTransactionCount() {
    let transactionCount = {credit: 0, debit: 0};

    for (let transaction of user.transactions) {
        if (transaction.type == 'credit') {
            transactionCount.credit ++;
        } else {
            transactionCount.debit ++;
        }
    }

    console.log(transactionCount);
    
};




