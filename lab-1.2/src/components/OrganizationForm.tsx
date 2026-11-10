import type { SubmitEvent } from 'react'
import type { Role } from '../types/Role'
import { useFormInput } from '../hooks/useFormInput'
import { organizationService } from '../services/organizationService'

interface OrganizationFormProps {
    onAddRole: (person: Role) => void
}

export function OrganizationForm({ onAddRole }: OrganizationFormProps) {
    const firstName = useFormInput('')
    const lastName = useFormInput('')
    const role = useFormInput('')

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()

        const person: Role = {
            firstName: firstName.value,
            lastName: lastName.value,
            role: role.value
        }

        try {
            const result = await organizationService.createRole(person)

            firstName.validate(() => result.errors.firstName)
            lastName.validate(() => result.errors.lastName)
            role.validate(() => result.errors.role)

            if (!result.success || !result.person) {
                return
            }

            onAddRole(result.person)

            firstName.reset()
            lastName.reset()
            role.reset()
        } catch (error) {
            console.error('Failed to create organization role:', error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Organization Role</h2>

            <label htmlFor="roleFirstName">First Name:</label>
            <input
                type="text"
                id="roleFirstName"
                value={firstName.value}
                onChange={(event) => firstName.setValue(event.target.value)}
            />

            {firstName.messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

            <label htmlFor="roleLastName">Last Name:</label>
            <input
                type="text"
                id="roleLastName"
                value={lastName.value}
                onChange={(event) => lastName.setValue(event.target.value)}
            />

            {lastName.messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

            <label htmlFor="roleName">Role:</label>
            <input
                type="text"
                id="roleName"
                value={role.value}
                onChange={(event) => role.setValue(event.target.value)}
            />

            {role.messages.map((message, index) => (
                <p key={index}>{message}</p>
            ))}

            <button type="submit">Add Role</button>
        </form>
    )
}