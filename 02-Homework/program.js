const {
  prompt
} = require("inquirer");
const db = require("./db")
console.log(db);
// call directPrompts function
directPrompts()

async function directPrompts() {
  const {
    choice
  } = await prompt([{
    type: "list",
    name: "choice",
    message: "What would you like to do?",
    choices: [{
        name: "View All Employees",
        value: "VIEW_EMPLOYEES"
      },
      {
        name: "View Roles",
        value: "VIEW_ROLES"
      },
      {
        name: "View departments",
        value: "VIEW_DEPARTMENTS"
      },
      {
        name: "Add Employee",
        value: "ADD_EMPLOYEE"
      },
      {
        name: "Add role",
        value: "ADD_ROLE"
      },
      {
        name: "Add department",
        value: "ADD_DEPARTMENT"
      },

      {
        name: "Update Employee Role",
        value: "UPDATE_EMPLOYEE_ROLE"
      },

      {
        name: "Quit application",
        value: "quitApp"
      },


    ]
  }]);


  switch (choice) {
    case "VIEW_EMPLOYEES":
      return viewEmployees();

    case "VIEW_DEPARTMENTS":
      return viewDepartments();

    case "VIEW_ROLES":
      return viewRoles();

    case "ADD_EMPLOYEE":
      return addEmployee();

    case "ADD_DEPARTMENT":
      return addDepartment();

    case "ADD_ROLE":
      return addRole();

    case "UPDATE_EMPLOYEE_ROLE":
      return updateEmployeeRole();

    case "quitApp":
      return quit();
  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();

  console.log("\n");
  console.table(employees);

  directPrompts();
}

async function updateEmployeeRole() {
  const employees = await db.findAllEmployees();

  const employeeField = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const {
    employeeId
  } = await prompt([{
    type: "list",
    name: "employeeId",
    message: "Provide the preferred employees' role?",
    choices: employeeField
  }]);

  const roles = await db.findAllRoles();

  const roleField = roles.map(({
    id,
    title
  }) => ({
    name: title,
    value: id
  }));

  const {
    roleId
  } = await prompt([{
    type: "list",
    name: "roleId",
    message: "Please provide a role for the specific employee?",
    choices: roleField
  }]);

  await db.updateEmployeeRole(employeeId, roleId);

  console.log("Updated employee's role");

  directPrompts();
}

async function viewRoles() {
  const roles = await db.findAllRoles();

  console.log("\n");
  console.table(roles);

  directPrompts();
}
// Add new role function
async function addRole() {
  const departments = await db.findEachDpt();
  const dptField = departments.map(({
    id,
    name
  }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([{
      name: "title",
      message: "What is the role to be added?"
    },
    {
      name: "salary",
      message: "Preferred salary?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Please provide the relevant role for the department?",
      choices: dptField
    }
  ]);

  await db.createRole(role);
  console.log(` ${role.title} has been added`);
  directPrompts();
}

async function viewDepartments() {
  const departments = await db.findEachDpt();

  console.log("\n");
  console.table(departments);

  directPrompts();
}

// Add new department function
async function addDepartment() {
  const department = await prompt([{
    name: "name",
    message: "Please add the preferred name of the department."
  }]);
  await db.createDepartment(department);

  console.log(` ${department.name} has been added`);
  directPrompts();
}

// Add new employee function
async function addEmployee() {
  const roles = await db.findAllRoles();
  const employees = await db.findAllEmployees();

  const employee = await prompt([{
      name: "first_name",
      message: "First name?"
    },
    {
      name: "last_name",
      message: "Last name?"
    }
  ]);

  const roleField = roles.map(({
    id,
    title
  }) => ({
    name: title,
    value: id
  }));

  const {
    roleId
  } = await prompt({
    type: "list",
    name: "roleId",
    message: "Please provide the employees' role.",
    choices: roleField
  });

  employee.role_id = roleId;

  const managerField = employees.map(({
    id,
    first_name,
    last_name
  }) => ({
    name: `  ${first_name} ${last_name}`,
    value: id

  }));
  managerField.unshift({
    name: "None",
    value: null
  });

  const {
    managerId
  } = await prompt({
    type: "list",
    name: "managerId",
    message: "Please provide the employees manager.",
    choices: managerField
  });

  employee.manager_id = managerId;
  await db.createEmployee(employee);

  console.log(
    `${employee.first_name} ${employee.last_name} has been added`
  );

  directPrompts();
}
// END OF APPLICATION
function quit() {
  console.log(" Have a nice day!");
  process.exit();
}