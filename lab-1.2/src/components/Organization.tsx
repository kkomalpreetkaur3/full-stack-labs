import { useEffect, useState } from 'react'
import type { Role } from '../types/Role'
import { organizationService } from '../services/organizationService'
import { OrganizationForm } from './OrganizationForm'

export function Organization() {
    const [roles, setRoles] = useState<Role[]>([])

    useEffect(() => {
        async function loadRoles() {
            try {
                const data = await organizationService.getRoles()
                setRoles(data)
            } catch (error) {
                console.error('Failed to load organization roles:', error)
            }
        }

        loadRoles()
    }, [])

    function addRole(person: Role) {
        setRoles(currentRoles => [...currentRoles, person])
    }

    return (
        <main>
            <h2>Organization</h2>

            {roles.map(person => (
                <p
                    className="organization-row"
                    key={person.role}
                >
                    <span>
                        {person.firstName} {person.lastName}
                    </span>
                    <span>{person.role}</span>
                </p>
            ))}

            <OrganizationForm onAddRole={addRole} />
        </main>
    )
}