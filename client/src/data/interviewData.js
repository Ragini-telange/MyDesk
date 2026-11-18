// data/interviewData.js
// Curated placement interview questions and answers organized by subject and category.

export const SUBJECT_CATEGORIES = {
  PROGRAMMING: 'Programming Languages',
  CORE_CS: 'Core Computer Science'
};

export const INTERVIEW_SUBJECTS = [
  // --- Programming Languages ---
  {
    id: 'c',
    name: 'C',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: '⚡',
    description: 'Pointers, memory management, preprocessors, structures, and low-level system concepts.',
    questions: [
      {
        id: 'c-1',
        q: 'What is a pointer in C and what are its main uses?',
        a: 'A pointer is a variable that stores the memory address of another variable rather than a direct value.\n\nKey uses:\n• Dynamic memory allocation (malloc, calloc, realloc)\n• Passing large data structures by reference to functions efficiently\n• Implementing data structures like Linked Lists, Trees, and Graphs\n• Accessing hardware memory addresses and system buffers',
        code: 'int x = 10;\nint *ptr = &x; // ptr stores the address of x\nprintf("Value: %d, Address: %p", *ptr, ptr);',
        keywords: ['pointer', 'memory', 'address', 'dereference', 'reference']
      },
      {
        id: 'c-2',
        q: 'Explain the difference between malloc() and calloc() in dynamic memory allocation.',
        a: '• malloc(size_t size): Allocates a single block of specified bytes of memory. It does NOT initialize memory, leaving garbage values.\n• calloc(size_t num, size_t size): Allocates memory for an array of elements and initializes all allocated bytes to zero (0).\n\nBoth functions return a void pointer (void*) pointing to the allocated memory, or NULL if allocation fails.',
        code: '// malloc: 5 integers with garbage values\nint *p1 = (int*) malloc(5 * sizeof(int));\n\n// calloc: 5 integers initialized to 0\nint *p2 = (int*) calloc(5, sizeof(int));',
        keywords: ['malloc', 'calloc', 'free', 'dynamic memory', 'allocation']
      },
      {
        id: 'c-3',
        q: 'What is a Dangling Pointer, Memory Leak, and Wild Pointer in C?',
        a: '• Dangling Pointer: A pointer that points to a memory location that has been deallocated (freed).\n• Memory Leak: Occurs when dynamically allocated heap memory is no longer needed but was never freed using free(), wasting system RAM.\n• Wild Pointer: An uninitialized pointer that points to an arbitrary random memory location.',
        code: 'int *ptr = (int*) malloc(sizeof(int));\nfree(ptr); // ptr is now a dangling pointer!\nptr = NULL; // Best practice: neutralize it to NULL',
        keywords: ['dangling pointer', 'memory leak', 'wild pointer', 'free', 'null']
      },
      {
        id: 'c-4',
        q: 'What is the difference between structure (struct) and union in C?',
        a: '• struct: Allocates separate memory for every member variable. Total size is greater than or equal to the sum of all members\' sizes.\n• union: All members share the same single memory location. Total size equals the size of its largest member variable. Only one member can hold a value at any given time.',
        code: 'struct Student { int id; char grade; }; // Size = 4 + 1 + padding ≈ 8 bytes\nunion Data { int id; char grade; };       // Size = max(4, 1) = 4 bytes',
        keywords: ['struct', 'union', 'memory layout', 'size']
      },
      {
        id: 'c-5',
        q: 'What is the purpose of the volatile keyword in C?',
        a: 'The "volatile" keyword informs the compiler that a variable\'s value can be changed unexpectedly at any time from outside the current program execution flow (e.g., by hardware interrupts or concurrent threads).\n\nIt prevents the compiler from optimizing out repeated reads of that variable from memory into CPU registers.',
        keywords: ['volatile', 'compiler optimization', 'registers', 'embedded']
      }
    ]
  },

  {
    id: 'cpp',
    name: 'C++',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: '💻',
    description: 'Object-oriented programming, STL containers, virtual functions, and memory management in C++.',
    questions: [
      {
        id: 'cpp-1',
        q: 'What are Virtual Functions and Virtual Method Tables (vtable) in C++?',
        a: 'A virtual function is a member function in a base class declared with the "virtual" keyword that can be overridden in a derived class to achieve Run-Time Polymorphism (Dynamic Dispatch).\n\nHow it works:\n• The compiler creates a vtable (virtual table) containing function pointers to the virtual functions for classes with virtual functions.\n• Each object contains a hidden pointer (vptr) pointing to its class\'s vtable. When a virtual function is called via a base pointer, the correct derived method is resolved at runtime.',
        code: 'class Base {\npublic:\n    virtual void show() { cout << "Base"; }\n};\nclass Derived : public Base {\npublic:\n    void show() override { cout << "Derived"; }\n};\n\nBase* b = new Derived();\nb->show(); // Output: "Derived" (resolved dynamically)',
        keywords: ['virtual', 'polymorphism', 'vtable', 'vptr', 'dynamic binding', 'override']
      },
      {
        id: 'cpp-2',
        q: 'Why should a base class destructor always be declared virtual?',
        a: 'If a derived class object is deleted through a pointer to the base class, and the base class destructor is NOT virtual, only the base class destructor will be invoked.\n\nThis leads to undefined behavior and Memory Leaks because resources allocated by the derived class constructor will never be freed.',
        code: 'class Base {\npublic:\n    virtual ~Base() { cout << "Base destroyed"; }\n};',
        keywords: ['virtual destructor', 'memory leak', 'cleanup', 'delete']
      },
      {
        id: 'cpp-3',
        q: 'What are the main containers in the C++ Standard Template Library (STL)?',
        a: '1. Sequence Containers:\n   • vector: Dynamic contiguous array with O(1) amortized append.\n   • list: Doubly linked list with O(1) insertions/deletions anywhere.\n   • deque: Double-ended queue allowing O(1) insertion at both ends.\n\n2. Associative Containers (Sorted - Red-Black Tree):\n   • set / map: Unique keys, self-balancing BST, O(log N) lookup.\n\n3. Unordered Containers (Hash Tables):\n   • unordered_map / unordered_set: O(1) average lookup.\n\n4. Container Adapters:\n   • stack (LIFO), queue (FIFO), priority_queue (Max-Heap by default).',
        keywords: ['stl', 'vector', 'map', 'unordered_map', 'stack', 'queue', 'priority_queue']
      },
      {
        id: 'cpp-4',
        q: 'Explain the difference between Pass by Value, Pass by Reference, and Pass by Pointer.',
        a: '• Pass by Value: A copy of the argument is passed. Modifications inside the function do NOT affect the caller. Incurs copying overhead for large objects.\n• Pass by Reference (&): An alias to the original variable is passed. No copying occurs. Modifications directly alter the original caller variable.\n• Pass by Pointer (*): The memory address is passed. Requires explicit dereferencing (*p) and can be NULL.',
        code: 'void byVal(int x) { x = 20; }\nvoid byRef(int &x) { x = 20; }   // Preferred for efficiency\nvoid byPtr(int *x) { if(x) *x = 20; }',
        keywords: ['pass by value', 'pass by reference', 'pointers', 'functions']
      },
      {
        id: 'cpp-5',
        q: 'What is RAII (Resource Acquisition Is Initialization) in C++?',
        a: 'RAII is a fundamental C++ idiom where resource allocation (memory, file handles, socket, mutex locks) is tied to object lifetime.\n\n• The resource is acquired in the constructor.\n• The resource is automatically released in the destructor when the object goes out of scope.\n\nExamples: std::unique_ptr, std::shared_ptr, std::lock_guard.',
        keywords: ['raii', 'smart pointers', 'unique_ptr', 'shared_ptr', 'destructor']
      }
    ]
  },

  {
    id: 'java',
    name: 'Java',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: '☕',
    description: 'JVM architecture, memory model, multithreading, collections, and core Java concepts.',
    questions: [
      {
        id: 'java-1',
        q: 'Explain the difference between JDK, JRE, and JVM.',
        a: '• JVM (Java Virtual Machine): The runtime engine that executes compiled Java bytecode (.class files) line-by-line using JIT compilation. It is platform-dependent.\n• JRE (Java Runtime Environment): Contains the JVM + core class libraries needed to RUN Java applications.\n• JDK (Java Development Kit): Complete software development package containing JRE + development tools (compiler javac, debugger, jar utility).',
        keywords: ['jdk', 'jre', 'jvm', 'bytecode', 'jit', 'platform independent']
      },
      {
        id: 'java-2',
        q: 'Why is Java considered "Platform Independent"?',
        a: 'Java follows the "Write Once, Run Anywhere" (WORA) philosophy. When you compile Java code (.java), it compiles into intermediate bytecode (.class), NOT machine-native assembly.\n\nAny computer that has a JVM installed for its specific operating system (Windows, Linux, macOS) can execute this same bytecode.',
        keywords: ['platform independence', 'bytecode', 'wora', 'jvm']
      },
      {
        id: 'java-3',
        q: 'What is Garbage Collection in Java and how does it work?',
        a: 'Garbage Collection (GC) is the automated memory management process in the JVM that finds and reclaims heap memory occupied by unreferenced objects.\n\nKey Concepts:\n• Objects are eligible for GC when they are no longer reachable from any live thread reference.\n• The JVM Heap is divided into Young Generation (Eden, S0, S1) and Old (Tenured) Generation.\n• System.gc() requests garbage collection, but execution is not guaranteed immediately.',
        keywords: ['garbage collection', 'heap', 'memory management', 'eden', 'tenured']
      },
      {
        id: 'java-4',
        q: 'What is the difference between HashMap and ConcurrentHashMap?',
        a: '• HashMap: Not thread-safe. Allows one null key and multiple null values. Fast in single-threaded environments.\n• ConcurrentHashMap: Thread-safe designed for concurrent multi-threaded environments. Uses lock striping (segment locking in older versions, node-level CAS/synchronized in Java 8+) so multiple threads can read/write concurrently without locking the entire map.\n• Does NOT allow null keys or null values.',
        keywords: ['hashmap', 'concurrenthashmap', 'thread safety', 'concurrency', 'collections']
      },
      {
        id: 'java-5',
        q: 'What is the difference between "==" and ".equals()" in Java?',
        a: '• "==" (Reference equality): Checks whether two object references point to the exact same physical memory address in the heap.\n• ".equals()" (Content equality): A method defined in the Object class that evaluates logical value equality. Classes like String and Integer override .equals() to compare characters/numbers rather than memory addresses.',
        code: 'String s1 = new String("hello");\nString s2 = new String("hello");\nSystem.out.println(s1 == s2);      // false (different heap addresses)\nSystem.out.println(s1.equals(s2));  // true  (same characters)',
        keywords: ['equals', 'equality', 'string pool', 'references']
      }
    ]
  },

  {
    id: 'python',
    name: 'Python',
    category: SUBJECT_CATEGORIES.PROGRAMMING,
    icon: '🐍',
    description: 'GIL, memory management, list comprehensions, decorators, generators, and data structures.',
    questions: [
      {
        id: 'python-1',
        q: 'What is the Global Interpreter Lock (GIL) in Python?',
        a: 'The GIL is a mutex (lock) used by CPython (the standard Python interpreter) to ensure that only one native CPU thread executes Python bytecode at any given time.\n\nImplications:\n• Even on multi-core processors, CPU-bound multi-threading cannot achieve true CPU parallelism.\n• For I/O-bound tasks (network requests, disk access), multi-threading works well because threads release the GIL during I/O wait.\n• For CPU-bound tasks, use the "multiprocessing" module to create separate OS processes with separate GILs.',
        keywords: ['gil', 'global interpreter lock', 'multithreading', 'multiprocessing', 'concurrency']
      },
      {
        id: 'python-2',
        q: 'What is the difference between Lists and Tuples in Python?',
        a: '• List: Mutable (items can be modified, appended, removed). Uses square brackets []. Slightly higher memory overhead.\n• Tuple: Immutable (once created, cannot be altered). Uses parentheses (). More memory-efficient and faster. Can be used as dictionary keys if all elements are hashable.',
        code: 'my_list = [1, 2, 3]\nmy_list[0] = 99 # Allowed\n\nmy_tuple = (1, 2, 3)\n# my_tuple[0] = 99 -> TypeError: \'tuple\' object does not support item assignment',
        keywords: ['list', 'tuple', 'mutable', 'immutable']
      },
      {
        id: 'python-3',
        q: 'What are Python Generators and the "yield" keyword?',
        a: 'A generator is a function that returns an iterator object producing a sequence of values lazily on-demand using the "yield" keyword.\n\nWhy use generators?\n• Memory Efficiency: Instead of storing millions of items in RAM all at once (like a list), a generator computes one item at a time only when requested (Lazy Evaluation).\n• The function state, local variables, and execution position are paused between yield calls.',
        code: 'def count_up(n):\n    val = 1\n    while val <= n:\n        yield val\n        val += 1\n\nfor num in count_up(3):\n    print(num) # Prints 1, 2, 3 lazily',
        keywords: ['generator', 'yield', 'lazy evaluation', 'iterator', 'memory']
      },
      {
        id: 'python-4',
        q: 'What are Decorators in Python and how do they work?',
        a: 'A decorator is a function that accepts another function as an argument, extends or modifies its behavior without altering its source code, and returns the modified function.\n\nCommon uses: Logging, authentication checks, caching/memoization, measuring execution time.',
        code: 'def log_decorator(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling function: {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_decorator\ndef greet(name):\n    print(f"Hello, {name}!")',
        keywords: ['decorator', 'wrapper', 'higher-order function', 'metaprogramming']
      },
      {
        id: 'python-5',
        q: 'Explain shallow copy vs deep copy in Python.',
        a: '• Shallow Copy (copy.copy()): Creates a new collection object, but populates it with references to the child objects contained in the original. Changing a nested element impacts both.\n• Deep Copy (copy.deepcopy()): Recursively creates copies of all nested objects. The new object is completely detached from the original.',
        keywords: ['shallow copy', 'deep copy', 'copy module', 'references']
      }
    ]
  },

  // --- Core Computer Science ---
  {
    id: 'dbms',
    name: 'DBMS',
    category: SUBJECT_CATEGORIES.CORE_CS,
    icon: '🗄️',
    description: 'Relational databases, indexing, normalization, transaction management, and ACID properties.',
    questions: [
      {
        id: 'dbms-1',
        q: 'What are ACID properties in a database transaction?',
        a: 'ACID guarantees reliable processing of database transactions:\n\n• Atomicity ("All or Nothing"): Entire transaction completes successfully or is completely rolled back upon error.\n• Consistency: Database transitions only between valid states obeying all integrity constraints and schemas.\n• Isolation: Concurrent transactions execute independently without intermediate data leaking between them.\n• Durability: Once a transaction is committed, its changes survive system crashes or power failures.',
        keywords: ['acid', 'atomicity', 'consistency', 'isolation', 'durability', 'transaction']
      },
      {
        id: 'dbms-2',
        q: 'What is Database Normalization and what are 1NF, 2NF, 3NF, and BCNF?',
        a: 'Normalization is the process of structuring relational tables to reduce data redundancy and eliminate update, insertion, and deletion anomalies.\n\n• 1NF: Atomic values in columns; no repeating groups/arrays; unique column names.\n• 2NF: In 1NF + no Partial Dependency (every non-key attribute must fully depend on the primary key, not part of it).\n• 3NF: In 2NF + no Transitive Dependency (non-key attribute cannot determine another non-key attribute; X -> Y where Y is non-prime).\n• BCNF (Boyce-Codd NF): Strict 3NF where for every functional dependency X -> Y, X must be a super key.',
        keywords: ['normalization', '1nf', '2nf', '3nf', 'bcnf', 'functional dependency', 'anomaly']
      },
      {
        id: 'dbms-3',
        q: 'What is the difference between Clustered and Non-Clustered Indexes?',
        a: '• Clustered Index: Physically reorders the table rows on disk to match the index order. Only ONE clustered index can exist per table (usually created on the Primary Key).\n• Non-Clustered Index: Stored in a separate structure containing indexed column values and pointers (RowIDs) back to the actual data rows. Multiple non-clustered indexes can exist per table.',
        keywords: ['index', 'clustered index', 'non-clustered index', 'b-tree', 'performance']
      },
      {
        id: 'dbms-4',
        q: 'What is a Deadlock in DBMS and how is it resolved?',
        a: 'A deadlock occurs when two or more transactions are waiting indefinitely for locks held by each other, forming a circular wait.\n\nResolution Techniques:\n• Deadlock Detection: Wait-For Graphs (WFG). If a cycle is detected, one transaction is chosen as a "victim" and aborted/rolled back.\n• Deadlock Prevention: Timestamp ordering algorithms:\n  - Wait-Die (non-preemptive): Older transaction waits; younger dies.\n  - Wound-Wait (preemptive): Older wounds (aborts) younger; younger waits.',
        keywords: ['deadlock', 'wait-for graph', 'wait-die', 'wound-wait', 'concurrency']
      }
    ]
  },

  {
    id: 'sql',
    name: 'SQL',
    category: SUBJECT_CATEGORIES.CORE_CS,
    icon: '📊',
    description: 'SQL queries, joins, subqueries, grouping, aggregate functions, and window functions.',
    questions: [
      {
        id: 'sql-1',
        q: 'Explain the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.',
        a: '• INNER JOIN: Returns only rows that have matching values in both tables.\n• LEFT JOIN (Left Outer): Returns all rows from the left table, plus matched rows from the right table (NULL if no match).\n• RIGHT JOIN (Right Outer): Returns all rows from the right table, plus matched rows from the left table.\n• FULL OUTER JOIN: Returns all rows when there is a match in either left or right table.',
        code: 'SELECT e.name, d.dept_name\nFROM Employees e\nLEFT JOIN Departments d ON e.dept_id = d.id;',
        keywords: ['join', 'inner join', 'left join', 'right join', 'outer join']
      },
      {
        id: 'sql-2',
        q: 'What is the difference between WHERE and HAVING clauses in SQL?',
        a: '• WHERE clause: Filters individual rows BEFORE any grouping or aggregate functions take place. Cannot be used with aggregate functions (e.g. SUM, AVG, COUNT).\n• HAVING clause: Filters groups of rows AFTER the GROUP BY operation has been performed. Used directly with aggregate functions.',
        code: 'SELECT department, AVG(salary)\nFROM Employees\nWHERE salary > 30000        -- filters rows first\nGROUP BY department\nHAVING AVG(salary) > 60000; -- filters aggregated groups',
        keywords: ['where', 'having', 'group by', 'aggregate', 'filter']
      },
      {
        id: 'sql-3',
        q: 'How do you find the N-th highest salary in a table using SQL?',
        a: 'Method 1: Using DENSE_RANK() Window Function (Recommended):\nSELECT salary FROM (\n    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rnk\n    FROM Employees\n) WHERE rnk = N;\n\nMethod 2: Using LIMIT and OFFSET (MySQL/PostgreSQL for 2nd highest):\nSELECT DISTINCT salary FROM Employees\nORDER BY salary DESC LIMIT 1 OFFSET N-1;',
        code: '-- 2nd Highest Salary\nSELECT MAX(salary) FROM Employees\nWHERE salary < (SELECT MAX(salary) FROM Employees);',
        keywords: ['nth highest salary', 'dense_rank', 'window function', 'subquery', 'offset']
      },
      {
        id: 'sql-4',
        q: 'What is the difference between DELETE, TRUNCATE, and DROP?',
        a: '• DELETE: DML command. Deletes specific rows matching a WHERE clause. Slower because it logs each row deletion. Can be rolled back.\n• TRUNCATE: DDL command. Removes ALL rows from a table by deallocating pages. Faster than DELETE. Resets auto-increment identity. Cannot use WHERE clause.\n• DROP: DDL command. Completely destroys the table structure, constraints, indexes, and data permanently from the database schema.',
        keywords: ['delete', 'truncate', 'drop', 'ddl', 'dml', 'rollback']
      }
    ]
  },

  {
    id: 'oop',
    name: 'OOP',
    category: SUBJECT_CATEGORIES.CORE_CS,
    icon: '🧩',
    description: 'Object-Oriented Programming principles, design patterns, abstraction, and polymorphism.',
    questions: [
      {
        id: 'oop-1',
        q: 'Explain the 4 Core Pillars of Object-Oriented Programming (OOP).',
        a: '1. Encapsulation: Bundling data (attributes) and methods that operate on that data into a single unit (class) while restricting direct outside access via access specifiers (private/protected).\n2. Abstraction: Displaying only essential features of an object to the user while hiding internal implementation details.\n3. Inheritance: Mechanism where a child class acquires properties and behaviors from a parent class, promoting code reuse.\n4. Polymorphism: "Many forms" — ability of an entity to take different forms (Compile-time via Method Overloading; Run-time via Method Overriding).',
        keywords: ['encapsulation', 'abstraction', 'inheritance', 'polymorphism', 'pillars']
      },
      {
        id: 'oop-2',
        q: 'What is the difference between Method Overloading and Method Overriding?',
        a: '• Method Overloading (Compile-Time / Static Polymorphism):\n  - Multiple methods in the SAME class share the same name with different parameter signatures (type, number, or order of arguments).\n  - Resolved at compile time.\n\n• Method Overriding (Run-Time / Dynamic Polymorphism):\n  - A derived class provides a specific implementation of a method already defined in its base class with the EXACT same signature.\n  - Resolved at runtime using dynamic dispatch.',
        keywords: ['overloading', 'overriding', 'polymorphism', 'compile time', 'runtime']
      },
      {
        id: 'oop-3',
        q: 'What are the SOLID principles in software design?',
        a: '• S - Single Responsibility Principle (SRP): A class should have only one reason to change.\n• O - Open/Closed Principle (OCP): Software entities should be open for extension, but closed for modification.\n• L - Liskov Substitution Principle (LSP): Subtypes must be substitutable for their base types without altering correctness.\n• I - Interface Segregation Principle (ISP): Clients should not be forced to depend upon interfaces they do not use.\n• D - Dependency Inversion Principle (DIP): High-level modules should depend on abstractions, not concrete implementations.',
        keywords: ['solid', 'srp', 'ocp', 'lsp', 'isp', 'dip', 'design principles']
      },
      {
        id: 'oop-4',
        q: 'What is the difference between Composition and Inheritance ("Has-a" vs "Is-a")?',
        a: '• Inheritance ("Is-a"): A Dog IS-A Animal. Tightly couples the subclass to parent implementation details.\n• Composition ("Has-a"): A Car HAS-A Engine. The object contains an instance of another class as a member variable.\n\nDesign Rule: "Favor composition over inheritance" because composition provides greater flexibility and loose coupling at runtime.',
        keywords: ['composition', 'inheritance', 'has-a', 'is-a', 'coupling']
      }
    ]
  },

  {
    id: 'os',
    name: 'Operating Systems',
    category: SUBJECT_CATEGORIES.CORE_CS,
    icon: '⚙️',
    description: 'Process scheduling, virtual memory, paging, deadlocks, CPU scheduling, and synchronization.',
    questions: [
      {
        id: 'os-1',
        q: 'What is the difference between a Process and a Thread?',
        a: '• Process: An executing instance of a program in memory. Has its own separate address space, text, data, and open file descriptors. Creating or switching processes incurs heavy OS overhead.\n• Thread: A lightweight unit of execution within a process. Multiple threads share the same process memory address space and resources, but maintain separate stacks, registers, and program counters. Much faster context switching.',
        keywords: ['process', 'thread', 'context switch', 'concurrency', 'multithreading']
      },
      {
        id: 'os-2',
        q: 'What are the 4 Coffman conditions required for a Deadlock to occur?',
        a: 'A deadlock can occur if and only if all four conditions hold simultaneously:\n\n1. Mutual Exclusion: At least one resource must be held in a non-shareable mode.\n2. Hold and Wait: A process holding at least one resource is waiting to acquire additional resources held by other processes.\n3. No Preemption: Resources cannot be forcibly seized; only released voluntarily by the holding process.\n4. Circular Wait: A closed chain of processes exists where each process waits for a resource held by the next process in the cycle.',
        keywords: ['deadlock', 'coffman conditions', 'mutual exclusion', 'circular wait', 'hold and wait']
      },
      {
        id: 'os-3',
        q: 'What is Virtual Memory, Paging, and Thrashing?',
        a: '• Virtual Memory: A memory management technique creating an illusion of large continuous physical memory by utilizing disk swap space.\n• Paging: Memory scheme where physical memory is broken into fixed-size frames and logical memory into pages of the same size, mapped via a Page Table.\n• Thrashing: A severe state where the CPU spends more time swapping pages in and out of disk than executing instructions, caused by insufficient physical RAM.',
        keywords: ['virtual memory', 'paging', 'page fault', 'thrashing', 'page table']
      },
      {
        id: 'os-4',
        q: 'What is the difference between Preemptive and Non-Preemptive CPU Scheduling?',
        a: '• Preemptive: The CPU can be forcibly taken away from a running process (e.g. Round Robin, Shortest Remaining Time First (SRTF), Priority Preemptive) when higher priority tasks arrive or time slices expire.\n• Non-Preemptive: Once the CPU is allocated to a process, it holds the CPU until it terminates or switches to a waiting state (e.g. First-Come-First-Served (FCFS), Shortest Job First (SJF)).',
        keywords: ['cpu scheduling', 'preemptive', 'non-preemptive', 'round robin', 'fcfs', 'sjf']
      }
    ]
  },

  {
    id: 'cn',
    name: 'Computer Networks',
    category: SUBJECT_CATEGORIES.CORE_CS,
    icon: '🌐',
    description: 'OSI and TCP/IP models, TCP vs UDP, DNS, HTTP/HTTPS, routing, and sockets.',
    questions: [
      {
        id: 'cn-1',
        q: 'Compare TCP (Transmission Control Protocol) and UDP (User Datagram Protocol).',
        a: '• TCP:\n  - Connection-oriented (established via 3-way handshake: SYN -> SYN-ACK -> ACK).\n  - Reliable: Guarantees packet delivery, retransmits lost packets, preserves sequencing, handles flow control and congestion control.\n  - Slower overhead. Used in HTTP/HTTPS, FTP, SMTP, SSH.\n\n• UDP:\n  - Connectionless: No handshake or state tracking.\n  - Unreliable: Packets are sent without acknowledgment or ordering guarantee.\n  - Lightweight and fast. Used in video streaming, VoIP, multiplayer gaming, DNS lookups.',
        keywords: ['tcp', 'udp', '3-way handshake', 'transport layer', 'reliable', 'packets']
      },
      {
        id: 'cn-2',
        q: 'What happens behind the scenes when you type a URL in a browser and hit Enter?',
        a: '1. Cache Check: Browser checks browser cache, OS cache, and router cache for DNS record.\n2. DNS Resolution: Resolves hostname to an IP address via recursive DNS resolver, root server, TLD server, and authoritative server.\n3. TCP Handshake: Client establishes connection with server using 3-Way Handshake (SYN, SYN-ACK, ACK).\n4. TLS Handshake: If HTTPS, certificates are exchanged to establish encrypted symmetric session keys.\n5. HTTP Request: Browser sends an HTTP GET request to the web server.\n6. Server Response: Web server processes request and returns HTTP status code (e.g. 200 OK) + payload (HTML, CSS, JS).\n7. DOM Parsing: Browser parses HTML, builds DOM tree, requests linked assets, and renders the webpage.',
        keywords: ['dns lookup', 'url', 'tls handshake', 'http get', 'rendering', 'dom']
      },
      {
        id: 'cn-3',
        q: 'What are the 7 Layers of the OSI Model and their responsibilities?',
        a: 'From Layer 7 to Layer 1:\n7. Application: User interface & network applications (HTTP, FTP, DNS, SMTP).\n6. Presentation: Data translation, encryption, compression (SSL/TLS, JPEG, ASCII).\n5. Session: Establishes, manages, and terminates sessions (RPC, NetBIOS).\n4. Transport: End-to-end data transfer, segmentation, flow/error control (TCP, UDP).\n3. Network: Logical addressing, packet routing, path determination (IP, ICMP, Routers).\n2. Data Link: Physical addressing (MAC), frames, error detection (Ethernet, Switches).\n1. Physical: Transmission of raw binary bitstreams over physical media (Cables, Hubs, Radio).',
        keywords: ['osi model', 'layers', 'application', 'transport', 'network', 'data link', 'physical']
      },
      {
        id: 'cn-4',
        q: 'What is the difference between HTTP and HTTPS? How does SSL/TLS work?',
        a: '• HTTP (Hypertext Transfer Protocol): Transmits data over port 80 in plain-text, making it vulnerable to eavesdropping and Man-in-the-Middle (MitM) attacks.\n• HTTPS (HTTP Secure): Encrypts communication over port 443 using SSL/TLS.\n\nHow SSL/TLS works:\n1. Asymmetric Encryption is used during the handshake to authenticate the server\'s SSL Certificate and securely exchange a shared secret key.\n2. Symmetric Encryption (AES) uses this shared secret key to encrypt all subsequent application data exchange efficiently.',
        keywords: ['http', 'https', 'ssl', 'tls', 'encryption', 'certificate', 'security']
      }
    ]
  }
];
