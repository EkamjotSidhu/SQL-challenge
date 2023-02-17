const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require('console.table')
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'management_db'
    },
    console.log(`Connected to the management_db database.`)
);
const startApp = () => {

    return inquirer.prompt(
        [{
            type: "list",
            choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department", "Exit"],
            name: "option"
        }]
    )
        .then(({ option }) => {

            switch (option) {
                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Update employee role':
                    updateEmployee();
                    break;

                case 'Exit':
                    console.log('Exiting application');
                    exit()
                    break;
            }
        })
}
startApp()

const viewDepartments = () => {
    db.query("SELECT * FROM department", (err, results) => {
        console.table(results)
        startApp()
    })
}
const viewEmployees = () => {
    db.query("SELECT employee.first_name, employee.last_name, role.title AS role, role.salary FROM employee JOIN role ON employee.role_id = role.id", (err, results) => {
        console.table(results)
        startApp()
    })
}
const viewRoles = () => {
    db.query("SELECT title, salary FROM role", (err, results) => {
        console.table(results)
        startApp()
    })
}

const addEmployee = () => {
    return inquirer.prompt([

        {
            type: 'input',
            message: 'Enter first name: ',
            name: 'first_name'
        },
        {
            type: 'input',
            message: 'Enter last name: ',
            name: 'last_name'
        },
        {
            type: 'input',
            message: 'Enter role id: ',
            name: 'role_id'
        },
        {
            type: 'input',
            message: 'Enter manager id: ',
            name: 'manager_id'
        }])
        .then(({ first_name, last_name, role_id, manager_id }) => {
            db.query(`INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES('${first_name}','${last_name}',${role_id},${manager_id})`), (err, results) => {
                if (err) {
                    console.log(err)
                } else {
                    console.table(results)

                }
            }
            startApp();
        })

}

const updateEmployee = () => {
    db.query('SELECT employee.first_name AS name,role.title AS role FROM role JOIN employee ON role.id=employee.role_id; ', (err, results) => {
        availableChoices = []

        for (var result of results) {
            availableChoices.push(result.name)

        }

        return inquirer.prompt([
            {
                type: "list",
                choices: availableChoices,
                name: "Choose_employee"

            }, {
                type: "list",
                choices: ["Technician", "Engineer", "Sales Tech", "Inspector"],
                name: "Choose_role"
            }
        ]).then(({ Choose_employee, Choose_role }) => {
            if (Choose_role === "Technician") {
                db.query(`UPDATE employee SET role_id=1 WHERE employee.first_name="${Choose_employee}"`, (err, res) => {
                    db.query("SELECT employee.first_name, employee.last_name, role.title AS role, role.salary FROM employee JOIN role ON employee.role_id = role.id", (err, results) => {
                        console.table(results)
                    })
                    startApp();
                })
            }
            if (Choose_role === "Engineer") {
                db.query(`UPDATE employee SET role_id=2 WHERE employee.first_name="${Choose_employee}"`, (err, res) => {
                    db.query("SELECT employee.first_name, employee.last_name, role.title AS role, role.salary FROM employee JOIN role ON employee.role_id = role.id", (err, results) => {
                        console.table(results)
                    })
                    startApp();
                })
            }
            if (Choose_role === "Sales Tech") {
                db.query(`UPDATE employee SET role_id=3 WHERE employee.first_name="${Choose_employee}"`, (err, res) => {
                    db.query("SELECT employee.first_name, employee.last_name, role.title AS role, role.salary FROM employee JOIN role ON employee.role_id = role.id", (err, results) => {
                        console.table(results)
                    })
                    startApp();
                })
            }
            if (Choose_role === "Inspector") {
                db.query(`UPDATE employee SET role_id=4 WHERE employee.first_name="${Choose_employee}"`, (err, res) => {
                    db.query("SELECT employee.first_name, employee.last_name, role.title AS role, role.salary FROM employee JOIN role ON employee.role_id = role.id", (err, results) => {
                        console.table(results)
                    })
                    startApp();
                })
            }

        })

    })

}

const addRole = () => {
    return inquirer.prompt([{
        type: 'input',
        name: 'roleName',
        message: 'Please enter the role',

    },
    {
        type: 'input',
        name: 'salary',
        message: 'Please eneter the Salary',

    },
    {
        type: 'input',
        name: 'departmentId',
        message: 'Please enter the Id of the Department',

    }
    ])
        .then(add => {
            db.query('INSERT INTO role(title,salary,department_id) VALUES(?,?,?)', [add.roleName, add.salary, add.departmentId], (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query("SELECT title, salary FROM role", (err, res) => {
                        console.table(res)
                    })
                }
            })

            startApp();
        })
}


const addDepartment = () => {

    return inquirer.prompt([{
        type: 'input',
        name: 'addDepartment',
        message: 'Add Name of the The Department',

    }])
        .then(add => {
            console.log(add)
            db.query(`INSERT INTO department (name) VALUES ('${add.addDepartment}')`, (err, result) => {
                if (err) {
                    console.log(err);
                } else {
                    db.query("SELECT * FROM department", (err, res) => {
                        console.table(res)
                    })
                }
            })
            startApp()
        })

}
const exit = () => {
    return inquirer.prompt([{
        type: 'confirm',
        name: 'exit',
        message: "Would you like to exit",
        default: true
    }])
        .then(exitNow => {
            if (exitNow.exit === true) {
                console.log('Thank You');
            } else {
                startApp;
            }
        })
}

