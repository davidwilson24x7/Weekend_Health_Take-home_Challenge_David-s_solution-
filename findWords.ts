/*
Objective:

Implement a function named **`findWords`** that accepts two arguments: 1) an input string and 2) a dictionary. 
This function should return an array of words from the dictionary that can be formed by rearranging some or 
all of the letters in the input string. Each letter in the input string may be used up to once per word.

Function signature: function findWords(inputString: string, dictionary:string[]): string[]

**Input:**
- **`inputString`** (type: **`string`**):  A string consisting of lowercase English letters. 
                                           The string may contain repeated letters.
- **`dictionary`** (type: **`string[]`**): An array that specifies the universe of valid output words. 
                                           You can assume all words will consist of lowercase English letters.
*/



// Solution: Define the findWords function, which takes an inputString and a dictionary array, returning an array of strings.
function findWords(inputString: string, dictionary: string[]): string[] {
        // Define a helper function to create a character map from a string.
        // This map counts the occurrences of each character in the string.
        const createCharMap = (str: string) => {
          const charMap: { [char: string]: number } = {};
          for (const char of str) {
            // If the char already exists in charMap, increment its count, otherwise set it to 1.
            charMap[char] = (charMap[char] || 0) + 1;
          }
          return charMap;
        };
      
        // Create a character map for the input string to easily compare its characters against those in the dictionary words.
        const inputCharMap = createCharMap(inputString);
      
        // Filter the dictionary to find words that can be formed using the characters in the input string.
        return dictionary.filter(word => {
          // Create a character map for each word in the dictionary to compare with the input string's character map.
          const wordCharMap = createCharMap(word);
          // Check if every character in the word (and its count) matches the available characters in the input string.
          // Only include words where for every character, the count in the word is less than or equal to its count in the input string.
          return Object.keys(wordCharMap).every(
            char => inputCharMap[char] >= wordCharMap[char]
          );
        });
      }
    


// Checks for direct anagrams of the input string in the dictionary.
// It's a straightforward scenario ensuring the function can match simple permutations.
console.log(findWords("ate", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["ate", "eat", "tea"]


// Expands the scope to include words that can be formed with all letters from the input string, not just permutations.
// This tests the algorithm's ability to utilize all given letters efficiently.
console.log(findWords("oogd", ["ate", "eat", "tea", "dog", "do", "god", "goo", "go", "good"]));
// Expected output: ["dog", "do", "god", "goo", "go", "good"]

// Addresses the case of an empty input string, checking the function's gracefulness in handling no input.
console.log(findWords("", ["ate", "eat", "tea"]));
// Expected output: [] // No letters mean no possible word formation.

// Examines behavior with an empty dictionary, ensuring it doesn't falsely match letters to non-existent words.
console.log(findWords("abc", []));
// Expected output: [] // Without a dictionary, no words can be formed.

// Looks into handling repeated letters and diverse word lengths, ensuring accurate letter utilization.
console.log(findWords("aabbcc", ["abc", "ab", "a", "b", "c", "cab", "bac"]));
// Expected output: ["abc", "ab", "a", "b", "c", "cab", "bac"]

// Tests the scenario where the input string contains letters not in the dictionary, ensuring no invalid matches.
console.log(findWords("xyz", ["ate", "eat", "tea", "dog", "do", "god"]));
// Expected output: []

// Verifies the function's handling of dictionary words with letters not found in the input string.
console.log(findWords("ate", ["bat", "cat", "tap"]));
// Expected output: []

// Deals with repeated letters, checking if the function properly counts and utilizes each letter.
console.log(findWords("aabb", ["ab", "ba", "aab", "baba", "aa"]));
// Expected output: ["ab", "ba", "aab", "aa"]

// Considers longer input strings than dictionary words, testing the function's flexibility with letter mix.
console.log(findWords("aetgloo", ["ate", "eat", "tea", "log", "go", "to"]));
// Expected output: ["ate", "eat", "tea", "log", "go"]

// Stresses the function with a large input string and dictionary, checking both performance and accuracy.
console.log(findWords("thequickbrownfoxjumpsoverthelazydog", ["quick", "brown", "fox", "lazy", "dog", "the", "over", "jumps"]));
// Expected output: ["quick", "brown", "fox", "lazy", "dog", "the", "over", "jumps"]

// Focuses on exact anagram matches, ensuring the function recognizes when input and dictionary words match exactly.
console.log(findWords("listen", ["enlist", "silent", "tinsel"]));
// Expected output: ["enlist", "silent", "tinsel"]

// Revisits the empty input scenario with different dictionary words, reinforcing the function's handling of empty inputs.
console.log(findWords("", ["empty", "test"]));
// Expected output: []

// Explores substrings and partial matches, ensuring the function doesn't overextend matches beyond full word formation.
console.log(findWords("largestring", ["large", "ring", "sting", "star"]));
// Expected output: ["large", "ring"]


      

    