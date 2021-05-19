const connect = require("./connect");

module.exports = {
    findAllEmployees: function(){
        return connect.query("select * from employee")
    },   
    findAllEmployeesByDepartment: function(department_id){
        return connect.query( "select employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",department_id)
    },
    findAllEmployeesByManager: function(manager_id){
        return connect.query("select employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",manager_id)
    },
    createEmployee: function (employee){
        return connect.query("Insert into employee set ?",employee);
    },
    createRole: function (role){
        return connect.query("Insert into role set ?",role);
    },
    createDepartment: function (department){
        return connect.query("Insert into department set ?",department);
    },
    findEachDpt: function(){
        return connect.query("select * from department")
    },

    findAllRoles: function(){
        return connect.query("Select * from role")
     },
    
     updateEmployeeRole: function(employeeId, roleId){
        return connect.query("Update employee set role_id = ? where id = ?",[roleId,employeeId])
     }
}   


    

