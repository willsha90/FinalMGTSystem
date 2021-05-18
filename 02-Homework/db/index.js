const connect = require("./connect");

module.exports = {
    findAllEmployees: function(){
        return connect.query("select * from employee")
    },   
    findEachDpt: function(){
        return connect.query("select * from department")
    },
    findAllEmployeesByDepartment: function(department_id){
        return connect.query( "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",department_id)
    },
    findAllEmployeesByManager: function(manager_id){
        return connect.query("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",manager_id)
    },
    removeEmployee: function (employeeId){
        return connect.query("DELETE FROM employee WHERE id = ?", employeeId);
    },
    findAllRoles: function(){
        return connect.query("Select * FROM Role")
     }
}   


    

