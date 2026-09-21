import type { Role } from '../types/Role'
import rolesData from '../data/roles.json'

export function Organization() {
    const roles: Role[] = rolesData

    return (
        <main>
            <h2>Organization</h2>
            {roles.map(person => (
                <p className="organization-row" key={`${person.firstName}-${person.lastName}`}>
                    <span>{person.firstName} {person.lastName}</span>
                    <span>{person.role}</span>
                </p>
            ))}
        </main>
    )
}