const express= require('express');

//using express and routes
const app = express();
const employeeRoute = express.Router();

//employee module which is required and imported
let employeeModel = require('../Model/Employee');

//to get list of employees
employeeRoute.route('/').get(function(req,res){
    employeeModel.find(function(err,employee){
        if(err){
            console.log(err);
        }else{
            res.json(employee);
        }
    });
});

//to add a new employee
employeeRoute.route('/addEmployee').post(function(req,res){
    let employee = new employeeModel(req.body);
    employee.save()
    .then(result =>{
        res.status(200).json({'employee':'Employee added'})
    })
    .catch(err=>{
        res.status(400).send("Something went wrong...")
    });
});

//To get employee details by id
employeeRoute.route('/editEmployee/:id').get(function(req,res){
    let id = req.params.id;
    employeeModel.findById(id, function(err,employee){
        res.json(employee);
    });
});

//To update employee details
employeeRoute.route('/updateEmployee/:id').patch(function(req,res){
    employeeModel.findById(req.params.id, function(err,employee){
        if(!employee){
            return next(new Error('Unable to find employee with this id'))
        }else{
            employee.firstName = req.body.firstName;
            employee.lastName = req.body.lastName;
            employee.email = req.body.email;
            employee.phone = req.body.phone;
            employee.save().then(emp=>{
                res.json("Updated!!!");
            }).catch(err=>{
                res.status(400).send("Not Found");
            });
        
        }
    });
});

//delete employee
employeeRoute.route('/deleteEmployee/:id').delete(function(req,res){
    employeeModel.findByIdAndRemove({_id:req.params.id},function(err,employee){
        if(err){
            res.json(err);
        }else{
            res.json("Employee Deleted");
        }
    });
});

module.exports = employeeRoute;