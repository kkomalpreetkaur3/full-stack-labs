import type { Employee } from '../types/Employee'
import { employeeRepo } from '../repositories/employeeRepo'

export const employeeService = {
    getEmployeeData() {
        return {
            employees: employeeRepo.getEmployees(),
            departments: employeeRepo.getDepartments()
        }
    },

    createEmployee(employee: Employee) {
        const errors = {
            firstName: [] as string[],
            department: [] as string[]
        }

        if (employee.firstName.trim().length < 3) {
            errors.firstName.push(
                'First name must be at least 3 characters.'
            )
        }

        const departments = employeeRepo.getDepartments()

        if (!departments.includes(employee.department)) {
            errors.department.push(
                'Please select a valid department.'
            )
        }

        if (
            errors.firstName.length > 0 ||
            errors.department.length > 0
        ) {
            return {
                success: false,
                employee: null,
                errors
            }
        }

        const newEmployee = employeeRepo.createEmployee({
            ...employee,
            firstName: employee.firstName.trim(),
            lastName: employee.lastName.trim()
        })

        return {
            success: true,
            employee: newEmployee,
            errors
        }
    }
}