1. What is the difference between var, let, and const?

==> var: Function-scoped, hoisted, can be re-declared and updated.
==>let: Block-scoped, not hoisted the same way, can be updated but not re-declared in the same scope.
==> const: Block-scoped, cannot be updated or re-declared; value must be assigned on declaration.

2. What is the difference between map(), forEach(), and filter()?

==> map(): Transforms each item in an array and returns a new array.
==> forEach(): Runs a function for each item in an array, doesn’t return anything.
==> filter(): Returns a new array with only the items that pass a condition.

3. What are arrow functions in ES6?

==> A shorter syntax for writing functions.
Example:const add = (num1, num2) => num1 + num2;

4. How does destructuring assignment work in ES6?

==> Allows unpacking values from arrays or objects into variables.
Example in array:const [a, b] = [1, 2];
Example in object:const {name, age} = person;

5. Explain template literals in ES6. How are they different from string concatenation?
   ==> Template literals are a new way to work with strings in ES6.Template literals use backticks (` `) and allow you to embed variables or expressions using ${}`.
Example: const name = "Robiul";
console.log(`Hello, ${name}!`);
   But to get this same output using string concatenation.I need to write the code like this:
   console.log("Hello, " + name + "!");
   String concatenation use (+) and ("").This is a bit more difficult than writing a template literals.
