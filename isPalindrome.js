// Palindrome

// Write a function that checks whether a passed string is palindrome or not ?

function isPalindrome(str) {
  return str.toLowerCase().trim().split('').reverse().join('') === str.trim();
}

isPalindrome('madam'); // Output: ‘The entry is a palindrome’ 
isPalindrome('fox'); // Output: ‘Entry is not a palindrome’ 
