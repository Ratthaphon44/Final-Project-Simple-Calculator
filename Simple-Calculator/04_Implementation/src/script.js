(function(){
  const expressionEl = document.getElementById('expression');
  const resultEl = document.getElementById('result');
  const buttons = document.querySelectorAll('.btn');

  let expr = ''; // expression string in tokens like "sin(45)+2^3"

  // --- Utility Functions ---

  function roundAcc(num, places){
    const factor = Math.pow(10, places);
    return Math.round((num + Number.EPSILON) * factor) / factor;
  }

  const isBinaryOperator = token => /^[+\-*/^]$/.test(token);
  const isFunction = token => /^(sin|cos|tan|log|sqrt)$/.test(token);
  const isLParen = token => token === '(';
  const isRParen = token => token === ')';
  
  const precedence = {'+':1,'-':1,'*':2,'/':2, '^':3}; // Precedence of binary operators
  const isLeftAssoc = token => /^[+\-*/]$/.test(token); // Check for Left Associativity

  // --- Display & Input Functions ---

  function updateDisplay(){
    expressionEl.textContent = expr || '';
    if(expr === '') resultEl.textContent = '0';
  }

  function appendToken(token){
    const last = expr.slice(-1);
    
    if(token === '.'){
      const match = expr.match(/(\d*\.\d*|\d+)$/);
      if(match && match[0].includes('.')) return;
      if(!match || /^[+\-*/^()]/.test(last) || isFunction(last)) expr += '0';
      expr += '.';
    }
    else if(isLParen(token)){
        if(last === '' || isBinaryOperator(last) || isLParen(last) || isFunction(last)) {
            expr += token;
        } else if (/\d|\./.test(last) || isRParen(last)){
             return; 
        }
    } else if (isRParen(token)){
        if(/\d|\.|\)$/.test(expr)) {
            expr += token;
        }
    } 
    else if(isBinaryOperator(token)){
      if(expr === '' && token !== '-') return; // Only allow unary minus at start
      if(isBinaryOperator(last)){
        // Replace last operator
        expr = expr.slice(0,-1) + token;
      } else {
        expr += token;
      }
    } 
    else if(isFunction(token)){
        if(expr === '' || isBinaryOperator(last) || isLParen(last)){
            expr += token;
        }
    }
    else if(/\d/.test(token)){
      expr += token;
    }
    
    updateDisplay();
  }

  function clearAll(){
    expr = '';
    updateDisplay();
  }

  function backspace(){
    expr = expr.slice(0,-1);
    updateDisplay();
  }

  // --- Core Calculation Logic ---

  function computeExpression(input){
    if(!input) return 0;

    // 1. Tokenize (Extended to handle functions, parentheses, and new operators)
    const finalTokens = [];
    // Regex to split expression by numbers, dot, operators, parentheses, and functions
    const regex = /(\d+\.?\d*|\.\d+|[+\-*/^()]|sin|cos|tan|log|sqrt)/g;
    let match;
    while(match = regex.exec(input)){
        finalTokens.push(match[0]);
    }
    if(finalTokens.length === 0) return 0; // Handled case where input is empty or invalid

    // 2. Shunting-yard: convert to RPN
    const outputQueue = [];
    const opStack = [];
    
    for(let token of finalTokens){
      if(isBinaryOperator(token)){
        // Binary Operator Logic
        while(opStack.length){
            const op = opStack.slice(-1)[0];
            if(isFunction(op) || isLParen(op)) break;
            
            const p1 = precedence[op];
            const p2 = precedence[token];
            
            // Check precedence and associativity for popping operators
            if(p1 > p2 || (p1 === p2 && isLeftAssoc(token))){
                outputQueue.push(opStack.pop());
            } else {
                break;
            }
        }
        opStack.push(token);
      } else if (isFunction(token) || isLParen(token)){
        // Function or Left Parenthesis
        opStack.push(token);
      } else if (isRParen(token)){
        // Right Parenthesis
        while(opStack.length && !isLParen(opStack.slice(-1)[0])){
          outputQueue.push(opStack.pop());
        }
        if(!opStack.length || !isLParen(opStack.slice(-1)[0])) throw new Error('MISMATCH_PAREN');
        opStack.pop(); // Pop the '('
        // After popping '(', check if function is on top of stack
        if(isFunction(opStack.slice(-1)[0])) outputQueue.push(opStack.pop());
      } else {
        // Number
        outputQueue.push(token);
      }
    }
    
    while(opStack.length) {
      if(isLParen(opStack.slice(-1)[0]) || isRParen(opStack.slice(-1)[0])) throw new Error('MISMATCH_PAREN');
      outputQueue.push(opStack.pop());
    }

    // 3. Evaluate RPN
    const stack = [];
    for(let token of outputQueue){
      if(!isBinaryOperator(token) && !isFunction(token)){
        stack.push(parseFloat(token));
      } else {
        // Unary/Binary Operator Logic
        if(isFunction(token)){
            const a = stack.pop(); // Unary (one operand)
            // Assuming degrees for trig functions for user simplicity
            if(token === 'sin') stack.push(Math.sin(a * Math.PI / 180));
            else if(token === 'cos') stack.push(Math.cos(a * Math.PI / 180));
            else if(token === 'tan') stack.push(Math.tan(a * Math.PI / 180));
            else if(token === 'log') stack.push(Math.log10(a)); 
            else if(token === 'sqrt') stack.push(Math.sqrt(a));
        } else {
            // Binary Operator (two operands)
            const b = stack.pop();
            const a = stack.pop();
            
            if(token === '+') stack.push(a + b);
            else if(token === '-') stack.push(a - b);
            else if(token === '*') stack.push(a * b);
            else if(token === '/') {
              if(b === 0) throw new Error('DIV_ZERO');
              stack.push(a / b);
            }
            else if(token === '^') stack.push(Math.pow(a, b));
        }
      }
    }
    if(stack.length !== 1) throw new Error('INVALID_EXPRESSION');
    return stack[0];
  }

  function equals(){
    try{
      const value = computeExpression(expr);
      resultEl.textContent = Number.isInteger(value) ? String(value) : String(roundAcc(value, 12));
      expr = String(resultEl.textContent);
    } catch(e){
      if(e.message === 'DIV_ZERO'){
        resultEl.textContent = 'Error: Division by zero';
      } else if (e.message === 'MISMATCH_PAREN'){
        resultEl.textContent = 'Error: Mismatched parentheses';
      }
       else {
        resultEl.textContent = 'Error';
      }
      expr = '';
    }
    updateDisplay();
  }

  // --- Event Listeners ---
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const v = btn.dataset.value;
      const action = btn.dataset.action;
      if(action === 'clear') clearAll();
      else if(action === 'back') backspace();
      else if(action === 'equals') equals();
      else if(v) appendToken(v);
    });
  });

  // Keyboard support (Expanded)
  document.addEventListener('keydown', (e) => {
    const key = e.key;
    if((key >= '0' && key <= '9') || key === '.'){ appendToken(key); return; }
    if(key === '+' || key === '-' || key === '*' || key === '/' || key === '^' || key === '(' || key === ')'){ appendToken(key); return; }
    if(key === 'Enter'){ e.preventDefault(); equals(); return; }
    if(key === 'Backspace'){ backspace(); return; }
    if(key === 'Delete'){ clearAll(); return; }
  });

  updateDisplay();

})();