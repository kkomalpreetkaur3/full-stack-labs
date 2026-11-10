import type { Employee } from '../types/Employee'
import { employeeRepository } from '../repositories/employeeRepository'

export const employeeService = {
    getEmployeeData() {
        return {
            employees: employeeRepository.getEmployees(),
            departments: employeeRepository.getDepartments()
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

        const departments = employeeRepository.getDepartments()

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

        const newEmployee = employeeRepository.createEmployee({
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