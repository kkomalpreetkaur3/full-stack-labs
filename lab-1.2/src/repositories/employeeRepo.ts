import type { Employee } from '../types/Employee'
import employeesData from '../data/employees.json'

let employees: Employee[] = [...employeesData]

export const employeeRepo = {
    getEmployees(): Employee[] {
        return [...employees]
    },

    getDepartments(): string[] {
        return [...new Set(employees.map(employee => employee.department))]
    },

    createEmployee(employee: Employee): Employee {
        employees.push(employee)
        return employee
    },

    getEmployeesByDepartment(department: string): Employee[] {
        return employees.filter(employee => employee.department === department)
    }
}