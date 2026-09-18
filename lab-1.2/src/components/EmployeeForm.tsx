import { useState, type SubmitEvent } from 'react'
import type { Employee } from '../types/Employee'

interface EmployeeFormProps {
    departments: string[]
    onAddEmployee: (employee: Employee) => void
}

export function EmployeeForm({ departments, onAddEmployee }: EmployeeFormProps) {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [department, setDepartment] = useState(departments[0] ?? '')
    const [validationMessage, setValidationMessage] = useState('')

    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        setValidationMessage('')
        
        if (firstName.trim().length < 3) {
            setValidationMessage('First name must be at least 3 characters.')
            return
        }

        onAddEmployee({
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            department: department
        })

        setFirstName('')
        setLastName('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Employee</h2>

            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
            />

            {validationMessage && <p>{validationMessage}</p>}

            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
            />

            <label htmlFor="department">Department:</label>
            <select
                id="department"
                value={department}
                onChange={(event) => setDepartment(event.target.value)}
            >
                {departments.map(department => (
                    <option key={department} value={department}>
                        {department}
                    </option>
                ))}
            </select>

            <button type="submit">Add Employee</button>
        </form>
    )
}