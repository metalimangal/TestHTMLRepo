let currentOperand = '';
let previousOperand = '';
let operation = null;

function truncateToEightDecimals(value) {
  if (isNaN(value)) return "Error"; // Handle invalid inputs
  return parseFloat(value.toFixed(8)); // Convert to float after fixing to 8 decimals
}

function updateDisplay() {
    const display = document.getElementById('displayText');
    if (currentOperand) {
        display.innerText = truncateToEightDecimals(parseFloat(currentOperand)); // If currentOperand has a value, display it
    } else {
        display.innerText = '0'; // If currentOperand is empty or false, display '0'
    }
  }
  
  function operationDisplay(){
    const operandText = document.getElementById('operationText');
    if(operation){
      operandText.innerText = operation;
    }
    else{
      operandText.innerText = '=';
    }
  }

function appendNumber(number) {
  if (currentOperand.includes('.') && number === '.') return; //Observe that we have used === for equals, && means and condition - this is true when both the conditions are true else false
  currentOperand += number;
  updateDisplay();
}

function chooseOperator(operator) {
  if (currentOperand === '') return; // When we do not have any operands entered, we return back, i.e. we do not continue with the code
  if (previousOperand !== '') computeResult(); //If we have a previousOperand, we compute the result and come back here
  operation = operator; // We store the operator in the operation, later we use this operation to compute the result when the 2nd operand is added
  previousOperand = currentOperand; // We store the current operand in the previous operand
  currentOperand = ''; // Remove the current operand value, so that we can accept the secong operand
  operationDisplay();
}

function clearDisplay() {
  currentOperand = '';
  previousOperand = '';
  operation = null;
  updateDisplay();
}

function computeResult() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return;
  }

  currentOperand = computation;
  operation = null;
  previousOperand = '';
  updateDisplay();
  operationDisplay();
}

