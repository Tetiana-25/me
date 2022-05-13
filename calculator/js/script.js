const db = openDatabase('bank', '1.0', 'Test DB', 5 * 1024 * 1024);
document.querySelectorAll('.bank__block').forEach(block => {
    block.remove();
})
showAllBanks()
createNewTableDB();
function createNewTableDB() {
    db.transaction(function(tx) {
        tx.executeSql('CREATE TABLE bank_4 (id,name,interestRate, maxLoan, minDownPayment,loanTerm)');
    });

};

const template_card = document.querySelector("#card_template").innerHTML;
const modal_add_button = document.querySelector('.submit_add');
const form__add = document.querySelector('.form__add');
const add_button = document.querySelector('.add__img');
const successMessage = document.querySelector('.modal_add');
const form_edit = document.querySelector('.modal_edit');
const submit_edited = document.querySelector('#submit__edit');
const goToCalcButton = document.querySelector('#calculator');

function showAllBanks() {
    let banks = [];
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM bank_4", [], function(tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                let new_bank = {};
                new_bank.name = result.rows.item(i)['name'];
                new_bank.interestRate = result.rows.item(i)['interestRate'];
                new_bank.maxLoan = result.rows.item(i)['maxLoan'];
                new_bank.minDownPayment = result.rows.item(i)['minDownPayment'];
                new_bank.loanTerm = result.rows.item(i)['loanTerm'];
                banks.push(new_bank);
            }
            for (let i = 0; i < banks.length; i++) {
                let rendered = Mustache.render(template_card, banks[i]);

                // document.body.appendChild(rendered);
                document.querySelector('.banks').innerHTML += rendered;
            }
        });
    });
};


add_button.addEventListener('click', function() {
    createCard();
});

function createCard() {
    let new__bank = {};
    new__bank.name = "";
    new__bank.interestRate = "";
    new__bank.maxLoan = "";
    new__bank.minDownPayment = "";
    new__bank.loanTerm = "";
    new__bank.id_ = getID();
    db.transaction(function(tx) {
        tx.executeSql('INSERT INTO bank_4 (id, name, interestRate, maxLoan, minDownPayment,loanTerm) VALUES (?, ?, ?, ?, ?, ?)', [new__bank.id_, new__bank.name, new__bank.interestRate, new__bank.maxLoan, new__bank.minDownPayment, new__bank.loanTerm]);
    });

    document.querySelectorAll('.bank__block').forEach(block => {
        block.remove();
    })
    showAllBanks();
    successMessage.style.display = "block";
};

function getID() {
    let usedNumbers = [];
    outer:
        while (true) {
            rand_id = Math.floor(Math.random() * (99999 - 10000)) + 10000;
            for (let i = 0; i < usedNumbers.length; i++) {
                if (usedNumbers[i] === rand_id) {
                    break outer;
                }

            }
            break;
        }
    usedNumbers.push(rand_id);
    return rand_id;
};

function edited(button) {
    form_edit.style.display = "block";
    let par1 = button.parentElement.parentElement.parentElement;
    let children = par1.childNodes;
    children.forEach(child => {
        if (child.className == "bank__name") {
            child.childNodes.forEach(i => {
                if (i.className == "templ_name") {
                    bank_name = i.innerText;
                    document.querySelector('#input__name').value = bank_name;
                }
            })
        };
        if (child.className == "bank__interestRate") {
            child.childNodes.forEach(i => {
                if (i.className == "templ_interestRate") {
                    bank_interestRate = i.innerText;
                    document.querySelector('#input__interestRate').value = bank_interestRate;
                }
            })
        };
        if (child.className == "bank__maxLoan") {
            child.childNodes.forEach(i => {
                if (i.className == "templ_maxLoan") {
                    bank_maxLoan = i.innerText;
                    document.querySelector('#input__maxLoan').value = bank_maxLoan;
                }
            })
        };
        if (child.className == "bank__minDownPayment") {
            child.childNodes.forEach(i => {
                if (i.className == "templ_minDownPayment") {
                    bank_minDownPayment = i.innerText;
                    document.querySelector('#input__minDownPayment').value = bank_minDownPayment;
                }
            })
        };
        if (child.className == "bank__loanTerm") {
            child.childNodes.forEach(i => {
                if (i.className == "templ_loanTerm") {
                    bank_loanTerm = i.innerText;
                    document.querySelector('#input__loanTerm').value = bank_loanTerm;
                }
            })
        };


    });
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM bank_4", [], function(tx, result) {
            for (let i = 0; i < result.rows.length; i++) {
                if (bank_name == result.rows.item(i)['name']) {
                    id = result.rows.item(i)['id'];
                }
            }
        });
    });


};


submit_edited.addEventListener('click', function() {

    bank_name = document.querySelector('#input__name').value;
    bank_interestRate = document.querySelector('#input__interestRate').value;
    bank_maxLoan = document.querySelector('#input__maxLoan').value;
    bank_minDownPayment = document.querySelector('#input__minDownPayment').value;
    bank_loanTerm = document.querySelector('#input__loanTerm').value;
    db.transaction(function(tx) {
        tx.executeSql('update bank_4 set name =? where id =?', [bank_name, id]);
        tx.executeSql('update bank_4 set interestRate=? where id =?', [bank_interestRate, id]);
        tx.executeSql('update bank_4 set maxLoan=? where id =?', [bank_maxLoan, id]);
        tx.executeSql('update bank_4 set minDownPayment=? where id =?', [bank_minDownPayment, id]);
        tx.executeSql('update bank_4 set loanTerm=? where id =?', [bank_loanTerm, id]);
    });

    document.querySelectorAll('.bank__block').forEach(block => {
        block.remove();
    })
    showAllBanks();
    form_edit.style.display = "none";
});


function deleted(button) {
    let par1 = button.parentElement;

    let par2 = par1.parentElement;

    par2.parentElement.childNodes.forEach(child => {
        child.childNodes.forEach(child => {
            if (child.className == "templ_name") {
                bank_name = child.innerText;
            }
        })
    });

    par2.parentElement.remove();
    db.transaction(function(tx) {
        tx.executeSql('DELETE FROM bank_4 where name =?', [bank_name]);
    });
};

function closed(button) {
    button.parentElement.style.display = "none";
    document.querySelectorAll('input').forEach(input => {
        input.value = "";
    });
};

goToCalcButton.addEventListener('click', function() {
    location.href = "calc.html";
})