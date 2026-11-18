// server/utils/driverAdapter.js
// Utility to adapt LeetCode-style function templates for standalone Judge0/OnlineCompiler execution.

/**
 * Checks if the source code already contains an entrypoint (main function).
 * @param {string} code 
 * @param {string} lang 
 * @returns {boolean}
 */
function hasMain(code, lang) {
  if (!code) return false;
  const l = String(lang).toLowerCase();

  if (l === 'c' || l === 'cpp') {
    return /\bint\s+main\s*\(|\bvoid\s+main\s*\(/.test(code);
  }
  if (l === 'java') {
    return /\bpublic\s+static\s+void\s+main\s*\(|\bstatic\s+public\s+void\s+main\s*\(/.test(code);
  }
  if (l === 'python') {
    return /__name__\s*==\s*['"]__main__['"]|sys\.stdin\.read|input\s*\(/.test(code);
  }
  return false;
}

/**
 * Common struct definitions for C/C++ in linked lists and trees
 */
const CPP_STRUCT_DEFS = `
#ifndef MYDESK_STRUCTS_DEFINED
#define MYDESK_STRUCTS_DEFINED
#ifndef ListNode_DEFINED
struct ListNode {
    int val;
    ListNode *next;
    ListNode() : val(0), next(nullptr) {}
    ListNode(int x) : val(x), next(nullptr) {}
    ListNode(int x, ListNode *next) : val(x), next(next) {}
};
#endif
#ifndef TreeNode_DEFINED
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode() : val(0), left(nullptr), right(nullptr) {}
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};
#endif
#endif
`;

const PYTHON_STRUCT_DEFS = `
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right
`;

/**
 * Adapts source code by appending a driver if no main() is detected.
 * @param {string} sourceCode 
 * @param {string} language 
 * @param {object} question 
 * @returns {string} adapted source code
 */
function adaptSourceCode(sourceCode, language, question) {
  const lang = String(language).toLowerCase();
  if (hasMain(sourceCode, lang)) {
    return sourceCode;
  }

  // 1. Python Adaptation
  if (lang === 'python') {
    let prepended = '';
    if (!sourceCode.includes('class ListNode') && (question?.topic === 'Linked Lists')) {
      prepended += PYTHON_STRUCT_DEFS + '\n';
    }
    if (!sourceCode.includes('class TreeNode') && (question?.topic === 'Trees')) {
      prepended += PYTHON_STRUCT_DEFS + '\n';
    }

    const pythonDriver = `

# --- Standalone Test Driver (Phase 7.3) ---
if __name__ == '__main__':
    import sys, inspect

    if 'Solution' in globals():
        sol = Solution()
        methods = [m for m in dir(sol) if not m.startswith('_') and callable(getattr(sol, m))]
        if methods:
            fn = getattr(sol, methods[0])
            sig = inspect.signature(fn)
            params = [p for p in sig.parameters.values() if p.name != 'self']
            
            raw = sys.stdin.read().strip()
            lines = [l.strip() for l in raw.splitlines() if l.strip()]
            tokens = raw.split()

            try:
                res = None
                if len(params) == 0:
                    res = fn()
                elif len(params) == 1:
                    if len(lines) >= 2 and tokens and tokens[0].isdigit() and int(tokens[0]) == len(tokens) - 1:
                        nums = [int(x) for x in tokens[1:]]
                        res = fn(nums)
                    elif len(tokens) > 1 and all(t.lstrip('-').isdigit() for t in tokens):
                        nums = [int(x) for x in tokens]
                        res = fn(nums)
                    elif len(tokens) == 1 and tokens[0].lstrip('-').isdigit():
                        res = fn(int(tokens[0]))
                    else:
                        res = fn(raw)
                elif len(params) == 2:
                    if len(lines) >= 2 and all(not l.lstrip('-').isdigit() for l in lines[:2]):
                        res = fn(lines[0], lines[1])
                    elif len(tokens) >= 3 and tokens[0].isdigit():
                        n = int(tokens[0])
                        nums = [int(x) for x in tokens[1:n+1]]
                        target = int(tokens[n+1]) if len(tokens) > n+1 else int(tokens[-1])
                        res = fn(nums, target)
                    elif len(tokens) >= 2 and tokens[-1].lstrip('-').isdigit():
                        nums = [int(x) for x in tokens[:-1]]
                        target = int(tokens[-1])
                        res = fn(nums, target)
                    elif len(tokens) == 2 and all(t.lstrip('-').isdigit() for t in tokens):
                        res = fn(int(tokens[0]), int(tokens[1]))
                    else:
                        res = fn(lines[0] if lines else '', lines[1] if len(lines) > 1 else '')

                if res is not None:
                    if isinstance(res, bool):
                        print(str(res).lower())
                    elif isinstance(res, (list, tuple)):
                        print(' '.join(map(str, res)))
                    else:
                        print(res)
            except Exception as e:
                pass
`;
    return prepended + sourceCode + pythonDriver;
  }

  // 2. C++ Adaptation
  if (lang === 'cpp') {
    let prepended = '';
    if (!sourceCode.includes('struct ListNode') && (question?.topic === 'Linked Lists')) {
      prepended += CPP_STRUCT_DEFS + '\n';
    }
    if (!sourceCode.includes('struct TreeNode') && (question?.topic === 'Trees')) {
      prepended += CPP_STRUCT_DEFS + '\n';
    }

    // Inspect question starter to generate tailored C++ main driver
    let cppDriver = '';
    if (question && question.starterCode && question.starterCode.cpp) {
      const match = question.starterCode.cpp.match(/([a-zA-Z0-9_<>\*]+)\s+([a-zA-Z0-9_]+)\s*\(([^)]*)\)/);
      if (match) {
        const retType = match[1];
        const methName = match[2];
        const params = match[3];

        if (params.includes('vector<int>&') && params.includes('int target')) {
          cppDriver = `
int main() {
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        for(int i = 0; i < n; i++) cin >> nums[i];
        int target;
        if (cin >> target) {
            Solution sol;
            auto res = sol.${methName}(nums, target);
            for(size_t i = 0; i < res.size(); i++) {
                cout << res[i] << (i + 1 == res.size() ? "" : " ");
            }
            cout << endl;
        }
    }
    return 0;
}
`;
        } else if (params.includes('vector<int>&')) {
          cppDriver = `
int main() {
    int n;
    if (cin >> n) {
        vector<int> nums(n);
        for(int i = 0; i < n; i++) cin >> nums[i];
        Solution sol;
        auto res = sol.${methName}(nums);
        ${retType === 'bool' ? 'cout << (res ? "true" : "false") << endl;' : 
          retType.includes('vector') ? 'for(size_t i = 0; i < res.size(); i++) cout << res[i] << (i + 1 == res.size() ? "" : " "); cout << endl;' :
          'cout << res << endl;'}
    }
    return 0;
}
`;
        } else if (params.includes('string') && params.includes(',')) {
          cppDriver = `
int main() {
    string s, t;
    if (cin >> s >> t) {
        Solution sol;
        auto res = sol.${methName}(s, t);
        ${retType === 'bool' ? 'cout << (res ? "true" : "false") << endl;' : 'cout << res << endl;'}
    }
    return 0;
}
`;
        } else if (params.includes('string')) {
          cppDriver = `
int main() {
    string s;
    if (getline(cin, s)) {
        Solution sol;
        auto res = sol.${methName}(s);
        ${retType === 'bool' ? 'cout << (res ? "true" : "false") << endl;' : 'cout << res << endl;'}
    }
    return 0;
}
`;
        } else if (params.includes('int n') || params === 'int') {
          cppDriver = `
int main() {
    int n;
    if (cin >> n) {
        Solution sol;
        auto res = sol.${methName}(n);
        ${retType === 'bool' ? 'cout << (res ? "true" : "false") << endl;' : 'cout << res << endl;'}
    }
    return 0;
}
`;
        }
      }
    }

    if (!cppDriver) {
      cppDriver = `
int main() {
    Solution sol;
    return 0;
}
`;
    }

    return prepended + sourceCode + '\n' + cppDriver;
  }

  // 3. Java Adaptation
  if (lang === 'java') {
    // If class Solution doesn't have main, append public class Main calling Solution
    const javaDriver = `
public class Main {
    public static void main(String[] args) {
        try {
            Solution sol = new Solution();
            Scanner sc = new Scanner(System.in);
            if (sc.hasNext()) {
                // Instantiated Solution successfully
            }
        } catch (Exception e) {}
    }
}
`;
    return sourceCode + '\n' + javaDriver;
  }

  // 4. C Adaptation
  if (lang === 'c') {
    const cDriver = `
int main() {
    return 0;
}
`;
    return sourceCode + '\n' + cDriver;
  }

  return sourceCode;
}

module.exports = { hasMain, adaptSourceCode };
