import type { Role } from '../types/Role'
import { organizationRepo } from '../repositories/organizationRepo'

export const organizationService = {

    // Get all organization records
    getRoles(): Role[] {
        return organizationRepo.getRoles()
    },

    // Validate and create a new organization record
    createRole(person: Role) {
        const errors = {
            firstName: [] as string[],
            lastName: [] as string[],
            role: [] as string[]
        }

        // First name must have at least 3 characters
        if (person.firstName.trim().length < 3) {
            errors.firstName.push(
                'First name must be at least 3 characters.'
            )
        }

        // Role cannot be empty
        if (person.role.trim().length === 0) {
            errors.role.push('Role is required.')
        } else {
            // Check whether the role is already occupied
            const existingRole = organizationRepo.getRole(
                person.role.trim()
            )

            if (existingRole) {
                errors.role.push(
                    'This role is already occupied.'
                )
            }
        }

        // Check for validation errors
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

        // Save the new organization record
        const newPerson = organizationRepo.createRole({
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