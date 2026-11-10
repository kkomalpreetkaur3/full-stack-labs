import type { Employee } from '../types/Employee'
import { employeeRepo } from '../repositories/employeeRepo'

export const employeeService = {
    async getEmployeeData() {
        const [employees, departments] = await Promise.all([
            employeeRepo.getEmployees(),
            employeeRepo.getDepartments()
        ])

        return {
            employees,
            departments
        }
    },

    async createEmployee(employee: Employee) {
        return await employeeRepo.createEmployee({
            ...employee,
            firstName: employee.firstName.trim(),
            lastName: employee.lastName.trim()
        })
    }
}