let budget=document.getElementById("total-amount"); //getting info from input box
let price=document.getElementById("price");
const setBudgetButton=document.getElementById("total-amount-button");
const checkAmountButton=document.getElementById("check-amount");
const productName=document.getElementById("product-name");
const budgetError=document.getElementById("budget-error");
const productNameError=document.getElementById("product-name-error");
const amount=document.getElementById("amount");
const expensesAmount=document.getElementById("expenses-amount");
const balanceAmount=document.getElementById("balance-amount");
const list=document.getElementById("list");
let tempAmount=0;
//SETTING BUDGET
//when clicking on SET BUDGET we will check the cintent of the input box
setBudgetButton.addEventListener("click",()=>{
    tempAmount=budget.value;
    if(tempAmount==="" || tempAmount<0) {
        budgetError.classList.remove("hide"); //removing the class hide whick puts display of error message as none
    } else {
        //innerHTML 
        budgetError.classList.add("hide");//hiding the error msg
        amount.innerHTML=tempAmount;
        console.log(amount.innerHTML);
        balanceAmount.innerHTML=tempAmount-expensesAmount.innerHTML;
        console.log(balanceAmount.innerHTML);
        budget.value="";
    }
})
//DISABLE EDIT AND DISABLE BUTTONS FOR THE LIST
const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
      element.disabled = bool;
    });
  };
//MODIFYING LIST ELEMENTS
const modifyElement = (element, edit = false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceAmount.innerText;
    let currentExpense = expensesAmount.innerText;
    let parentAmount = parentDiv.querySelector(".amount").innerText;
    if (edit) {
      let parentText = parentDiv.querySelector(".product").innerText;
      productName.value = parentText;
      price.value = parentAmount;
      disableButtons(true);
    }
    balanceAmount.innerText = parseInt(currentBalance) + parseInt(parentAmount);//parseInt string-->number
    expensesAmount.innerText =
      parseInt(currentExpense) - parseInt(parentAmount);
    parentDiv.remove();
  };
  //CREATING EXPENSES LIST
  const listCreator = (expenseName, expenseValue) => {
    let sublistContent = document.createElement("div");
    sublistContent.classList.add("sublist-content", "flex-space");
    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    let editButton = document.createElement("button");
    editButton.classList.add("fa-solid", "fa-pen-to-square","edit");
    editButton.style.fontSize = "1.2em";
    editButton.addEventListener("click", () => {
      modifyElement(editButton, true);
    });
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("fa-solid", "fa-trash", "delete");
    deleteButton.style.fontSize = "1.2em";
    deleteButton.addEventListener("click", () => {
      modifyElement(deleteButton);
    });
    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById("list").appendChild(sublistContent);
  };
//ADDING EXPENSES
checkAmountButton.addEventListener("click", () => {
    //empty checks
    if (!price.value || !productName.value) {
        productNameError.classList.remove("hide");
      return false;
    }
    //Enable buttons
    disableButtons(false);
    //Expense
    let expenditure = parseInt(price.value);
    //Total expense (existing + new)
    let sum = parseInt(expensesAmount.innerText) + expenditure;
    expensesAmount.innerText = sum;
    //Total balance(budget - total expense)
    const totalBalance = tempAmount - sum;
    balanceAmount.innerText = totalBalance;
    //Create list
    listCreator(productName.value, price.value);
    //Empty inputs
    productName.value = "";
    price.value = "";
  });