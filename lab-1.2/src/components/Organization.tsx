import { useState } from 'react'
import type { Role } from '../types/Role'
import { organizationService } from '../services/organizationService'
import { OrganizationForm } from './OrganizationForm'

export function Organization() {
    // Get organization records through the service
    const [roles, setRoles] = useState<Role[]>(
        () => organizationService.getRoles()
    )

    // Update the displayed list when a new role is created
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