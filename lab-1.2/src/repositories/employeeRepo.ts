import type { Employee } from '../types/Employee'

const API_URL = 'http://localhost:3000/api/employees'

export const employeeRepo = {
    async getEmployees(): Promise<Employee[]> {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error('Failed to fetch employees.')
        }

        const data = await response.json()
        return data.employees
    },

    async getDepartments(): Promise<string[]> {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error('Failed to fetch departments.')
        }

        const data = await response.json()
        return data.departments
    },

    async createEmployee(employee: Employee) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        })

        return response.json()
    }
}