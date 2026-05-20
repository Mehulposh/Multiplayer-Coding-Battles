import Problem from '../models/problemModel.js';
import logger from '../utils/logger.js';


// ─── CREATE ───────────────────────────────────────────────
const createProblem = async (req, res) => {
  try {
    const {
      title, difficulty, description,
      examples, constraints, starterCode,
      testCases, hiddenTestCases, tags,
      timeLimitMs, memoryLimitMb,
    } = req.body;

    if (!title || !difficulty || !description) {
      return res.status(400).json({ message: 'title, difficulty and description are required' });
    }
    if (!['easy', 'medium', 'hard'].includes(difficulty)) {
      return res.status(400).json({ message: 'difficulty must be easy, medium, or hard' });
    }
    if (!testCases || !Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ message: 'At least one testCase is required' });
    }

    const exists = await Problem.findOne({ title });
    if (exists) {
      return res.status(409).json({ message: `A problem named "${title}" already exists` });
    }

    const problem = await Problem.create({
      title, difficulty, description,
      examples:        examples        || [],
      constraints:     constraints     || [],
      starterCode:     starterCode     || {},
      testCases:       testCases       || [],
      hiddenTestCases: hiddenTestCases || [],
      tags:            tags            || [],
      timeLimitMs:     timeLimitMs     || 2000,
      memoryLimitMb:   memoryLimitMb   || 128,
      isActive: true,
    });

    res.status(201).json({ message: 'Problem created', problem });
  } catch (err) {
    logger.error('Create problem error:', err);
    res.status(500).json({ message: 'Failed to create problem' });
  }
};

// ─── UPDATE ───────────────────────────────────────────────
const updateProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    const allowed = [
      'title', 'difficulty', 'description', 'examples',
      'constraints', 'starterCode', 'testCases',
      'hiddenTestCases', 'tags', 'timeLimitMs', 'memoryLimitMb', 'isActive',
    ];

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) problem[field] = req.body[field];
    });

    await problem.save();
    res.json({ message: 'Problem updated', problem });
  } catch (err) {
    logger.error('Update problem error:', err);
    res.status(500).json({ message: 'Failed to update problem' });
  }
};

// ─── DELETE ───────────────────────────────────────────────
const deleteProblem = async (req, res) => {
  try {
    const problem = await Problem.findByIdAndDelete(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.json({ message: `Problem "${problem.title}" deleted` });
  } catch (err) {
    logger.error('Delete problem error:', err);
    res.status(500).json({ message: 'Failed to delete problem' });
  }
};

// ─── TOGGLE ACTIVE ────────────────────────────────────────
const toggleProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });

    problem.isActive = !problem.isActive;
    await problem.save();

    res.json({
      message: `Problem "${problem.title}" is now ${problem.isActive ? 'active' : 'inactive'}`,
      isActive: problem.isActive,
    });
  } catch (err) {
    logger.error('Toggle problem error:', err);
    res.status(500).json({ message: 'Failed to toggle problem' });
  }
};


const getProblems = async (req, res) => {
  try {
    const { difficulty, tag, page = 1, limit = 20 } = req.query;
    const filter = { isActive: true };

    if (difficulty) filter.difficulty = difficulty;
    if (tag) filter.tags = tag;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [problems, total] = await Promise.all([
      Problem.find(filter)
        .select('title description difficulty tags timeLimitMs memoryLimitMb')
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ difficulty: 1, title: 1 }),
      Problem.countDocuments(filter),
    ]);

    res.json({ problems, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) });
  } catch (err) {
    logger.error('Get problems error:', err);
    res.status(500).json({ message: 'Failed to fetch problems' });
  }
};

const getProblem = async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id).select('-hiddenTestCases');

    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }

    res.json({ problem });
  } catch (err) {
    logger.error('Get problem error:', err);
    res.status(500).json({ message: 'Failed to fetch problem' });
  }
};

