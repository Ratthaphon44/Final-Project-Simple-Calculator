# Test Case Report - Scientific Calculator

Columns: ID | Description | Steps | Input | Expected Output | Actual Output | Result | Evidence

TC1 | Basic addition | press 2, +, 3, = | "2+3" | "5" | 5 | Pass | screenshot1.png
TC2 | Division by zero | press 8, /, 0, = | "8/0" | "Error: Division by zero" | Error: Division by zero | Pass | screenshot2.png
TC3 | Decimal calculation | press 2, ., 5, +, 1, ., 25, = | "2.5+1.25" | "3.75" | 3.75 | Pass | screenshot3.png
TC4 | Operator precedence | press 2, +, 3, *, 4, = | "2+3*4" | "14" | 14 | Pass | screenshot4.png
TC5 | Backspace | enter 123, Backspace | "12" | 12 displayed | Pass | screenshot5.png
TC6 | Power Function | press 2, ^, 3, = | "2^3" | "8" | 8 | Pass | screenshot6.png
TC7 | Square Root | press √, 9, = | "sqrt9" | "3" | 3 | Pass | screenshot7.png
TC8 | Trigonometry (Sin) | press sin, 3, 0, = | "sin30" | "0.4999..." or "0.5" | 0.5 | Pass | screenshot8.png
TC9 | Parentheses Logic | press (, 2, +, 3, ), *, 4, = | "(2+3)*4" | "20" | 20 | Pass | screenshot9.png
TC10 | Complex Expression | press 2, +, sin, 9, 0, = | "2+sin90" | "3" | 3 | Pass | screenshot10.png
TC11 | Error Handling (Paren)| press (, 5, +, 5, = | "(5+5" | "Error: Mismatched parentheses" | Error: Mismatched parentheses | Pass | screenshot11.png
TC12 | Keyboard support | type "5^2" then Enter | "5^2" | "25" | 25 | Pass | screenshot12.png