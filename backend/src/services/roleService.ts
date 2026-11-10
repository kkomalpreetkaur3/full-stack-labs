import type { Role } from '../types/Role'
import { roleRepository } from '../repositories/roleRepository'

export const roleService = {
    getRoles(): Role[] {
        return roleRepository.getRoles()
    },

    createRole(person: Role) {
        const errors = {
            firstName: [] as string[],
            lastName: [] as string[],
            role: [] as string[]
        }

        if (person.firstName.trim().length < 3) {
            errors.firstName.push(
                'First name must be at least 3 characters.'
            )
        }

        if (person.role.trim().length === 0) {
            errors.role.push('Role is required.')
        } else {
            const existingRole = roleRepository.getRole(
                person.role.trim()
            )

            if (existingRole) {
                errors.role.push(
                    'This role is already occupied.'
                )
            }
        }

        if (
            errors.firstName.length > 0 ||
            errors.lastName.length > 0 ||
            errors.role.length > 0
        ) {
            return {
                success: false,
                person: null,
                errors
            }
        }

        const newPerson = roleRepository.createRole({
            firstName: person.firstName.trim(),
            lastName: person.lastName.trim(),
            role: person.role.trim()
        })

        return {
            success: true,
            person: newPerson,
            errors
        }
    }
}