const seedProblems = async (req, res) => {
  try {
    const count = await Problem.countDocuments();
    if (count > 0) {
      return res.json({ message: 'Problems already seeded', count });
    }

    const problems = [
      {
        title: 'Two Sum',
        difficulty: 'easy',
        description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
        examples: [
          { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
          { input: 'nums = [3,2,4], target = 6', output: '[1,2]', explanation: '' },
        ],
        constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', 'Only one valid answer exists.'],
        starterCode: {
          javascript: 'function twoSum(nums, target) {\n  // Your code here\n}',
          python: 'def twoSum(nums, target):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};',
          go: 'func twoSum(nums []int, target int) []int {\n    // Your code here\n    return nil\n}',
        },
        testCases: [
          { input: '[2,7,11,15]\n9', expected: '[0,1]' },
          { input: '[3,2,4]\n6', expected: '[1,2]' },
          { input: '[3,3]\n6', expected: '[0,1]' },
        ],
        hiddenTestCases: [
          { input: '[1,5,3,2]\n8', expected: '[1,2]' },
          { input: '[0,4,3,0]\n0', expected: '[0,3]' },
        ],
        tags: ['array', 'hash-table'],
        timeLimitMs: 2000,
        memoryLimitMb: 128,
      },
      {
        title: 'Reverse String',
        difficulty: 'easy',
        description: 'Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array in-place with O(1) extra memory.',
        examples: [
          { input: 's = ["h","e","l","l","o"]', output: '["o","l","l","e","h"]', explanation: '' },
          { input: 's = ["H","a","n","n","a","h"]', output: '["h","a","n","n","a","H"]', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^5', 's[i] is a printable ascii character.'],
        starterCode: {
          javascript: 'function reverseString(s) {\n  // Your code here\n}',
          python: 'def reverseString(s):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Your code here\n    }\n};',
          go: 'func reverseString(s []byte) {\n    // Your code here\n}',
        },
        testCases: [
          { input: '["h","e","l","l","o"]', expected: '["o","l","l","e","h"]' },
          { input: '["H","a","n","n","a","h"]', expected: '["h","a","n","n","a","H"]' },
        ],
        hiddenTestCases: [
          { input: '["a"]', expected: '["a"]' },
          { input: '["a","b"]', expected: '["b","a"]' },
        ],
        tags: ['string', 'two-pointers'],
        timeLimitMs: 1000,
        memoryLimitMb: 128,
      },
      {
        title: 'Valid Parentheses',
        difficulty: 'easy',
        description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n- Open brackets must be closed by the same type of brackets.\n- Open brackets must be closed in the correct order.\n- Every close bracket has a corresponding open bracket of the same type.',
        examples: [
          { input: 's = "()"', output: 'true', explanation: '' },
          { input: 's = "()[]{}"', output: 'true', explanation: '' },
          { input: 's = "(]"', output: 'false', explanation: '' },
        ],
        constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only \'()[]{}\'.'],
        starterCode: {
          javascript: 'function isValid(s) {\n  // Your code here\n}',
          python: 'def isValid(s):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n    }\n};',
          go: 'func isValid(s string) bool {\n    // Your code here\n    return false\n}',
        },
        testCases: [
          { input: '()', expected: 'true' },
          { input: '()[]{}', expected: 'true' },
          { input: '(]', expected: 'false' },
        ],
        hiddenTestCases: [
          { input: '{[]}', expected: 'true' },
          { input: '([)]', expected: 'false' },
        ],
        tags: ['string', 'stack'],
        timeLimitMs: 1000,
        memoryLimitMb: 128,
      },
      {
        title: 'Maximum Subarray',
        difficulty: 'medium',
        description: 'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.',
        examples: [
          { input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', output: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
          { input: 'nums = [1]', output: '1', explanation: '' },
          { input: 'nums = [5,4,-1,7,8]', output: '23', explanation: '' },
        ],
        constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
        starterCode: {
          javascript: 'function maxSubArray(nums) {\n  // Your code here\n}',
          python: 'def maxSubArray(nums):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        // Your code here\n    }\n};',
          go: 'func maxSubArray(nums []int) int {\n    // Your code here\n    return 0\n}',
        },
        testCases: [
          { input: '[-2,1,-3,4,-1,2,1,-5,4]', expected: '6' },
          { input: '[1]', expected: '1' },
          { input: '[5,4,-1,7,8]', expected: '23' },
        ],
        hiddenTestCases: [
          { input: '[-1]', expected: '-1' },
          { input: '[-2,-1]', expected: '-1' },
        ],
        tags: ['array', 'dynamic-programming', 'divide-and-conquer'],
        timeLimitMs: 2000,
        memoryLimitMb: 128,
      },
      {
        title: 'Climbing Stairs',
        difficulty: 'easy',
        description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb `1` or `2` steps. In how many distinct ways can you climb to the top?',
        examples: [
          { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top: 1+1, 2' },
          { input: 'n = 3', output: '3', explanation: 'There are three ways: 1+1+1, 1+2, 2+1' },
        ],
        constraints: ['1 <= n <= 45'],
        starterCode: {
          javascript: 'function climbStairs(n) {\n  // Your code here\n}',
          python: 'def climbStairs(n):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public int climbStairs(int n) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    int climbStairs(int n) {\n        // Your code here\n    }\n};',
          go: 'func climbStairs(n int) int {\n    // Your code here\n    return 0\n}',
        },
        testCases: [
          { input: '2', expected: '2' },
          { input: '3', expected: '3' },
          { input: '4', expected: '5' },
        ],
        hiddenTestCases: [
          { input: '10', expected: '89' },
          { input: '45', expected: '1836311903' },
        ],
        tags: ['math', 'dynamic-programming', 'memoization'],
        timeLimitMs: 1000,
        memoryLimitMb: 128,
      },
      {
        title: 'Merge Two Sorted Lists',
        difficulty: 'easy',
        description: 'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\nFor this problem, represent lists as arrays.',
        examples: [
          { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]', explanation: '' },
          { input: 'list1 = [], list2 = []', output: '[]', explanation: '' },
        ],
        constraints: ['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100'],
        starterCode: {
          javascript: 'function mergeTwoLists(list1, list2) {\n  // list1 and list2 are arrays\n  // Return merged sorted array\n}',
          python: 'def mergeTwoLists(list1, list2):\n    # list1 and list2 are arrays\n    # Return merged sorted array\n    pass',
          java: 'class Solution {\n    public int[] mergeTwoLists(int[] list1, int[] list2) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    vector<int> mergeTwoLists(vector<int>& list1, vector<int>& list2) {\n        // Your code here\n    }\n};',
          go: 'func mergeTwoLists(list1 []int, list2 []int) []int {\n    // Your code here\n    return nil\n}',
        },
        testCases: [
          { input: '[1,2,4]\n[1,3,4]', expected: '[1,1,2,3,4,4]' },
          { input: '[]\n[]', expected: '[]' },
          { input: '[]\n[0]', expected: '[0]' },
        ],
        hiddenTestCases: [
          { input: '[1,3,5]\n[2,4,6]', expected: '[1,2,3,4,5,6]' },
        ],
        tags: ['linked-list', 'recursion'],
        timeLimitMs: 1000,
        memoryLimitMb: 128,
      },
      {
        title: 'Binary Search',
        difficulty: 'easy',
        description: 'Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums`. If `target` exists, then return its index. Otherwise, return `-1`.\n\nYou must write an algorithm with O(log n) runtime complexity.',
        examples: [
          { input: 'nums = [-1,0,3,5,9,12], target = 9', output: '4', explanation: '9 exists in nums and its index is 4' },
          { input: 'nums = [-1,0,3,5,9,12], target = 2', output: '-1', explanation: '2 does not exist in nums so return -1' },
        ],
        constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
        starterCode: {
          javascript: 'function search(nums, target) {\n  // Your code here\n}',
          python: 'def search(nums, target):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Your code here\n    }\n};',
          go: 'func search(nums []int, target int) int {\n    // Your code here\n    return -1\n}',
        },
        testCases: [
          { input: '[-1,0,3,5,9,12]\n9', expected: '4' },
          { input: '[-1,0,3,5,9,12]\n2', expected: '-1' },
        ],
        hiddenTestCases: [
          { input: '[5]\n5', expected: '0' },
          { input: '[1,3,5,7,9,11]\n7', expected: '3' },
        ],
        tags: ['array', 'binary-search'],
        timeLimitMs: 1000,
        memoryLimitMb: 128,
      },
      {
        title: 'Longest Common Prefix',
        difficulty: 'easy',
        description: 'Write a function to find the longest common prefix string amongst an array of strings.\n\nIf there is no common prefix, return an empty string `""`.',
        examples: [
          { input: 'strs = ["flower","flow","flight"]', output: '"fl"', explanation: '' },
          { input: 'strs = ["dog","racecar","car"]', output: '""', explanation: 'There is no common prefix among the input strings.' },
        ],
        constraints: ['1 <= strs.length <= 200', '0 <= strs[i].length <= 200', 'strs[i] consists of only lowercase English letters.'],
        starterCode: {
          javascript: 'function longestCommonPrefix(strs) {\n  // Your code here\n}',
          python: 'def longestCommonPrefix(strs):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        // Your code here\n    }\n};',
          go: 'func longestCommonPrefix(strs []string) string {\n    // Your code here\n    return ""\n}',
        },
        testCases: [
          { input: '["flower","flow","flight"]', expected: 'fl' },
          { input: '["dog","racecar","car"]', expected: '' },
          { input: '["ab","a"]', expected: 'a' },
        ],
        hiddenTestCases: [
          { input: '["a"]', expected: 'a' },
          { input: '["interspecies","interstellar","interstate"]', expected: 'inters' },
        ],
        tags: ['string', 'trie'],
        timeLimitMs: 1000,
        memoryLimitMb: 128,
      },
      {
        title: 'Number of Islands',
        difficulty: 'medium',
        description: 'Given an `m x n` 2D binary grid `grid` which represents a map of `"1"`s (land) and `"0"`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.',
        examples: [
          { input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', output: '1', explanation: '' },
          { input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', output: '3', explanation: '' },
        ],
        constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is \'0\' or \'1\'.'],
        starterCode: {
          javascript: 'function numIslands(grid) {\n  // Your code here\n}',
          python: 'def numIslands(grid):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public int numIslands(char[][] grid) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        // Your code here\n    }\n};',
          go: 'func numIslands(grid [][]byte) int {\n    // Your code here\n    return 0\n}',
        },
        testCases: [
          { input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', expected: '1' },
          { input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', expected: '3' },
        ],
        hiddenTestCases: [
          { input: '[["1"]]', expected: '1' },
          { input: '[["0"]]', expected: '0' },
        ],
        tags: ['array', 'depth-first-search', 'breadth-first-search', 'union-find'],
        timeLimitMs: 2000,
        memoryLimitMb: 128,
      },
      {
        title: 'Coin Change',
        difficulty: 'medium',
        description: 'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.',
        examples: [
          { input: 'coins = [1,2,5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1' },
          { input: 'coins = [2], amount = 3', output: '-1', explanation: '' },
          { input: 'coins = [1], amount = 0', output: '0', explanation: '' },
        ],
        constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
        starterCode: {
          javascript: 'function coinChange(coins, amount) {\n  // Your code here\n}',
          python: 'def coinChange(coins, amount):\n    # Your code here\n    pass',
          java: 'class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Your code here\n    }\n}',
          cpp: 'class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Your code here\n    }\n};',
          go: 'func coinChange(coins []int, amount int) int {\n    // Your code here\n    return -1\n}',
        },
        testCases: [
          { input: '[1,2,5]\n11', expected: '3' },
          { input: '[2]\n3', expected: '-1' },
          { input: '[1]\n0', expected: '0' },
        ],
        hiddenTestCases: [
          { input: '[1,5,10,25]\n36', expected: '3' },
          { input: '[2,5,10,1]\n27', expected: '4' },
        ],
        tags: ['array', 'dynamic-programming', 'breadth-first-search'],
        timeLimitMs: 2000,
        memoryLimitMb: 128,
      },
    ];

    await Problem.insertMany(problems);
    res.json({ message: 'Problems seeded successfully', count: problems.length });
  } catch (err) {
    logger.error('Seed problems error:', err);
    res.status(500).json({ message: 'Failed to seed problems' });
  }
};

export {
  getProblems,
  getProblem,
  seedProblems,
  createProblem,
  updateProblem,
  deleteProblem,
  toggleProblem,
};