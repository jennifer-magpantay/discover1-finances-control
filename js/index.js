//load page
window.addEventListener("load", () => {
    console.log("Loading js...");

    // start the application reading list and display its content
    getTransactionValuesFromList();
    displayTransactionsRecord();
})

// global variables
// set the array of objects to save the transactions
const transactions = [
    {
        id: 1,
        description: "Lorem lorem lorem",
        type: "income",
        amount: 850.35,
        date: "01/01/2021",
    },
    {
        id: 2,
        description: "Lorem lorem lorem bye bye byeeeeeee",
        type: "outflow",
        amount: 100,
        date: "05/05/2021",
    },
    {
        id: 3,
        description: "Lorem lorem lorem bye bye byeeeeeee",
        type: "outflow",
        amount: 100,
        date: "05/05/2021",
    }
]

let currentIndex = null;

// set DOM selectors
// get modal selectors to control its state
const modal = document.querySelector('.overlay');
const btnAdd = document.querySelector('.button-add');
const btnSave = document.querySelector('.button-save');
const btnClear = document.querySelector('.button-clear');
const btnClose = document.querySelector('.button-close');

const form = document.querySelector('form');
const description = document.querySelector('#description');
const amount = document.querySelector('#amount');
const calendar = document.querySelector('#date');

// adding event listeners for selectors

btnAdd.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
btnClear.addEventListener('click', clearInputs);
// btnDelete.addEventListener('click', deleteTransaction)
form.addEventListener('submit', formSubmit);


// functions
// get values from list
function getTransactionValuesFromList() {
    let incomeAmount, outFlowAmount, balanceResult = 0;
    let filterOutflow = [];
    let filterIncome = [];

    // to sum the outflows from the array/list:
    // first filter by types by saving them into temporary lists
    filterIncome = transactions.filter((item) => item.type === "income");
    filterOutflow = transactions.filter((item) => item.type === "outflow");

    // then, sum all amounts of these lists
    incomeAmount = filterIncome.reduce((acc, curr) => acc + curr.amount, 0);
    outFlowAmount = filterOutflow.reduce((acc, curr) => acc + curr.amount, 0);

    // calculate the balance, by subtraction income - outflows
    balanceResult = incomeAmount - outFlowAmount;

    // get cashflow selectors to update the transaction's balance 
    const income = document.querySelector('.income-result');
    const outflow = document.querySelector('.outflow-result');
    const balance = document.querySelector('.balance-result');

    // set the results on the top cards
    income.innerHTML = incomeAmount.toFixed(2);
    outflow.innerHTML = outFlowAmount.toFixed(2);
    balance.innerHTML = balanceResult.toFixed(2);
}

// display records
function displayTransactionsRecord() {
    let div = "";
    transactions.forEach((item) => {
        const { id, description, type, amount, date } = item;

        // add a statement to add a class style to the type transaction, if is an income or outflow
        const typeStyle = type === "outflow" ? "expense-value" : "income-value";

        // create an element which will holds the html structure we want to display inside root
        const element = `
    <div class="transactions__container">
      <p>${description}</p>
      <p class="${typeStyle}">${amount}</p>
      <p>${date}</p>
      <button type="button" class="button-delete">x</button>
    </div>
    `;
        div += "<div>" + element + "</div>";
    });

    //then, add this to the html
    const root = document.querySelector('.root');
    root.innerHTML = div;

    // once all records are display, allow the user to delete items if needed
    deleteTransaction();
}

// add new record - transaction
function addNewTransaction() {
    // identify selectors
    // get input's form to populate the list

    // submit form
    // when the form is submited, set its input values into the list
    // transactions.push(newTransaction);
}

// form submit
function formSubmit(event) {
    // when the form is submited, clear the inputs
    event.preventDefault();
    // after submission, clear inputs
    clearInputs();
}

function getInputValuesFromForm(event) {
    console.log("getting input from form")
}

// delete record - transaction
function deleteTransaction() {
    // get selector
    let btnDelete = document.getElementsByClassName('button-delete');

    // the function getElementsByClassName returns an array of items linked to the class
    // to avoid error, we need to iterate ths list and pass to each one an event listener
    for (let index = 0; index < btnDelete.length; index++) {
        const element = btnDelete[index];
        // console.log(element);
        element.addEventListener('click', (event) => {
            // console.log("delete item index", index)
            transactions.splice(index, 1);
            // then, the item is remove from the list
            // from here, we need to render the list again
            console.log(transactions);
            displayTransactionsRecord();
        })
    }
}

// control modal state
function openModal(event) {
    // when the add button is clicked, opens the modal
    modal.classList.add('active');
    // once the modal i opened, call the function to get the inputs
}

function closeModal(event) {
    // when the button save is clicked, closes the modal
    modal.classList.remove('active');
}

// clear inputs
function clearInputs() {
    //to 'clear' the input field, set a new value to the variable, as an empty string
    description.value = "";
    amount.value = "";
    calendar.value = "";
}