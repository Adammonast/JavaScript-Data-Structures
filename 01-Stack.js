// Create a stack
// Follows First In Last Out structure ---> FILO
let letters = []; // This is the stack! Empty arrays are stacks!

let word = "racecar";
let reverseWord = "";

// Put letters into the stack
// Iterate over the length of the word (racecar)
// Push (add) the individual characters into the stack
for (let i = 0; i < word.length; i++) {
  letters.push(word[i]);
}

// Remove (pop) from the stack in reverse order
// Add one letter at a time to the reverse word by popping off the first stack word
// String should be in reverse order from the original word
for (let i = 0; i < word.length; i++) {
  reverseWord += letters.pop();
}

// Check if both words are the same in either order
if (reverseWord === word) {
  console.log(`${word} is a palindrome`);
} else {
  console.log(`${word} is not a palindrome`);
}
