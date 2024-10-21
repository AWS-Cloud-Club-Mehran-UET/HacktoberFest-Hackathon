document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authContainer = document.getElementById('authContainer');
    const mainDashboard = document.getElementById('mainDashboard');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    const incomeAmountInput = document.getElementById('incomeAmount');
    const incomeSourceInput = document.getElementById('incomeSource');
    const incomeDateInput = document.getElementById('incomeDate');
    const incomeList = document.getElementById('incomeList');

    const expenseAmountInput = document.getElementById('expenseAmount');
    const expenseCategoryInput = document.getElementById('expenseCategory');
    const expenseDescriptionInput = document.getElementById('expenseDescription');
    const expenseDateInput = document.getElementById('expenseDate');
    const expenseList = document.getElementById('expenseList');

    const addExpenseBtn = document.getElementById('addExpenseBtn');
    const updateExpenseBtn = document.getElementById('updateExpenseBtn');
    let editingExpense = null;  // To track the expense being edited

    // Function to check if a user exists
    function userExists(email) {
        return localStorage.getItem(email) !== null;
    }

    // Signup functionality
    signupBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (email && password) {
            if (userExists(email)) {
                alert('User already exists! Please log in.');
            } else {
                localStorage.setItem(email, password);
                alert('Signup successful! Please log in.');
                emailInput.value = '';
                passwordInput.value = '';
            }
        } else {
            alert('Please fill in both email and password.');
        }
    });

    // Login functionality
    loginBtn.addEventListener('click', () => {
        const email = emailInput.value;
        const password = passwordInput.value;

        if (email && password) {
            const storedPassword = localStorage.getItem(email);
            if (storedPassword === password) {
                authContainer.style.display = 'none';  // Hide login form
                mainDashboard.style.display = 'block'; // Show dashboard
            } else {
                alert('Invalid email or password.');
            }
        } else {
            alert('Please enter both email and password.');
        }
    });

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        authContainer.style.display = 'block';    // Show login form
        mainDashboard.style.display = 'none';     // Hide dashboard
        emailInput.value = '';
        passwordInput.value = '';
    });

    // Add income functionality
    document.getElementById('addIncomeBtn').addEventListener('click', () => {
        const amount = incomeAmountInput.value;
        const source = incomeSourceInput.value;
        const date = incomeDateInput.value;

        if (amount && source && date) {
            const listItem = document.createElement('li');
            listItem.textContent = `Amount: $${amount}, Source: ${source}, Date: ${date}`;
            incomeList.appendChild(listItem);

            incomeAmountInput.value = '';
            incomeSourceInput.value = '';
            incomeDateInput.value = '';
        } else {
            alert('Please fill in all fields for the income.');
        }
    });

    // Add expense functionality
    addExpenseBtn.addEventListener('click', () => {
        const amount = expenseAmountInput.value;
        const category = expenseCategoryInput.value;
        const description = expenseDescriptionInput.value;
        const date = expenseDateInput.value;

        if (amount && category && description && date) {
            const listItem = document.createElement('li');
            listItem.textContent = `Amount: $${amount}, Category: ${category}, Description: ${description}, Date: ${date}`;
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.addEventListener('click', () => editExpense(listItem));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => listItem.remove());

            listItem.appendChild(editBtn);
            listItem.appendChild(deleteBtn);
            expenseList.appendChild(listItem);

            clearExpenseInputs();
        } else {
            alert('Please fill in all fields for the expense.');
        }
    });

    // Edit expense functionality
    function editExpense(listItem) {
        const [amount, category, description, date] = listItem.textContent.split(',').map((item) => item.split(': ')[1]);
        
        expenseAmountInput.value = amount.replace('$', '');
        expenseCategoryInput.value = category;
        expenseDescriptionInput.value = description;
        expenseDateInput.value = date;

        addExpenseBtn.style.display = 'none';
        updateExpenseBtn.style.display = 'inline-block';

        editingExpense = listItem;
    }

    // Update expense functionality
    updateExpenseBtn.addEventListener('click', () => {
        if (editingExpense) {
            editingExpense.textContent = `Amount: $${expenseAmountInput.value}, Category: ${expenseCategoryInput.value}, Description: ${expenseDescriptionInput.value}, Date: ${expenseDateInput.value}`;
            clearExpenseInputs();
            editingExpense = null;

            addExpenseBtn.style.display = 'inline-block';
            updateExpenseBtn.style.display = 'none';
        }
    });

    // Clear expense inputs after add/edit
    function clearExpenseInputs() {
        expenseAmountInput.value = '';
        expenseCategoryInput.value = '';
        expenseDescriptionInput.value = '';
        expenseDateInput.value = '';
    }

    // Search expense functionality
    document.getElementById('searchBtn').addEventListener('click', () => {
        const keyword = document.getElementById('searchKeyword').value.toLowerCase();
        const fromDate = document.getElementById('searchFromDate').value;
        const toDate = document.getElementById('searchToDate').value;
        
        const expenses = Array.from(expenseList.children);
        expenses.forEach((expense) => {
            const text = expense.textContent.toLowerCase();
            const matchesKeyword = text.includes(keyword);
            const matchesDate = (!fromDate || new Date(fromDate) <= new Date(text)) && (!toDate || new Date(toDate) >= new Date(text));
            
            if (matchesKeyword && matchesDate) {
                expense.style.display = '';
            } else {
                expense.style.display = 'none';
            }
        });
    });
});
