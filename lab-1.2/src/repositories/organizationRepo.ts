import type { Role } from '../types/Role'
import rolesData from '../data/roles.json'

let roles: Role[] = [...rolesData]

export const organizationRepo = {
    // Get all organization records
    getRoles(): Role[] {
        return [...roles]
    },

    // Find a person by their role
    getRole(roleName: string): Role | undefined {
        return roles.find(
            person =>
                person.role.toLowerCase() === roleName.toLowerCase()
        )
    },

    // Add a new person with a role
    createRole(person: Role): Role {
        roles.push(person)
        return person
    },

    // Update an existing organization record
    updateRole(oldRoleName: string, updatedPerson: Role): boolean {
        const index = roles.findIndex(
            person =>
                person.role.toLowerCase() === oldRoleName.toLowerCase()
        )

        if (index === -1) {
            return false
        }

        roles[index] = updatedPerson
        return true
    },

    // Delete an organization record
    deleteRole(roleName: string): boolean {
        const index = roles.findIndex(
            person =>
                person.role.toLowerCase() === roleName.toLowerCase()
        )

        if (index === -1) {
            return false
        }

        roles.splice(index, 1)
        return true
    }
}