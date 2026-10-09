import type { SubmitEvent } from 'react'
import type { Employee } from '../types/Employee'
import { useFormInput } from '../hooks/useFormInput'
import { employeeService } from '../services/employeeService'

interface EmployeeFormProps {
    departments: string[]
    onAddEmployee: (employee: Employee) => void
}

export function EmployeeForm({ departments, onAddEmployee }: EmployeeFormProps) {
    const firstName = useFormInput('')
    const lastName = useFormInput('')
    const department = useFormInput(departments[0] ?? '')

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const employee: Employee = {
            firstName: firstName.value,
            lastName: lastName.value,
            department: department.value
        }

        // Service checks the employee information
        const result = employeeService.createEmployee(employee)

        // Hook updates the validation messages
        firstName.validate(() => result.errors.firstName)
        department.validate(() => result.errors.department)

        if (!result.success || !result.employee) {
            return
        }

        onAddEmployee(result.employee)

        firstName.reset()
        lastName.reset()
        department.setMessages([])
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Employee</h2>

            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                value={firstName.value}
                onChange={(event) => firstName.setValue(event.target.value)}
            />

            {firstName.messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                value={lastName.value}
                onChange={(event) => lastName.setValue(event.target.value)}
            />

            <label htmlFor="department">Department:</label>
            <select
                id="department"
                value={department.value}
                onChange={(event) => department.setValue(event.target.value)}
            >
                {departments.map((departmentName) => (
                    <option key={departmentName} value={departmentName}>
                        {departmentName}
                    </option>
                ))}
            </select>

            {department.messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

            <button type="submit">Add Employee</button>
        </form>
    )
}