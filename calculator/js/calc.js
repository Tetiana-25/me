const dropdownList = document.querySelector("#select");
const inputInitialLoan = document.querySelector('.initial_loan');
const inputDownPayment = document.querySelector('.down_payment');
const calculateButton = document.querySelector('#calculate');
const result = document.querySelector('#calc__results');

const db = openDatabase('bank', '1.0', 'Test DB', 5 * 1024 * 1024);
db.transaction(function(tx) {
    tx.executeSql("SELECT * FROM bank_4", [], function(tx, result) {
        for (let i = 0; i < result.rows.length; i++) {
            let name = result.rows.item(i)['name'];
            let option = document.createElement('option');
            option.value = name;
            option.innerText = name;
            dropdownList.insertAdjacentElement("beforeend", option);
        }
    });
});

calculateButton.addEventListener('click', function() {
    let clientInitialLoan = inputInitialLoan.value;
    let clientDownPayment = inputDownPayment.value;
    console.log(clientDownPayment);
    console.log(clientInitialLoan);
    console.log(dropdownList.value);
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM bank_4", [], function(tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                if (dropdownList.value == result.rows.item(i)['name']) {
                    bankInterestRate = result.rows.item(i)['interestRate'];
                    bankMaxLoan = result.rows.item(i)['maxLoan'];
                    bankMinDownPayment = result.rows.item(i)['minDownPayment'];
                    bankLoanTerm = result.rows.item(i)['loanTerm'];
                    console.log("Bank max loan", bankMaxLoan);
                    console.log(+clientInitialLoan > +bankMaxLoan);
                    console.log(+clientDownPayment < (((+bankMinDownPayment) / 100) * (+clientInitialLoan)));
                    if ((+clientInitialLoan <= +bankMaxLoan) && (+clientDownPayment >= (((+bankMinDownPayment) / 100) * (+clientInitialLoan)))) {
                        let res1 = ((+clientInitialLoan) * ((+bankInterestRate / 100) / 12)) * ((1 + ((+bankInterestRate / 100) / 12)) ** (+bankLoanTerm));
                        let res2 = ((1 + (((+bankInterestRate) / 100) / 12)) ** (+bankLoanTerm)) - 1;
                        let results = res1 / res2;
                        document.querySelector('#calc__results').style.color = "black";
                        document.querySelector('#calc__results').innerHTML = Math.round(results) + "$ per month during " + bankLoanTerm + " month";
                    } else if ((+clientInitialLoan > +bankMaxLoan) && (+clientDownPayment < (((+bankInterestRate) / 100) * (+clientInitialLoan)))) {
                        let res = "ERROR. Initial Loan must be < " + bankMaxLoan + "<br> ERROR. Minimum down payment must be > " + bankMinDownPayment + "%";
                        document.querySelector('#calc__results').innerHTML = "";
                        document.querySelector('#calc__results').style.color = "red";
                        document.querySelector('#calc__results').innerHTML = res;
                    } else if (+clientInitialLoan > +bankMaxLoan) {
                        let res = "ERROR. Initial Loan must be < " + bankMaxLoan;
                        document.querySelector('#calc__results').style.color = "red";
                        document.querySelector('#calc__results').innerHTML = res;
                    } else if (+clientDownPayment < (((+bankInterestRate) / 100) * (+clientInitialLoan))) {
                        let res = "<br> ERROR. Minimum down payment must be > " + bankMinDownPayment + "%";
                        document.querySelector('#calc__results').style.color = "red";
                        document.querySelector('#calc__results').innerHTML = res;
                    }

                }
            }
        });
    });



});