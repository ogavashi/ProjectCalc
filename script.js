const numberButtons = document.querySelectorAll('.number');
const screen = document.querySelector('.screen');
const buttons = document.querySelectorAll('button');
const ac = document.querySelector('#clear')
const backSpace = document.querySelector('#backspace');
const operatorButtons = document.querySelectorAll('.operator');
const equal = document.querySelector('#equals');
const fac = document.querySelector('#fact');
const pow = document.querySelector('#pow');
const changer = document.querySelector('#negative-positive');
const dotEnable = document.querySelector('#period');
const maxSize = 9;


let audio = new Audio('click.mp3');
let op = '';
let number1 = {
    isDrip: false,
    value : ''
};
let num1 = null; 
let num2 = null;



function display(kerets) {
    if(typeof kerets == 'number')
    kerets = Math.round((kerets + Number.EPSILON) * 100) / 100;
    if(typeof kerets == 'string' && kerets.length >15) {
        kerets = kerets.substring(0, 15);
    }
    screen.innerHTML = kerets;
    number1.value = String(kerets);
}


dotEnable.addEventListener('click', () => {
    if(number1.isDrip == false && number1.value != '') {
    number1.isDrip = true;
    number1.value+= '.';
    display(number1.value);
    }
});

changer.addEventListener('click', () => {
    if(number1.value != '') {
    let numer = parseFloat(number1.value);
    number1.value = String(numer *-1);
    display(number1.value);
    }
});

fac.addEventListener('click', () => {
    if(number1.value == '') return; 
    if(num1 == null || undefined)
    num1 = parseFloat(number1.value);
    let res = factorial(num1);
    display(res);
    number1.value = String(res);
    num1 = res;
});

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(number1.value.length < maxSize)
        number1.value += button.textContent;
        display(number1.value);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        number1.isDrip = false;
        if(number1.value == '') return;
        if(op == ''){
            op = button.textContent;
            num1 = parseFloat(number1.value);
            number1.value = '';
        }
        else {
            num2 = parseFloat(number1.value);
            num1 = getAnswer();
            op = button.textContent;
            display(num1);
            number1.value = '';
        }
    });
});

equal.addEventListener('click', () => {
    if(number1.value == '' || op == '') return;
    num2 = parseFloat(number1.value);
    display(getAnswer());
    op = '';
});

backSpace.addEventListener('click', () => {
    if(number1.value == '') return; 
    number1.value = number1.value.substring(0, number1.value.length - 1);
    display(number1.value);
});

ac.addEventListener('click', () => {
    clearCalc();
});

buttons.forEach((button) => {
    button.addEventListener('click', () => audio.play() )
})

function getAnswer(){
    return(operator(num1, num2, op));
}

function factorial(n) {
    if(n < 0) return 'error';
    return n ? n * factorial(n - 1) : 1;
  }
  
function clearCalc() {
    number1.value = '';
    num1 = undefined;
    num2 = undefined;
    op = '';
    display(number1.value);
}

function operator(num1 = 0, num2 = 0, oper) {
    switch(oper){
        case '+': return num1+num2;
        break;
        case '-': return num1-num2;
        break;
        case 'X': return num1*num2;
        break;
        case '/': if(num2 != 0) return num1/num2;
        else return 'error'; 
        case 'xy': return Math.pow(num1, num2);
        default: break;
    }
}
