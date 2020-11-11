
// ELEMENTS SELECTORS
const input_element = document.querySelector('.input');
const output_user_input_element = document.querySelector('.user_input .value');
const output_result_element = document.querySelector('.result .value');

// IMPORTANT VARIABLES
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(";
const FACTORIAL = "FACTORIAL";
let ans = 0;

// OBJECT FOR SAVING USER INPUT AND CONVERTING IT INTO A JAVASCRIPT FORMULA
let data = {

    user_input: [],
    javascript_formula: []

}

// ARRAY OF CALCULATOR BUTTON OBJECTS EACH HAVING PROPERTY name,identifier,javascript_formula,type
let calculator_buttons = [
    {
        name : "rad",
        identifier : "Rad",
        javascript_formula : false,
        type : "key"
    },
    {
        name : "deg",
        identifier : "Deg",
        javascript_formula : false,
        type : "key"
    },
    {
        name : "pi",
        identifier : "π",
        javascript_formula : "Math.PI",
        type : "number"
    },
    {
        name : "e",
        identifier : "e",
        javascript_formula : "Math.E",
        type : "number"
    },
    {
        name : "open-parenthesis",
        identifier : "(",
        javascript_formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        identifier : ")",
        javascript_formula : ")",
        type : "number"
    },
    {
        name : "clear",
        identifier : "C",
        javascript_formula : false,
        type : "key"
    },
    {
        name : "delete",
        identifier : "⌫",
        javascript_formula : false,
        type : "key"
    },
    {
        name : "square-root",
        identifier : "√",
        javascript_formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "sin",
        identifier : "sin",
        javascript_formula : "trigo(Math.sin,",
        type : "trigo_function"
    },
    {
        name : "cos",
        identifier : "cos",
        javascript_formula : "trigo(Math.cos,",
        type : "trigo_function"
    },

    {
        name : "tan",
        identifier : "tan",
        javascript_formula : "trigo(Math.tan,",
        type : "trigo_function"
    },
    {
        name : "7",
        identifier : 7,
        javascript_formula : 7,
        type : "number"
    },
    {
        name : "8",
        identifier : 8,
        javascript_formula : 8,
        type : "number"
    },
    {
        name : "9",
        identifier : 9,
        javascript_formula : 9,
        type : "number"
    },
    {
        name : "division",
        identifier : "÷",
        javascript_formula : "/",
        type : "operator"
    },
    {
        name : "square",
        identifier : "x²",
        javascript_formula : POWER,
        type : "math_function"
    },
    {
        name : "asin",
        identifier : "asin",
        javascript_formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },
    {
        name : "acos",
        identifier : "acos",
        javascript_formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },
    {
        name : "atan",
        identifier : "atan",
        javascript_formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        identifier : 4,
        javascript_formula : 4,
        type : "number"
    },
    {
        name : "5",
        identifier : 5,
        javascript_formula : 5,
        type : "number"
    },
    {
        name : "6",
        identifier : 6,
        javascript_formula : 6,
        type : "number"
    },
    {
        name : "multiplication",
        identifier : "×",
        javascript_formula : "*",
        type : "operator"
    },
    {
        name : "power",
        identifier : "x<span>y</span>",
        javascript_formula : POWER,
        type : "math_function"
    },
    {
        name : "log",
        identifier : "log",
        javascript_formula : "Math.log10",
        type : "math_function"
    },
    {
        name : "ln",
        identifier : "ln",
        javascript_formula : "Math.log",
        type : "math_function"
    },
    {
        name : "exp",
        identifier : "exp",
        javascript_formula : "Math.exp",
        type : "math_function"
    },
    {
        name : "1",
        identifier : 1,
        javascript_formula : 1,
        type : "number"
    },
    {
        name : "2",
        identifier : 2,
        javascript_formula : 2,
        type : "number"
    },
    {
        name : "3",
        identifier : 3,
        javascript_formula : 3,
        type : "number"
    },
    {
        name : "subtraction",
        identifier : "–",
        javascript_formula : "-",
        type : "operator"
    },
    {
        name : "factorial",
        identifier : "×!",
        javascript_formula : FACTORIAL,
        type : "math_function"
    },
    {
        name : "percent",
        identifier : "%",
        javascript_formula : "/100",
        type : "number"
    },
    {
        name : "decimal",
        identifier : ".",
        javascript_formula : ".",
        type : "number"
    },
    {
        name : "ANS",
        identifier : "ANS",
        javascript_formula : "ans",
        type : "number"
    },
    {
        name : "0",
        identifier : 0,
        javascript_formula : 0,
        type : "number"
    },
    {
        name : "calculate",
        identifier : "=",
        javascript_formula : "=",
        type : "calculate"
    },
    {
        name : "addition",
        identifier : "+",
        javascript_formula : "+",
        type : "operator"
    }
];

// CREATE CALCULATOR BUTTONS
function showButtons(){

    const btns_count_per_row = 8;
    let added_btns_count = 0;

    calculator_buttons.forEach( button => {

        if(added_btns_count % btns_count_per_row == 0){
            input_element.innerHTML += `<div class="row"></div>`;
        }

        const row = document.querySelector('.row:last-child');

        row.innerHTML += `<button id = ${button.name}>
                                ${button.identifier}
                            </button>`;
        added_btns_count++;

    });
}

showButtons();

// ANGLE UNITS RADIAN AND DEGREE
let RADIAN  = true;
const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

/*Assigning active-angle class to rad_btn initially*/
rad_btn.classList.add("active-angle");

// ANGLE TOGGLER FUNCTION TOGGLING THE "active-angle" CLASS BETWEEN "rad_btn" & "deg_btn"
function angleToggler(){
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}

// EVENT LISTENER
input_element.addEventListener("click" , event =>{

    const target_btn = event.target;

    /* Finding button clicked by the user and then passing it to the calculator function*/ 
    calculator_buttons.forEach(button =>{
        if(button.name == target_btn.id) calculator(button);
    })

});

// CALCULATOR FUNCTION PERFORMING DIFFERENT OPERATIONS BASED ON THE BUTTON TYPE 
function calculator(button){

    if(button.type == "operator"){

        data.user_input.push(button.identifier);
        data.javascript_formula.push(button.javascript_formula);

    }else if(button.type == "number"){

        data.user_input.push(button.identifier);
        data.javascript_formula.push(button.javascript_formula);

    }else if(button.type == "trigo_function"){

        data.user_input.push(button.identifier+"(");
        data.javascript_formula.push(button.javascript_formula);

    }else if(button.type == "math_function"){

        let identifier;
        let javascript_formula;

        if(button.name == "factorial"){

            identifier = "!";
            javascript_formula = button.javascript_formula;

            data.user_input.push(identifier);
            data.javascript_formula.push(javascript_formula);

        }else if(button.name == "power"){

            identifier = "^(";
            javascript_formula = button.javascript_formula;

            data.user_input.push(identifier);
            data.javascript_formula.push(javascript_formula);

        }else if(button.name == "square"){

            identifier = "^(";
            javascript_formula = button.javascript_formula;

            data.user_input.push(identifier);
            data.javascript_formula.push(javascript_formula);

            data.user_input.push("2)");
            data.javascript_formula.push("2)");

        }else{

            identifier = button.identifier + "(";
            javascript_formula = button.javascript_formula + "(";

            data.user_input.push(identifier);
            data.javascript_formula.push(javascript_formula);

        }

    }else if(button.type == "key"){

        if(button.name == "clear"){

            data.user_input = [];
            data.javascript_formula = [];
            updateOutputResult(0);

        }else if(button.name == "delete"){

            data.user_input.pop();
            data.javascript_formula.pop();

        }else if(button.name == "rad"){

            RADIAN = true;
            angleToggler();

        }else if(button.name == "deg"){

            RADIAN = false;
            angleToggler();

        }
    }else if(button.type == "calculate"){

        // FORMULA BEFORE THE CORRECTION
        let formula_str = data.javascript_formula.join('');
        console.log(formula_str);

        
        // FIXING ISSUES WITH FACTORIAL AND POWER FUNCTIONS

        // ARRAY CONTAINING INDICES OF POWER FUNCTIONS 
        let POWER_INDICES = search(data.javascript_formula,POWER);

        // ARRAY CONTAINING INDICES OF FACTORIAL FUNCTIONS
        let FACTORIAL_INDICES = search(data.javascript_formula,FACTORIAL);

        // ARRAY CONTAINING BASES OF ALL THE  POWER FUNCTIONS
        const BASES = findBASES(data.javascript_formula,POWER_INDICES);

        // CORRECTING THE CONFLICTS WITH POWER FUNCTIONS
        BASES.forEach(base =>{

            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";

            formula_str = formula_str.replace(toReplace,replacement);
        });

        // ARRAY CONTAINING ARGUMENTS OF  ALL THE FACTORIAL FUNCTIONS
        const ARGUMENTS = findARGUMENTS(data.javascript_formula,FACTORIAL_INDICES);

        ARGUMENTS.forEach(factorial =>{
            formula_str = formula_str.replace(factorial.toReplace,factorial.replacement);
        })

        let result;
        try{
            result = eval(formula_str);
        }catch( error){
            if( error instanceof SyntaxError){
                result = "Syntax Error!";
                updateOutputResult(result);
                return;
            }
        }
         //SAVING THE RESULT FOR LATER USE
         ans = result;
        //  data.user_input = [result];
        //  data.javascript_formula = [result];

        updateOutputResult(result);
    }

    updateOutput_user_input(data.user_input.join(''));
}

// FIND NUMBERS
function findARGUMENTS(javascript_formula,FACTORIAL_INDICES){

    // ARRAY WHICH SAVES ARGUMETNS OF ALL THE FACTORIAL FUNCTIONS
    let arguments = [];

    let trailing_factorials_count = 0;

    //  FIXING THE ISSUES WITH THE FACTORIAL FUNCTION
    FACTORIAL_INDICES.forEach(factorial_index =>{

        let argument = [];

        let next_index = factorial_index + 1;
        let next_input = javascript_formula[next_index];

        if(next_input == FACTORIAL){
            trailing_factorials_count++;
            return;
        }

        /*IF THERE IS  A TRAILING FACTORIAL THEN WE NEED THE INDEX OF THE 
        VERY FIRST FACTORIAL FUNCTION*/
        
        let first_factorial_index = factorial_index - trailing_factorials_count;

        // INDEX OF INPUT RIGHT BEFORE THE FIRST FACTORIAL FUNCTION
        let previous_index = first_factorial_index-1;
        let parentheses_count = 0;

        while(previous_index >= 0){

            if(javascript_formula[previous_index] == "(") parentheses_count--;
            if(javascript_formula[previous_index] == ")") parentheses_count++;

            let is_operator = false;
            OPERATORS.forEach(OPERATOR =>{
                if(javascript_formula[previous_index] == OPERATOR) is_operator = true;
            });

            if(is_operator && parentheses_count == 0) break;

            argument.unshift(javascript_formula[previous_index]);

            previous_index--;
        }

        let argument_str = argument.join('');

        const factorial = "factorial(";
        const closing_parentheses = ")";

        let FACTORIAL_COUNT = trailing_factorials_count + 1;

        let toReplace = argument_str + FACTORIAL.repeat(FACTORIAL_COUNT);
        let replacement = factorial.repeat(FACTORIAL_COUNT) + argument_str + closing_parentheses.repeat(FACTORIAL_COUNT);

        arguments.push({
            toReplace : toReplace,
            replacement: replacement
        })

        // RESET THE TRAILING FACTORIAL COUNT FOR FUTURE 
        trailing_factorials_count = 0;
    });

    return arguments;
}

// FIND BASES OF ALL THE POWER FUNCTIONS
function findBASES(javascript_formula,POWER_INDICES){

    // STORE BASES OF ALL POWERS IN JAVASCRIPT_FORMULA ARRAY  
    let powers_bases = [];

    POWER_INDICES.forEach(power_index =>{

        // SAVES THE CURRENT BASE
        let base = [];

        let parentheses_count = 0;
        let previous_index = power_index - 1;

        while(previous_index >= 0){

            if(javascript_formula[previous_index] == "(") parentheses_count--;
            if(javascript_formula[previous_index] == ")") parentheses_count++;

            let is_operator = false;
            OPERATORS.forEach(OPERATOR =>{
                if(javascript_formula[previous_index] == OPERATOR) is_operator = true;
            });

            let is_power = (javascript_formula[previous_index] == POWER);

            if((is_operator && parentheses_count == 0) || is_power) break;

            base.unshift(javascript_formula[previous_index]);

            previous_index--;
        }

        powers_bases.push(base.join(''));
    });

    return powers_bases;

}

// SEARCH ARRAY RETURNING  THE INDICES OF KEYWORD GIVEN TO IT 
function search(array,keyword){

    let search_result = [];

    array.forEach( (element , index) => {
        if(element == keyword) search_result.push(index);
    });

    return search_result;
}

// FUNCTION UPDATING THE RESULT TO THE USER
function updateOutputResult(result){
    output_result_element.innerHTML = result;
}

// FUNCTION UPDATING THE USER WITH THE DATA INPUT
function updateOutput_user_input(user_input){
    output_user_input_element.innerHTML = user_input;
}

// TRIGONOMETRIC FUNCTIONS
function trigo(callback , angle){

    if(!RADIAN){
        angle = angle * Math.PI/180;
    }

    return callback(angle);
}

function inv_trigo(callback , value){

    let angle = callback(value);
    if(!RADIAN){
        angle = angle * 180/Math.PI;
    }
    return angle;

}

// FACTORIAL FUNCTION
function factorial(number){

    // FOR FACTORIAL OF DECIMAL NUMBERS
    if(number % 1 != 0) return gamma(number + 1);

    // FOR FACTORIAL OF INTEGER NUMBERS
    if(number == 0 || number == 1) return 1;

    let result = 1;
    for(let i = 2; i <= number ; i++){
        result *= i;
        if(result == Infinity) return Infinity;
    }
    return result;
    
}

// GAMMA FUNCTINON[ACCURACY IS UPTO 15 DECIMAL PLACES]
function gamma(n) {  
    //some magic constants 
    // g represents the precision desired,
    // p is the values of p[i] to plug into Lanczos' javascript_formula
    var g = 7, 
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}