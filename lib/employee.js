/*The first class is an Employee parent class with the following properties and methods:

name,id,email,getName(),getId(),getEmail(),getRole()—returns 'Employee'*/


class Employee{
    constructor(name, id, email){
        this.name = name;
        this.id = id;
        this.email = email
    }
    getName(){
        return this.name
    }

    getEmail(){
        return this.email
    }

    getRole(){
        //returns 'Employee'
        return 'Employee'
    }
    getId(){
        return this.id
    }
}

module.exports = Employee;
