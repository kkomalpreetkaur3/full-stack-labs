import type { Role } from '../types/Role'
import rolesData from '../data/roles.json'

let roles: Role[] = [...rolesData]

export const roleRepository = {
    getRoles(): Role[] {
        return [...roles]
    },

    getRole(roleName: string): Role | undefined {
        return roles.find(
            person =>
                person.role.toLowerCase() === roleName.toLowerCase()
        )
    },

    createRole(person: Role): Role {
        roles.push(person)
        return person
    },

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