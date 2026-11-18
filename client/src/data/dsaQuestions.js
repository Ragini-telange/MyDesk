// data/dsaQuestions.js
// Curated collection of 100 foundational DSA problems across 10 placement topics.

export const DSA_TOPICS = [
  'All',
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stack',
  'Queue',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Recursion',
  'Greedy Algorithms and Bit Manipulation'
];

export const DSA_DIFFICULTIES = ['All', 'Easy', 'Medium', 'Hard'];

export const DSA_QUESTIONS = [
  {
    "id": 1,
    "title": "Two Sum",
    "difficulty": "Easy",
    "topic": "Arrays",
    "problemStatement": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "inputFormat": "First line contains n. Second line contains n space-separated integers. Third line contains target.",
    "outputFormat": "Print the two 0-based indices separated by space.",
    "constraints": "2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9",
    "sampleInput": "4\n2 7 11 15\n9",
    "sampleOutput": "0 1",
    "explanation": "nums[0] + nums[1] = 2 + 7 = 9",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 2,
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "topic": "Arrays",
    "problemStatement": "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print single integer representing maximum profit.",
    "constraints": "1 <= prices.length <= 10^5\n0 <= prices[i] <= 10^4",
    "sampleInput": "6\n7 1 5 3 6 4",
    "sampleOutput": "5",
    "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint maxProfit(int* prices, int pricesSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxProfit(int[] prices) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def maxProfit(self, prices: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 3,
    "title": "Maximum Subarray",
    "difficulty": "Medium",
    "topic": "Arrays",
    "problemStatement": "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum (Kadane's Algorithm).",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print the maximum subarray sum.",
    "constraints": "1 <= nums.length <= 10^5\n-10^4 <= nums[i] <= 10^4",
    "sampleInput": "9\n-2 1 -3 4 -1 2 1 -5 4",
    "sampleOutput": "6",
    "explanation": "[4,-1,2,1] has the largest sum = 6.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint maxSubArray(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxSubArray(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def maxSubArray(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 4,
    "title": "Contains Duplicate",
    "difficulty": "Easy",
    "topic": "Arrays",
    "problemStatement": "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= nums.length <= 10^5\n-10^9 <= nums[i] <= 10^9",
    "sampleInput": "4\n1 2 3 1",
    "sampleOutput": "true",
    "explanation": "1 appears at index 0 and 3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool containsDuplicate(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def containsDuplicate(self, nums: list[int]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 5,
    "title": "Product of Array Except Self",
    "difficulty": "Medium",
    "topic": "Arrays",
    "problemStatement": "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. You must solve it in O(n) time without division.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print the resulting array separated by space.",
    "constraints": "2 <= nums.length <= 10^5\n-30 <= nums[i] <= 30",
    "sampleInput": "4\n1 2 3 4",
    "sampleOutput": "24 12 8 6",
    "explanation": "Calculated products for each position excluding the current element.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def productExceptSelf(self, nums: list[int]) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 6,
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Arrays",
    "problemStatement": "Suppose an array of length n sorted in ascending order is rotated between 1 and n times. Find and return the minimum element in O(log n) time.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print the minimum element.",
    "constraints": "1 <= n <= 5000\n-5000 <= nums[i] <= 5000",
    "sampleInput": "5\n3 4 5 1 2",
    "sampleOutput": "1",
    "explanation": "The original sorted array was [1,2,3,4,5] rotated 3 times.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint findMin(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int findMin(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def findMin(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 7,
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Medium",
    "topic": "Arrays",
    "problemStatement": "Given a sorted rotated array nums and an integer target, return the index of target if found in nums, otherwise return -1 in O(log n) time.",
    "inputFormat": "First line contains n. Second line contains n integers. Third line contains target.",
    "outputFormat": "Print the index of target or -1.",
    "constraints": "1 <= nums.length <= 5000\nAll elements are unique.",
    "sampleInput": "7\n4 5 6 7 0 1 2\n0",
    "sampleOutput": "4",
    "explanation": "Target 0 is located at index 4.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint search(int* nums, int numsSize, int target) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int search(int[] nums, int target) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 8,
    "title": "3Sum",
    "difficulty": "Medium",
    "topic": "Arrays",
    "problemStatement": "Given an integer array nums, return all distinct triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, j != k, and nums[i] + nums[j] + nums[k] == 0.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print unique triplets line by line.",
    "constraints": "3 <= nums.length <= 3000\n-10^5 <= nums[i] <= 10^5",
    "sampleInput": "6\n-1 0 1 2 -1 -4",
    "sampleOutput": "[-1, -1, 2], [-1, 0, 1]",
    "explanation": "The distinct zero-sum triplets are [-1,-1,2] and [-1,0,1].",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def threeSum(self, nums: list[int]) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 9,
    "title": "Container With Most Water",
    "difficulty": "Medium",
    "topic": "Arrays",
    "problemStatement": "Given n non-negative integers a1, a2, ..., an where each represents a point at coordinate (i, ai). Find two lines that together with the x-axis form a container containing the most water.",
    "inputFormat": "First line contains n. Second line contains n integers representing heights.",
    "outputFormat": "Print the maximum water area.",
    "constraints": "2 <= n <= 10^5\n0 <= height[i] <= 10^4",
    "sampleInput": "9\n1 8 6 2 5 4 8 3 7",
    "sampleOutput": "49",
    "explanation": "Area between index 1 (height 8) and index 8 (height 7) is 7 * 7 = 49.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint maxArea(int* height, int heightSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxArea(int[] height) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def maxArea(self, height: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 10,
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "topic": "Arrays",
    "problemStatement": "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    "inputFormat": "First line contains n. Second line contains n integers representing elevation.",
    "outputFormat": "Print total units of trapped rain water.",
    "constraints": "1 <= n <= 2 * 10^4\n0 <= height[i] <= 10^5",
    "sampleInput": "12\n0 1 0 2 1 0 1 3 2 1 2 1",
    "sampleOutput": "6",
    "explanation": "Elevation map traps 6 units of rain water.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint trap(int* height, int heightSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int trap(int[] height) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def trap(self, height: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 11,
    "title": "Valid Anagram",
    "difficulty": "Easy",
    "topic": "Strings",
    "problemStatement": "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    "inputFormat": "Two lines, each containing a single lowercase string.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= s.length, t.length <= 5 * 10^4",
    "sampleInput": "anagram\nnagaram",
    "sampleOutput": "true",
    "explanation": "Both strings have exact same character frequencies.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isAnagram(char* s, char* t) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isAnagram(string s, string t) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isAnagram(String s, String t) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isAnagram(self, s: str, t: str) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 12,
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "topic": "Strings",
    "problemStatement": "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
    "inputFormat": "Single string s.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= s.length <= 2 * 10^5",
    "sampleInput": "A man, a plan, a canal: Panama",
    "sampleOutput": "true",
    "explanation": "\"amanaplanacanalpanama\" is a palindrome.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isPalindrome(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isPalindrome(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isPalindrome(self, s: str) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 13,
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Medium",
    "topic": "Strings",
    "problemStatement": "Given a string s, find the length of the longest substring without duplicate characters.",
    "inputFormat": "Single line containing string s.",
    "outputFormat": "Print length of longest substring.",
    "constraints": "0 <= s.length <= 5 * 10^4",
    "sampleInput": "abcabcbb",
    "sampleOutput": "3",
    "explanation": "The answer is \"abc\", with the length of 3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint lengthOfLongestSubstring(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 14,
    "title": "Longest Palindromic Substring",
    "difficulty": "Medium",
    "topic": "Strings",
    "problemStatement": "Given a string s, return the longest palindromic substring in s.",
    "inputFormat": "Single line containing string s.",
    "outputFormat": "Print the longest palindromic substring.",
    "constraints": "1 <= s.length <= 1000",
    "sampleInput": "babad",
    "sampleOutput": "bab",
    "explanation": "\"aba\" is also a valid answer.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar* longestPalindrome(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestPalindrome(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public String longestPalindrome(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def longestPalindrome(self, s: str) -> str:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 15,
    "title": "Palindromic Substrings",
    "difficulty": "Medium",
    "topic": "Strings",
    "problemStatement": "Given a string s, return the number of palindromic substrings in it.",
    "inputFormat": "Single line containing string s.",
    "outputFormat": "Print total count of palindromic substrings.",
    "constraints": "1 <= s.length <= 1000",
    "sampleInput": "aaa",
    "sampleOutput": "6",
    "explanation": "Six palindromic substrings: \"a\", \"a\", \"a\", \"aa\", \"aa\", \"aaa\".",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint countSubstrings(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countSubstrings(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int countSubstrings(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def countSubstrings(self, s: str) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 16,
    "title": "Group Anagrams",
    "difficulty": "Medium",
    "topic": "Strings",
    "problemStatement": "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
    "inputFormat": "First line contains n. Second line contains n space-separated strings.",
    "outputFormat": "Print groups of anagrams.",
    "constraints": "1 <= strs.length <= 10^4\n0 <= strs[i].length <= 100",
    "sampleInput": "6\neat tea tan ate nat bat",
    "sampleOutput": "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]",
    "explanation": "Anagrams grouped together.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def groupAnagrams(self, strs: list[str]) -> list[list[str]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 17,
    "title": "Valid Parentheses String",
    "difficulty": "Medium",
    "topic": "Strings",
    "problemStatement": "Given a string s containing '(', ')' and '*', return true if s is valid. '*' can be treated as a single '(', ')', or an empty string.",
    "inputFormat": "Single line containing string s.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= s.length <= 100",
    "sampleInput": "(*))",
    "sampleOutput": "true",
    "explanation": "'*' acts as '(' to make the string valid.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool checkValidString(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool checkValidString(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean checkValidString(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def checkValidString(self, s: str) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 18,
    "title": "String to Integer (atoi)",
    "difficulty": "Medium",
    "topic": "Strings",
    "problemStatement": "Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer considering leading whitespace, signs, and clamping to [-2^31, 2^31 - 1].",
    "inputFormat": "Single string s.",
    "outputFormat": "Print parsed 32-bit signed integer.",
    "constraints": "0 <= s.length <= 200",
    "sampleInput": "   -42",
    "sampleOutput": "-42",
    "explanation": "Leading spaces ignored, '-' recognized as negative sign.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint myAtoi(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int myAtoi(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int myAtoi(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def myAtoi(self, s: str) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 19,
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "topic": "Strings",
    "problemStatement": "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    "inputFormat": "First line contains n. Second line contains n space-separated strings.",
    "outputFormat": "Print the longest common prefix.",
    "constraints": "1 <= strs.length <= 200\n0 <= strs[i].length <= 200",
    "sampleInput": "3\nflower flow flight",
    "sampleOutput": "fl",
    "explanation": "\"fl\" is common to flower, flow, and flight.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar* longestCommonPrefix(char** strs, int strsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public String longestCommonPrefix(String[] strs) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def longestCommonPrefix(self, strs: list[str]) -> str:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 20,
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "topic": "Strings",
    "problemStatement": "Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window.",
    "inputFormat": "Two strings s and t on separate lines.",
    "outputFormat": "Print the minimum window substring or empty string.",
    "constraints": "1 <= s.length, t.length <= 10^5",
    "sampleInput": "ADOBECODEBANC\nABC",
    "sampleOutput": "BANC",
    "explanation": "\"BANC\" includes 'A', 'B', and 'C'.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar* minWindow(char* s, char* t) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string minWindow(string s, string t) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public String minWindow(String s, String t) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def minWindow(self, s: str, t: str) -> str:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 21,
    "title": "Reverse Linked List",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "problemStatement": "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    "inputFormat": "First line contains n. Second line contains n space-separated node values.",
    "outputFormat": "Print reversed node values separated by space.",
    "constraints": "0 <= number of nodes <= 5000\n-5000 <= Node.val <= 5000",
    "sampleInput": "5\n1 2 3 4 5",
    "sampleOutput": "5 4 3 2 1",
    "explanation": "Reversed linked list.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct ListNode* reverseList(struct ListNode* head) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 22,
    "title": "Detect Cycle in a Linked List",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "problemStatement": "Given head, the head of a linked list, determine if the linked list has a cycle in it using Floyd's Tortoise and Hare algorithm.",
    "inputFormat": "Linked list representation with pos index.",
    "outputFormat": "Print 'true' if cycle exists, otherwise 'false'.",
    "constraints": "0 <= number of nodes <= 10^4",
    "sampleInput": "head = [3,2,0,-4], pos = 1",
    "sampleOutput": "true",
    "explanation": "Tail connects to the second node.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool hasCycle(struct ListNode *head) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean hasCycle(ListNode head) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 23,
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "problemStatement": "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
    "inputFormat": "First line contains n1 elements. Second line contains n2 elements.",
    "outputFormat": "Print merged sorted linked list values.",
    "constraints": "0 <= number of nodes <= 50",
    "sampleInput": "list1 = [1,2,4], list2 = [1,3,4]",
    "sampleOutput": "1 1 2 3 4 4",
    "explanation": "Merged sorted list.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 24,
    "title": "Remove Nth Node From End of List",
    "difficulty": "Medium",
    "topic": "Linked Lists",
    "problemStatement": "Given the head of a linked list, remove the nth node from the end of the list and return its head in one pass.",
    "inputFormat": "First line contains list values. Second line contains integer n.",
    "outputFormat": "Print modified linked list values.",
    "constraints": "1 <= sz <= 30\n1 <= n <= sz",
    "sampleInput": "head = [1,2,3,4,5], n = 2",
    "sampleOutput": "1 2 3 5",
    "explanation": "2nd node from end (4) is removed.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct ListNode* removeNthFromEnd(struct ListNode* head, int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 25,
    "title": "Reorder List",
    "difficulty": "Medium",
    "topic": "Linked Lists",
    "problemStatement": "You are given the head of a singly linked-list: L0 -> L1 -> ... -> Ln - 1 -> Ln. Reorder the list to: L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ...",
    "inputFormat": "First line contains node values.",
    "outputFormat": "Print reordered list values.",
    "constraints": "1 <= number of nodes <= 5 * 10^4",
    "sampleInput": "1 2 3 4",
    "sampleOutput": "1 4 2 3",
    "explanation": "Nodes reordered from alternating ends.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nvoid reorderList(struct ListNode* head) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    void reorderList(ListNode* head) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public void reorderList(ListNode head) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def reorderList(self, head: Optional[ListNode]) -> None:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 26,
    "title": "Find Middle of the Linked List",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "problemStatement": "Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.",
    "inputFormat": "First line contains node values.",
    "outputFormat": "Print values from middle node onwards.",
    "constraints": "1 <= number of nodes <= 100",
    "sampleInput": "1 2 3 4 5",
    "sampleOutput": "3 4 5",
    "explanation": "Middle node is 3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct ListNode* middleNode(struct ListNode* head) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* middleNode(ListNode* head) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode middleNode(ListNode head) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 27,
    "title": "Intersection of Two Linked Lists",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "problemStatement": "Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection, return null.",
    "inputFormat": "Representation of two lists with shared node.",
    "outputFormat": "Print value of intersecting node or 'null'.",
    "constraints": "1 <= number of nodes <= 3 * 10^4",
    "sampleInput": "intersectVal = 8, listA = [4,1,8,4,5], listB = [5,6,1,8,4,5]",
    "sampleOutput": "8",
    "explanation": "Intersected node value is 8.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct ListNode* getIntersectionNode(struct ListNode *headA, struct ListNode *headB) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* getIntersectionNode(ListNode *headA, ListNode *headB) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 28,
    "title": "Palindrome Linked List",
    "difficulty": "Easy",
    "topic": "Linked Lists",
    "problemStatement": "Given the head of a singly linked list, return true if it is a palindrome or false otherwise in O(n) time and O(1) space.",
    "inputFormat": "First line contains node values.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= number of nodes <= 10^5",
    "sampleInput": "1 2 2 1",
    "sampleOutput": "true",
    "explanation": "List reads the same forwards and backwards.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isPalindrome(struct ListNode* head) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPalindrome(ListNode* head) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isPalindrome(ListNode head) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isPalindrome(self, head: Optional[ListNode]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 29,
    "title": "Copy List with Random Pointer",
    "difficulty": "Medium",
    "topic": "Linked Lists",
    "problemStatement": "A linked list of length n is given such that each node contains an additional random pointer, which could point to any node in the list, or null. Construct a deep copy of the list.",
    "inputFormat": "Representation of linked list with random pointers.",
    "outputFormat": "Print cloned list representation.",
    "constraints": "0 <= n <= 1000",
    "sampleInput": "[[7,null],[13,0],[11,4],[10,2],[1,0]]",
    "sampleOutput": "Deep copy returned",
    "explanation": "Constructed duplicate nodes with matched random pointers.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct Node* copyRandomList(struct Node* head) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    Node* copyRandomList(Node* head) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public Node copyRandomList(Node head) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def copyRandomList(self, head: 'Optional[Node]') -> 'Optional[Node]':\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 30,
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "topic": "Linked Lists",
    "problemStatement": "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    "inputFormat": "First line contains integer k. Next k lines contain sorted list values.",
    "outputFormat": "Print merged sorted list.",
    "constraints": "0 <= k <= 10^4\n0 <= total nodes <= 10^4",
    "sampleInput": "3\n1 4 5\n1 3 4\n2 6",
    "sampleOutput": "1 1 2 3 4 4 5 6",
    "explanation": "All 3 lists merged in sorted order.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct ListNode* mergeKLists(struct ListNode** lists, int listsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def mergeKLists(self, lists: list[Optional[ListNode]]) -> Optional[ListNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 31,
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "topic": "Stack",
    "problemStatement": "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    "inputFormat": "Single string s.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= s.length <= 10^4",
    "sampleInput": "()[]{}",
    "sampleOutput": "true",
    "explanation": "All opening brackets are closed by correct corresponding brackets in order.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isValid(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValid(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isValid(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 32,
    "title": "Min Stack",
    "difficulty": "Medium",
    "topic": "Stack",
    "problemStatement": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant time O(1).",
    "inputFormat": "Operations array and arguments.",
    "outputFormat": "Outputs of stack operations.",
    "constraints": "Methods pop, top and getMin operations will always be called on non-empty stacks.",
    "sampleInput": "[\"MinStack\",\"push\",\"push\",\"push\",\"getMin\",\"pop\",\"top\",\"getMin\"]\n[[],[-2],[0],[-3],[],[],[],[]]",
    "sampleOutput": "[null,null,null,null,-3,null,0,-2]",
    "explanation": "Returns minimum element in O(1).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nMinStack* minStackCreate(void) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    void minStackCreate(/* class MinStack */) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public void minStackCreate(/* class MinStack */) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def minStackCreate(self, ) -> None:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 33,
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Medium",
    "topic": "Stack",
    "problemStatement": "Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix). Valid operators are +, -, *, and /.",
    "inputFormat": "First line contains n. Second line contains n tokens.",
    "outputFormat": "Print the evaluated integer value.",
    "constraints": "1 <= tokens.length <= 10^4",
    "sampleInput": "5\n2 1 + 3 *",
    "sampleOutput": "9",
    "explanation": "((2 + 1) * 3) = 9",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint evalRPN(char** tokens, int tokensSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int evalRPN(vector<string>& tokens) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int evalRPN(String[] tokens) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def evalRPN(self, tokens: list[str]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 34,
    "title": "Daily Temperatures",
    "difficulty": "Medium",
    "topic": "Stack",
    "problemStatement": "Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature.",
    "inputFormat": "First line contains n. Second line contains n temperatures.",
    "outputFormat": "Print array of days to wait.",
    "constraints": "1 <= temperatures.length <= 10^5\n30 <= temperatures[i] <= 100",
    "sampleInput": "8\n73 74 75 71 69 72 76 73",
    "sampleOutput": "1 1 4 2 1 1 0 0",
    "explanation": "Monotonic stack records waiting days.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> dailyTemperatures(vector<int>& temperatures) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] dailyTemperatures(int[] temperatures) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def dailyTemperatures(self, temperatures: list[int]) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 35,
    "title": "Generate Parentheses",
    "difficulty": "Medium",
    "topic": "Stack",
    "problemStatement": "Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",
    "inputFormat": "Single integer n.",
    "outputFormat": "Print all well-formed parentheses combinations.",
    "constraints": "1 <= n <= 8",
    "sampleInput": "3",
    "sampleOutput": "[\"((()))\",\"(()())\",\"(())()\",\"()(())\",\"()()()\"]",
    "explanation": "All 5 valid combinations of 3 pairs.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar** generateParenthesis(int n, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<String> generateParenthesis(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def generateParenthesis(self, n: int) -> list[str]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 36,
    "title": "Next Greater Element I",
    "difficulty": "Easy",
    "topic": "Stack",
    "problemStatement": "Find the next greater element for each value of nums1 in nums2. If it does not exist, return -1.",
    "inputFormat": "Two arrays nums1 and nums2.",
    "outputFormat": "Print array of next greater elements.",
    "constraints": "1 <= nums1.length <= nums2.length <= 1000",
    "sampleInput": "nums1 = [4,1,2], nums2 = [1,3,4,2]",
    "sampleOutput": "-1 3 -1",
    "explanation": "For 4, no greater element; for 1, next greater is 3; for 2, none.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* nextGreaterElement(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] nextGreaterElement(int[] nums1, int[] nums2) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def nextGreaterElement(self, nums1: list[int], nums2: list[int]) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 37,
    "title": "Online Stock Span",
    "difficulty": "Medium",
    "topic": "Stack",
    "problemStatement": "Design an algorithm that collects daily price quotes for some stock and returns the span of that stock's price for the current day (maximum number of consecutive days price was <= today's price).",
    "inputFormat": "Sequence of stock prices.",
    "outputFormat": "Span values for each price.",
    "constraints": "At most 10^4 calls will be made to next.",
    "sampleInput": "[100, 80, 60, 70, 60, 75, 85]",
    "sampleOutput": "1 1 1 2 1 4 6",
    "explanation": "Monotonic stack calculates spans.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint stockSpannerNext(StockSpanner* obj, int price) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int stockSpannerNext(int price) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int stockSpannerNext(int price) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def stockSpannerNext(self, price: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 38,
    "title": "Simplify Path",
    "difficulty": "Medium",
    "topic": "Stack",
    "problemStatement": "Given an absolute path for a Unix-style file system, convert it to the simplified canonical path.",
    "inputFormat": "Single string path.",
    "outputFormat": "Print canonical path.",
    "constraints": "1 <= path.length <= 3000",
    "sampleInput": "/home//foo/",
    "sampleOutput": "/home/foo",
    "explanation": "Duplicate slashes are replaced by single slash.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar* simplifyPath(char* path) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string simplifyPath(string path) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public String simplifyPath(String path) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def simplifyPath(self, path: str) -> str:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 39,
    "title": "Asteroid Collision",
    "difficulty": "Medium",
    "topic": "Stack",
    "problemStatement": "We are given an array asteroids of integers representing asteroids in a row. For each asteroid, the absolute value represents its size, and the sign represents its direction. Find out the state of the asteroids after all collisions.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print remaining asteroids.",
    "constraints": "2 <= asteroids.length <= 10^4",
    "sampleInput": "3\n5 10 -5",
    "sampleOutput": "5 10",
    "explanation": "10 and -5 collide resulting in 10. 5 and 10 never collide.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* asteroidCollision(int* asteroids, int asteroidsSize, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> asteroidCollision(vector<int>& asteroids) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] asteroidCollision(int[] asteroids) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def asteroidCollision(self, asteroids: list[int]) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 40,
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "topic": "Stack",
    "problemStatement": "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.",
    "inputFormat": "First line contains n. Second line contains n heights.",
    "outputFormat": "Print maximum rectangular area.",
    "constraints": "1 <= heights.length <= 10^5\n0 <= heights[i] <= 10^4",
    "sampleInput": "6\n2 1 5 6 2 3",
    "sampleOutput": "10",
    "explanation": "Bars 5 and 6 form rectangle of area 10.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint largestRectangleArea(int* heights, int heightsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int largestRectangleArea(int[] heights) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def largestRectangleArea(self, heights: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 41,
    "title": "Implement Queue using Stacks",
    "difficulty": "Easy",
    "topic": "Queue",
    "problemStatement": "Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support push, pop, peek, and empty.",
    "inputFormat": "Queue operations and parameters.",
    "outputFormat": "Return values of operations.",
    "constraints": "All operations called on non-empty queue.",
    "sampleInput": "push(1), push(2), peek(), pop(), empty()",
    "sampleOutput": "1, 1, false",
    "explanation": "Standard FIFO queue simulated using 2 stacks.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nMyQueue* myQueueCreate(void) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    void myQueueCreate(/* MyQueue class */) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public void myQueueCreate(/* MyQueue class */) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def myQueueCreate(self, ) -> None:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 42,
    "title": "Implement Stack using Queues",
    "difficulty": "Easy",
    "topic": "Queue",
    "problemStatement": "Implement a last-in-first-out (LIFO) stack using only standard queue operations (push to back, peek/pop from front, size, and is empty).",
    "inputFormat": "Stack operations and parameters.",
    "outputFormat": "Return values of operations.",
    "constraints": "All operations called on non-empty stack.",
    "sampleInput": "push(1), push(2), top(), pop(), empty()",
    "sampleOutput": "2, 2, false",
    "explanation": "LIFO stack simulated with queues.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nMyStack* myStackCreate(void) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    void myStackCreate(/* MyStack class */) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public void myStackCreate(/* MyStack class */) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def myStackCreate(self, ) -> None:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 43,
    "title": "First Unique Character in a String",
    "difficulty": "Easy",
    "topic": "Queue",
    "problemStatement": "Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.",
    "inputFormat": "Single string s.",
    "outputFormat": "Print 0-based index or -1.",
    "constraints": "1 <= s.length <= 10^5",
    "sampleInput": "leetcode",
    "sampleOutput": "0",
    "explanation": "'l' is the first character that does not repeat.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint firstUniqChar(char* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int firstUniqChar(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int firstUniqChar(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def firstUniqChar(self, s: str) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 44,
    "title": "Sliding Window Maximum",
    "difficulty": "Hard",
    "topic": "Queue",
    "problemStatement": "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. Return the max sliding window using a monotonic deque.",
    "inputFormat": "First line contains n. Second line contains n integers. Third line contains k.",
    "outputFormat": "Print maximum value in each window.",
    "constraints": "1 <= nums.length <= 10^5\n1 <= k <= nums.length",
    "sampleInput": "8\n1 3 -1 -3 5 3 6 7\n3",
    "sampleOutput": "3 3 5 5 6 7",
    "explanation": "Maximums for each window of length 3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* maxSlidingWindow(int* nums, int numsSize, int k, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 45,
    "title": "Design Circular Queue",
    "difficulty": "Medium",
    "topic": "Queue",
    "problemStatement": "Design your implementation of the circular queue supporting enQueue, deQueue, Front, Rear, isEmpty, and isFull.",
    "inputFormat": "Capacity k followed by queue operations.",
    "outputFormat": "Outputs of circular queue methods.",
    "constraints": "0 <= k <= 1000",
    "sampleInput": "k = 3, enQueue(1), enQueue(2), enQueue(3), enQueue(4), Rear(), isFull()",
    "sampleOutput": "true, true, true, false, 3, true",
    "explanation": "Circular queue buffer wrap-around.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nMyCircularQueue* myCircularQueueCreate(int k) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    void myCircularQueueCreate(int k) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public void myCircularQueueCreate(int k) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def myCircularQueueCreate(self, k: int) -> None:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 46,
    "title": "Number of Recent Calls",
    "difficulty": "Easy",
    "topic": "Queue",
    "problemStatement": "You have a RecentCounter class which counts the number of recent requests within a certain time frame [t - 3000, t].",
    "inputFormat": "Stream of ping timestamps t.",
    "outputFormat": "Count of pings in window.",
    "constraints": "1 <= t <= 10^9",
    "sampleInput": "ping(1), ping(100), ping(3001), ping(3002)",
    "sampleOutput": "1, 2, 3, 3",
    "explanation": "Pings within 3000ms window.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint recentCounterPing(RecentCounter* obj, int t) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int recentCounterPing(int t) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int recentCounterPing(int t) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def recentCounterPing(self, t: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 47,
    "title": "Moving Average from Data Stream",
    "difficulty": "Easy",
    "topic": "Queue",
    "problemStatement": "Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.",
    "inputFormat": "Window size size and stream values.",
    "outputFormat": "Moving averages as doubles.",
    "constraints": "1 <= size <= 1000",
    "sampleInput": "size = 3, next(1), next(10), next(3), next(5)",
    "sampleOutput": "1.0, 5.5, 4.66667, 6.0",
    "explanation": "Queue holds up to size values.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\ndouble movingAverageNext(MovingAverage* obj, int val) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    double movingAverageNext(int val) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public double movingAverageNext(int val) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def movingAverageNext(self, val: int) -> float:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 48,
    "title": "Rotting Oranges",
    "difficulty": "Medium",
    "topic": "Queue",
    "problemStatement": "You are given an m x n grid where each cell can be empty (0), fresh (1), or rotten (2). Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten. Return minimum minutes until no fresh oranges remain, or -1.",
    "inputFormat": "Dimensions m, n followed by grid rows.",
    "outputFormat": "Print minimum minutes or -1.",
    "constraints": "1 <= m, n <= 10",
    "sampleInput": "3 3\n2 1 1\n1 1 0\n0 1 1",
    "sampleOutput": "4",
    "explanation": "BFS queue propagates rot in 4 minutes.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint orangesRotting(int** grid, int gridSize, int* gridColSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int orangesRotting(int[][] grid) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def orangesRotting(self, grid: list[list[int]]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 49,
    "title": "Task Scheduler",
    "difficulty": "Medium",
    "topic": "Queue",
    "problemStatement": "Given a characters array tasks, representing the tasks a CPU needs to do, and a non-negative integer n representing cooldown interval, return the least number of units of times that the CPU will take to finish all the given tasks.",
    "inputFormat": "Tasks array and integer n.",
    "outputFormat": "Print minimum intervals.",
    "constraints": "1 <= tasks.length <= 10^4\n0 <= n <= 100",
    "sampleInput": "tasks = [\"A\",\"A\",\"A\",\"B\",\"B\",\"B\"], n = 2",
    "sampleOutput": "8",
    "explanation": "A -> B -> idle -> A -> B -> idle -> A -> B",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint leastInterval(char* tasks, int tasksSize, int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int leastInterval(char[] tasks, int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def leastInterval(self, tasks: list[str], n: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 50,
    "title": "Find the Winner of the Circular Game",
    "difficulty": "Medium",
    "topic": "Queue",
    "problemStatement": "There are n friends that are playing a game sitting in a circle. Friends are numbered from 1 to n. Counting begins at 1 and every kth friend is eliminated. Return the winner of the game.",
    "inputFormat": "Two integers n and k.",
    "outputFormat": "Print the 1-based number of the winner.",
    "constraints": "1 <= k <= n <= 500",
    "sampleInput": "5 2",
    "sampleOutput": "3",
    "explanation": "Josephus problem: Friends eliminated in order 2, 4, 1, 5; friend 3 wins.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint findTheWinner(int n, int k) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int findTheWinner(int n, int k) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int findTheWinner(int n, int k) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def findTheWinner(self, n: int, k: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 51,
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "problemStatement": "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.",
    "inputFormat": "Tree nodes in level-order format.",
    "outputFormat": "Print integer depth.",
    "constraints": "0 <= number of nodes <= 10^4",
    "sampleInput": "3 9 20 null null 15 7",
    "sampleOutput": "3",
    "explanation": "Longest path is 3 -> 20 -> 15 (depth 3).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint maxDepth(struct TreeNode* root) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 52,
    "title": "Invert Binary Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "problemStatement": "Given the root of a binary tree, invert the tree (swap left and right subtrees recursively), and return its root.",
    "inputFormat": "Tree nodes in level order.",
    "outputFormat": "Print inverted tree nodes in level order.",
    "constraints": "0 <= number of nodes <= 100",
    "sampleInput": "4 2 7 1 3 6 9",
    "sampleOutput": "4 7 2 9 6 3 1",
    "explanation": "Subtrees inverted.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct TreeNode* invertTree(struct TreeNode* root) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public TreeNode invertTree(TreeNode root) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 53,
    "title": "Same Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "problemStatement": "Given the roots of two binary trees p and q, write a function to check if they are the same or not (structurally identical with identical node values).",
    "inputFormat": "Two binary trees representations.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "0 <= number of nodes <= 100",
    "sampleInput": "p = [1,2,3], q = [1,2,3]",
    "sampleOutput": "true",
    "explanation": "Both trees are identical.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isSameTree(struct TreeNode* p, struct TreeNode* q) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 54,
    "title": "Subtree of Another Tree",
    "difficulty": "Easy",
    "topic": "Trees",
    "problemStatement": "Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot.",
    "inputFormat": "Tree root and subRoot representations.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= root nodes <= 2000",
    "sampleInput": "root = [3,4,5,1,2], subRoot = [4,1,2]",
    "sampleOutput": "true",
    "explanation": "subRoot matches subtree starting at node 4.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isSubtree(struct TreeNode* root, struct TreeNode* subRoot) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isSubtree(self, root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 55,
    "title": "Lowest Common Ancestor of a BST",
    "difficulty": "Medium",
    "topic": "Trees",
    "problemStatement": "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    "inputFormat": "BST root and two node values p, q.",
    "outputFormat": "Print LCA node value.",
    "constraints": "2 <= number of nodes <= 10^5",
    "sampleInput": "root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
    "sampleOutput": "6",
    "explanation": "LCA of 2 and 8 is 6.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct TreeNode* lowestCommonAncestor(struct TreeNode* root, struct TreeNode* p, struct TreeNode* q) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def lowestCommonAncestor(self, root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 56,
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Medium",
    "topic": "Trees",
    "problemStatement": "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    "inputFormat": "Binary tree nodes in level order.",
    "outputFormat": "Print node values grouped by level.",
    "constraints": "0 <= number of nodes <= 2000",
    "sampleInput": "3 9 20 null null 15 7",
    "sampleOutput": "[[3],[9,20],[15,7]]",
    "explanation": "Level 0: [3], Level 1: [9,20], Level 2: [15,7].",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 57,
    "title": "Validate Binary Search Tree",
    "difficulty": "Medium",
    "topic": "Trees",
    "problemStatement": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    "inputFormat": "Binary tree in level order.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= number of nodes <= 10^4",
    "sampleInput": "2 1 3",
    "sampleOutput": "true",
    "explanation": "Left child 1 < 2 and right child 3 > 2.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isValidBST(struct TreeNode* root) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isValidBST(TreeNode root) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 58,
    "title": "Kth Smallest Element in a BST",
    "difficulty": "Medium",
    "topic": "Trees",
    "problemStatement": "Given the root of a binary search tree and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.",
    "inputFormat": "First line contains tree nodes. Second line contains integer k.",
    "outputFormat": "Print kth smallest value.",
    "constraints": "1 <= k <= number of nodes <= 10^4",
    "sampleInput": "3 1 4 null 2\n1",
    "sampleOutput": "1",
    "explanation": "In-order traversal yields [1,2,3,4]; 1st element is 1.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint kthSmallest(struct TreeNode* root, int k) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 59,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Medium",
    "topic": "Trees",
    "problemStatement": "Given two integer arrays preorder and inorder where preorder is the preorder traversal of a binary tree and inorder is the inorder traversal of the same tree, construct and return the binary tree.",
    "inputFormat": "First line contains preorder array. Second line contains inorder array.",
    "outputFormat": "Print reconstructed tree level order.",
    "constraints": "1 <= preorder.length <= 3000",
    "sampleInput": "preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]",
    "sampleOutput": "[3,9,20,null,null,15,7]",
    "explanation": "Root is 3, left child is 9, right subtree is 20 with 15, 7.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct TreeNode* buildTree(int* preorder, int preorderSize, int* inorder, int inorderSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def buildTree(self, preorder: list[int], inorder: list[int]) -> Optional[TreeNode]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 60,
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "topic": "Trees",
    "problemStatement": "A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge. A path can start and end at any node. Return the maximum path sum of any non-empty path.",
    "inputFormat": "Tree nodes in level order.",
    "outputFormat": "Print maximum path sum.",
    "constraints": "1 <= number of nodes <= 3 * 10^4\n-1000 <= Node.val <= 1000",
    "sampleInput": "-10 9 20 null null 15 7",
    "sampleOutput": "42",
    "explanation": "Maximum path is 15 -> 20 -> 7 with sum 42.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint maxPathSum(struct TreeNode* root) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxPathSum(TreeNode* root) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxPathSum(TreeNode root) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def maxPathSum(self, root: Optional[TreeNode]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 61,
    "title": "Number of Islands",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problemStatement": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.",
    "inputFormat": "First line contains m, n. Next m lines contain grid cells.",
    "outputFormat": "Print integer count of islands.",
    "constraints": "1 <= m, n <= 300",
    "sampleInput": "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
    "sampleOutput": "1",
    "explanation": "All connected 1s form one big island.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint numIslands(char** grid, int gridSize, int* gridColSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int numIslands(char[][] grid) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def numIslands(self, grid: list[list[str]]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 62,
    "title": "Clone Graph",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problemStatement": "Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.",
    "inputFormat": "Graph adjacency list representation.",
    "outputFormat": "Cloned graph node reference.",
    "constraints": "0 <= number of nodes <= 100",
    "sampleInput": "adjList = [[2,4],[1,3],[2,4],[1,3]]",
    "sampleOutput": "[[2,4],[1,3],[2,4],[1,3]]",
    "explanation": "Deep clone constructed with same edges and copied nodes.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nstruct Node* cloneGraph(struct Node* s) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public Node cloneGraph(Node node) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def cloneGraph(self, node: Optional['Node']) -> Optional['Node']:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 63,
    "title": "Course Schedule",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problemStatement": "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. You are given an array prerequisites where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai. Return true if you can finish all courses (detect cycle in directed graph).",
    "inputFormat": "First line contains numCourses, numPrerequisites. Next lines contain pairs.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= numCourses <= 2000",
    "sampleInput": "2 1\n1 0",
    "sampleOutput": "true",
    "explanation": "Course 0 must be taken before course 1; no cycle exists.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 64,
    "title": "Course Schedule II",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problemStatement": "Return the ordering of courses you should take to finish all courses (Topological Sort). If it is impossible to finish all courses, return an empty array.",
    "inputFormat": "First line contains numCourses, numPrerequisites. Next lines contain pairs.",
    "outputFormat": "Print topological order of courses.",
    "constraints": "1 <= numCourses <= 2000",
    "sampleInput": "4 4\n1 0\n2 0\n3 1\n3 2",
    "sampleOutput": "0 2 1 3",
    "explanation": "0 must precede 1 and 2; 3 follows both 1 and 2.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* findOrder(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def findOrder(self, numCourses: int, prerequisites: list[list[int]]) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 65,
    "title": "Pacific Atlantic Water Flow",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problemStatement": "There is an m x n rectangular island that borders both the Pacific Ocean and Atlantic Ocean. Return a list of grid coordinates where rain water can flow to both oceans.",
    "inputFormat": "Grid dimensions m, n and elevation matrix.",
    "outputFormat": "List of coordinates [r, c].",
    "constraints": "1 <= m, n <= 200",
    "sampleInput": "5 5\n1 2 2 3 5\n3 2 3 4 4\n2 4 5 3 1\n6 7 1 4 5\n5 1 1 2 4",
    "sampleOutput": "[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]",
    "explanation": "Water flows to both Pacific (top/left) and Atlantic (bottom/right).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** pacificAtlantic(int** heights, int heightsSize, int* heightsColSize, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def pacificAtlantic(self, heights: list[list[int]]) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 66,
    "title": "Graph Valid Tree",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problemStatement": "Given n nodes labeled from 0 to n - 1 and a list of undirected edges, write a function to check whether these edges make up a valid tree (connected and acyclic).",
    "inputFormat": "Integer n, number of edges, and list of edges.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= n <= 2000",
    "sampleInput": "n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]",
    "sampleOutput": "true",
    "explanation": "Graph is fully connected and contains no cycles.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool validTree(int n, int** edges, int edgesSize, int* edgesColSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool validTree(int n, vector<vector<int>>& edges) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean validTree(int n, int[][] edges) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def validTree(self, n: int, edges: list[list[int]]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 67,
    "title": "Number of Connected Components",
    "difficulty": "Medium",
    "topic": "Graphs",
    "problemStatement": "You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph. Return the number of connected components in the graph.",
    "inputFormat": "Integer n, edge count, and list of edges.",
    "outputFormat": "Print component count.",
    "constraints": "1 <= n <= 2000",
    "sampleInput": "n = 5, edges = [[0,1],[1,2],[3,4]]",
    "sampleOutput": "2",
    "explanation": "Components are {0,1,2} and {3,4}.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint countComponents(int n, int** edges, int edgesSize, int* edgesColSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int countComponents(int n, vector<vector<int>>& edges) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int countComponents(int n, int[][] edges) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def countComponents(self, n: int, edges: list[list[int]]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 68,
    "title": "Flood Fill",
    "difficulty": "Easy",
    "topic": "Graphs",
    "problemStatement": "An image is represented by an m x n integer grid image. Perform a flood fill on the image starting from the pixel image[sr][sc] with a new color.",
    "inputFormat": "Grid dimensions, matrix, sr, sc, and new color.",
    "outputFormat": "Print modified image grid.",
    "constraints": "1 <= m, n <= 50",
    "sampleInput": "image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, color = 2",
    "sampleOutput": "[[2,2,2],[2,2,0],[2,0,1]]",
    "explanation": "Connected pixels with value 1 replaced with 2.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** floodFill(int** image, int imageSize, int* imageColSize, int sr, int sc, int color, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[][] floodFill(int[][] image, int sr, int sc, int color) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def floodFill(self, image: list[list[int]], sr: int, sc: int, color: int) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 69,
    "title": "Word Ladder",
    "difficulty": "Hard",
    "topic": "Graphs",
    "problemStatement": "Given two words, beginWord and endWord, and a dictionary wordList, return the number of words in the shortest transformation sequence from beginWord to endWord, such that only one letter is changed at a time, or 0 if no sequence exists.",
    "inputFormat": "beginWord, endWord, and wordList.",
    "outputFormat": "Print shortest sequence length.",
    "constraints": "1 <= beginWord.length <= 10\n1 <= wordList.length <= 5000",
    "sampleInput": "beginWord = \"hit\", endWord = \"cog\", wordList = [\"hot\",\"dot\",\"dog\",\"lot\",\"log\",\"cog\"]",
    "sampleOutput": "5",
    "explanation": "Shortest transformation is \"hit\" -> \"hot\" -> \"dot\" -> \"dog\" -> \"cog\" (5 words).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint ladderLength(char* beginWord, char* endWord, char** wordList, int wordListSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def ladderLength(self, beginWord: str, endWord: str, wordList: list[str]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 70,
    "title": "Alien Dictionary",
    "difficulty": "Hard",
    "topic": "Graphs",
    "problemStatement": "There is a new alien language that uses the Latin alphabet. Given a list of words from the alien dictionary sorted lexicographically by the rules of this new language, derive the order of letters in this language.",
    "inputFormat": "List of alien words.",
    "outputFormat": "Print alien alphabet order string.",
    "constraints": "1 <= words.length <= 100",
    "sampleInput": "words = [\"wrt\",\"wrf\",\"er\",\"ett\",\"rftt\"]",
    "sampleOutput": "wertf",
    "explanation": "Topological sort of character precedence graph.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar* alienOrder(char** words, int wordsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    string alienOrder(vector<string>& words) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public String alienOrder(String[] words) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def alienOrder(self, words: list[str]) -> str:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 71,
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "topic": "Dynamic Programming",
    "problemStatement": "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "inputFormat": "Single integer n.",
    "outputFormat": "Print total distinct ways.",
    "constraints": "1 <= n <= 45",
    "sampleInput": "3",
    "sampleOutput": "3",
    "explanation": "Ways: 1+1+1, 1+2, 2+1.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint climbStairs(int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int climbStairs(int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int climbStairs(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 72,
    "title": "Coin Change",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount, or -1.",
    "inputFormat": "First line contains n. Second line contains n coin values. Third line contains amount.",
    "outputFormat": "Print minimum coin count or -1.",
    "constraints": "1 <= coins.length <= 12\n0 <= amount <= 10^4",
    "sampleInput": "3\n1 2 5\n11",
    "sampleOutput": "3",
    "explanation": "11 = 5 + 5 + 1 (3 coins).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint coinChange(int* coins, int coinsSize, int amount) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def coinChange(self, coins: list[int], amount: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 73,
    "title": "Longest Increasing Subsequence",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "Given an integer array nums, return the length of the longest strictly increasing subsequence in O(n log n) or O(n^2) time.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print length of LIS.",
    "constraints": "1 <= nums.length <= 2500",
    "sampleInput": "8\n10 9 2 5 3 7 101 18",
    "sampleOutput": "4",
    "explanation": "The longest increasing subsequence is [2, 3, 7, 101], therefore length is 4.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint lengthOfLIS(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int lengthOfLIS(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def lengthOfLIS(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 74,
    "title": "Longest Common Subsequence",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",
    "inputFormat": "Two lines containing text1 and text2.",
    "outputFormat": "Print length of LCS.",
    "constraints": "1 <= text1.length, text2.length <= 1000",
    "sampleInput": "abcde\nace",
    "sampleOutput": "3",
    "explanation": "The longest common subsequence is \"ace\" and its length is 3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint longestCommonSubsequence(char* text1, char* text2) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def longestCommonSubsequence(self, text1: str, text2: str) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 75,
    "title": "Word Break",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.",
    "inputFormat": "String s followed by dictionary words.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= s.length <= 300\n1 <= wordDict.length <= 1000",
    "sampleInput": "s = \"leetcode\", wordDict = [\"leet\",\"code\"]",
    "sampleOutput": "true",
    "explanation": "\"leetcode\" can be segmented as \"leet code\".",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool wordBreak(char* s, char** wordDict, int wordDictSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def wordBreak(self, s: str, wordDict: list[str]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 76,
    "title": "Combination Sum IV",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.",
    "inputFormat": "Array nums and integer target.",
    "outputFormat": "Print number of combinations.",
    "constraints": "1 <= nums.length <= 200\n1 <= target <= 1000",
    "sampleInput": "nums = [1,2,3], target = 4",
    "sampleOutput": "7",
    "explanation": "Combinations are: (1,1,1,1), (1,1,2), (1,2,1), (1,3), (2,1,1), (2,2), (3,1).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint combinationSum4(int* nums, int numsSize, int target) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int combinationSum4(vector<int>& nums, int target) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int combinationSum4(int[] nums, int target) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def combinationSum4(self, nums: list[int], target: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 77,
    "title": "House Robber",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. Adjacent houses have security systems connected. Determine the maximum amount of money you can rob tonight without alerting the police.",
    "inputFormat": "Array of non-negative integers representing house amounts.",
    "outputFormat": "Print maximum robbed amount.",
    "constraints": "1 <= nums.length <= 100",
    "sampleInput": "4\n1 2 3 1",
    "sampleOutput": "4",
    "explanation": "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 4.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint rob(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rob(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def rob(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 78,
    "title": "House Robber II",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Determine the maximum amount of money you can rob without alerting the police.",
    "inputFormat": "Array of house amounts.",
    "outputFormat": "Print maximum robbed amount.",
    "constraints": "1 <= nums.length <= 100",
    "sampleInput": "3\n2 3 2",
    "sampleOutput": "3",
    "explanation": "Cannot rob house 1 and 3 because they are adjacent in circle. Max is 3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint rob(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int rob(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int rob(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def rob(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 79,
    "title": "Unique Paths",
    "difficulty": "Medium",
    "topic": "Dynamic Programming",
    "problemStatement": "There is a robot on an m x n grid. The robot is initially located at the top-left corner (grid[0][0]) and wants to reach the bottom-right corner (grid[m - 1][n - 1]). The robot can only move either down or right. Return number of unique paths.",
    "inputFormat": "Two integers m and n.",
    "outputFormat": "Print count of unique paths.",
    "constraints": "1 <= m, n <= 100",
    "sampleInput": "3 7",
    "sampleOutput": "28",
    "explanation": "Total paths from top-left to bottom-right in 3x7 grid is 28.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint uniquePaths(int m, int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int uniquePaths(int m, int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def uniquePaths(self, m: int, n: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 80,
    "title": "Edit Distance",
    "difficulty": "Hard",
    "topic": "Dynamic Programming",
    "problemStatement": "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2 (insert, delete, or replace a character).",
    "inputFormat": "Two strings word1 and word2.",
    "outputFormat": "Print minimum edit operations.",
    "constraints": "0 <= word1.length, word2.length <= 500",
    "sampleInput": "horse\nros",
    "sampleOutput": "3",
    "explanation": "horse -> rorse (replace 'h' with 'r') -> rose (remove 'r') -> ros (remove 'e').",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint minDistance(char* word1, char* word2) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int minDistance(String word1, String word2) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def minDistance(self, word1: str, word2: str) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 81,
    "title": "Fibonacci Number",
    "difficulty": "Easy",
    "topic": "Recursion",
    "problemStatement": "The Fibonacci numbers form a sequence such that each number is the sum of the two preceding ones, starting from 0 and 1. Given n, calculate F(n).",
    "inputFormat": "Single integer n.",
    "outputFormat": "Print F(n).",
    "constraints": "0 <= n <= 30",
    "sampleInput": "4",
    "sampleOutput": "3",
    "explanation": "F(4) = F(3) + F(2) = 2 + 1 = 3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint fib(int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int fib(int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int fib(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def fib(self, n: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 82,
    "title": "Power of Three",
    "difficulty": "Easy",
    "topic": "Recursion",
    "problemStatement": "Given an integer n, return true if it is a power of three. Otherwise, return false.",
    "inputFormat": "Single integer n.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "-2^31 <= n <= 2^31 - 1",
    "sampleInput": "27",
    "sampleOutput": "true",
    "explanation": "27 = 3^3.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool isPowerOfThree(int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool isPowerOfThree(int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean isPowerOfThree(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def isPowerOfThree(self, n: int) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 83,
    "title": "Subsets",
    "difficulty": "Medium",
    "topic": "Recursion",
    "problemStatement": "Given an integer array nums of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    "inputFormat": "Array nums of unique integers.",
    "outputFormat": "Print power set subsets.",
    "constraints": "1 <= nums.length <= 10",
    "sampleInput": "1 2 3",
    "sampleOutput": "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
    "explanation": "All 2^3 = 8 subsets.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def subsets(self, nums: list[int]) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 84,
    "title": "Permutations",
    "difficulty": "Medium",
    "topic": "Recursion",
    "problemStatement": "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
    "inputFormat": "Array nums of distinct integers.",
    "outputFormat": "Print all permutations.",
    "constraints": "1 <= nums.length <= 6",
    "sampleInput": "1 2 3",
    "sampleOutput": "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
    "explanation": "All 3! = 6 permutations.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def permute(self, nums: list[int]) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 85,
    "title": "Combination Sum",
    "difficulty": "Medium",
    "topic": "Recursion",
    "problemStatement": "Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. The same number may be chosen unlimited number of times.",
    "inputFormat": "Candidates array and target integer.",
    "outputFormat": "Print valid combinations.",
    "constraints": "1 <= candidates.length <= 30\n2 <= target <= 40",
    "sampleInput": "candidates = [2,3,6,7], target = 7",
    "sampleOutput": "[[2,2,3],[7]]",
    "explanation": "2 and 3 add up to 7 (2+2+3=7). 7 is also a candidate.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def combinationSum(self, candidates: list[int], target: int) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 86,
    "title": "Subsets II",
    "difficulty": "Medium",
    "topic": "Recursion",
    "problemStatement": "Given an integer array nums that may contain duplicates, return all possible subsets (the power set). The solution set must not contain duplicate subsets.",
    "inputFormat": "Array nums with possible duplicates.",
    "outputFormat": "Print unique subsets.",
    "constraints": "1 <= nums.length <= 10",
    "sampleInput": "1 2 2",
    "sampleOutput": "[[],[1],[1,2],[1,2,2],[2],[2,2]]",
    "explanation": "Subsets without duplicates.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint** subsetsWithDup(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<Integer>> subsetsWithDup(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def subsetsWithDup(self, nums: list[int]) -> list[list[int]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 87,
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Medium",
    "topic": "Recursion",
    "problemStatement": "Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent based on classic telephone buttons.",
    "inputFormat": "String digits.",
    "outputFormat": "Print list of letter strings.",
    "constraints": "0 <= digits.length <= 4",
    "sampleInput": "23",
    "sampleOutput": "[\"ad\",\"ae\",\"af\",\"bd\",\"be\",\"bf\",\"cd\",\"ce\",\"cf\"]",
    "explanation": "Letters mapped to 2 (abc) and 3 (def).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar** letterCombinations(char* digits, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<String> letterCombinations(String digits) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def letterCombinations(self, digits: str) -> list[str]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 88,
    "title": "Word Search",
    "difficulty": "Medium",
    "topic": "Recursion",
    "problemStatement": "Given an m x n grid of characters board and a string word, return true if word exists in the grid using adjacent horizontal/vertical cells without reusing the same cell twice.",
    "inputFormat": "Grid board dimensions, matrix, and search word.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= m, n <= 6\n1 <= word.length <= 15",
    "sampleInput": "board = [[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], word = \"ABCCED\"",
    "sampleOutput": "true",
    "explanation": "Word traced along adjacent cells.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool exist(char** board, int boardSize, int* boardColSize, char* word) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean exist(char[][] board, String word) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def exist(self, board: list[list[str]], word: str) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 89,
    "title": "Palindrome Partitioning",
    "difficulty": "Medium",
    "topic": "Recursion",
    "problemStatement": "Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of s.",
    "inputFormat": "Single string s.",
    "outputFormat": "Print list of palindrome partitions.",
    "constraints": "1 <= s.length <= 16",
    "sampleInput": "aab",
    "sampleOutput": "[[\"a\",\"a\",\"b\"],[\"aa\",\"b\"]]",
    "explanation": "Both partitions consist entirely of palindromic substrings.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar*** partition(char* s, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> partition(String s) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def partition(self, s: str) -> list[list[str]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 90,
    "title": "N-Queens",
    "difficulty": "Hard",
    "topic": "Recursion",
    "problemStatement": "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return all distinct solutions.",
    "inputFormat": "Single integer n.",
    "outputFormat": "Print board configurations with 'Q' and '.'.",
    "constraints": "1 <= n <= 9",
    "sampleInput": "4",
    "sampleOutput": "[[ \".Q..\", \"...Q\", \"Q...\", \"..Q.\" ], [ \"..Q.\", \"Q...\", \"...Q\", \".Q..\" ]]",
    "explanation": "Two distinct solutions exist for 4-Queens.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nchar*** solveNQueens(int n, int* returnSize, int** returnColumnSizes) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public List<List<String>> solveNQueens(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def solveNQueens(self, n: int) -> list[list[str]]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 91,
    "title": "Maximum Subarray Sum (Greedy)",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "Given an integer array nums, greedily track the maximum prefix sum to find the largest sum contiguous subarray.",
    "inputFormat": "Array nums.",
    "outputFormat": "Print max sum.",
    "constraints": "1 <= nums.length <= 10^5",
    "sampleInput": "1",
    "sampleOutput": "1",
    "explanation": "Single element maximum subarray.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint maxSubArrayGreedy(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int maxSubArrayGreedy(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int maxSubArrayGreedy(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def maxSubArrayGreedy(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 92,
    "title": "Jump Game",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return true if you can reach the last index.",
    "inputFormat": "Array nums.",
    "outputFormat": "Print 'true' or 'false'.",
    "constraints": "1 <= nums.length <= 10^4",
    "sampleInput": "5\n2 3 1 1 4",
    "sampleOutput": "true",
    "explanation": "Jump 1 step from index 0 to 1, then 3 steps to the last index.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nbool canJump(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public boolean canJump(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def canJump(self, nums: list[int]) -> bool:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 93,
    "title": "Jump Game II",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0]. Return the minimum number of jumps to reach nums[n - 1].",
    "inputFormat": "Array nums.",
    "outputFormat": "Print minimum jump count.",
    "constraints": "1 <= nums.length <= 10^4",
    "sampleInput": "5\n2 3 1 1 4",
    "sampleOutput": "2",
    "explanation": "Minimum jumps to reach the last index is 2 (index 0 -> 1 -> 4).",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint jump(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int jump(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int jump(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def jump(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 94,
    "title": "Gas Station",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i]. Return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.",
    "inputFormat": "Two arrays gas and cost.",
    "outputFormat": "Print starting station index or -1.",
    "constraints": "n == gas.length == cost.length <= 10^5",
    "sampleInput": "gas = [1,2,3,4,5], cost = [3,4,5,1,2]",
    "sampleOutput": "3",
    "explanation": "Start at index 3 (cost = 1, fill 4). You can travel around the circular route.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint canCompleteCircuit(int* gas, int gasSize, int* cost, int costSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def canCompleteCircuit(self, gas: list[int], cost: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 95,
    "title": "Number of 1 Bits (Hamming Weight)",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).",
    "inputFormat": "Positive integer n.",
    "outputFormat": "Print count of 1 bits.",
    "constraints": "1 <= n <= 2^31 - 1",
    "sampleInput": "11",
    "sampleOutput": "3",
    "explanation": "11 in binary is 1011, which has three set bits.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint hammingWeight(int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int hammingWeight(int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int hammingWeight(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def hammingWeight(self, n: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 96,
    "title": "Counting Bits",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.",
    "inputFormat": "Single integer n.",
    "outputFormat": "Print array of bit counts.",
    "constraints": "0 <= n <= 10^5",
    "sampleInput": "5",
    "sampleOutput": "0 1 1 2 1 2",
    "explanation": "Binary representations: 0:0, 1:1, 2:1, 3:2, 4:1, 5:2.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint* countBits(int n, int* returnSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> countBits(int n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int[] countBits(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def countBits(self, n: int) -> list[int]:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 97,
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "Reverse bits of a given 32 bits unsigned integer.",
    "inputFormat": "Binary string of length 32 or unsigned integer.",
    "outputFormat": "Print integer value of reversed bits.",
    "constraints": "Input must be a 32-bit unsigned integer.",
    "sampleInput": "00000010100101000001111010011100",
    "sampleOutput": "964176192",
    "explanation": "Bits reversed.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nunsigned int reverseBits(unsigned int n) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    uint32_t reverseBits(uint32_t n) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int reverseBits(int n) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def reverseBits(self, n: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 98,
    "title": "Missing Number",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array (using XOR).",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print missing integer.",
    "constraints": "n == nums.length <= 10^4",
    "sampleInput": "3\n3 0 1",
    "sampleOutput": "2",
    "explanation": "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint missingNumber(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int missingNumber(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def missingNumber(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 99,
    "title": "Sum of Two Integers",
    "difficulty": "Medium",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "Given two integers a and b, return the sum of the two integers without using the operators + and - (using bitwise XOR and AND shifts).",
    "inputFormat": "Two integers a and b.",
    "outputFormat": "Print sum.",
    "constraints": "-1000 <= a, b <= 1000",
    "sampleInput": "2 3",
    "sampleOutput": "5",
    "explanation": "XOR computes sum without carry; AND left shifted by 1 computes carry.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint getSum(int a, int b) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int getSum(int a, int b) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int getSum(int a, int b) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def getSum(self, a: int, b: int) -> int:\n        # Write your solution here\n        pass"
    }
  },
  {
    "id": 100,
    "title": "Single Number",
    "difficulty": "Easy",
    "topic": "Greedy Algorithms and Bit Manipulation",
    "problemStatement": "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one in linear runtime complexity and without extra memory.",
    "inputFormat": "First line contains n. Second line contains n integers.",
    "outputFormat": "Print single unique integer.",
    "constraints": "1 <= nums.length <= 3 * 10^4\nEach element appears twice except for one.",
    "sampleInput": "5\n4 1 2 1 2",
    "sampleOutput": "4",
    "explanation": "XOR of duplicate numbers is 0; 4 ^ 0 = 4.",
    "starterCode": {
      "c": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n#include <stdbool.h>\n\nint singleNumber(int* nums, int numsSize) {\n    // Write your code here\n}",
      "cpp": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nclass Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        // Write your solution here\n    }\n};",
      "java": "import java.util.*;\n\nclass Solution {\n    public int singleNumber(int[] nums) {\n        // Write your solution here\n    }\n}",
      "python": "class Solution:\n    def singleNumber(self, nums: list[int]) -> int:\n        # Write your solution here\n        pass"
    }
  }
];
