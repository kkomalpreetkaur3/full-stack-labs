import type { Role } from '../types/Role'
import { organizationRepo } from '../repositories/organizationRepo'

export const organizationService = {
    async getRoles(): Promise<Role[]> {
        return await organizationRepo.getRoles()
    },

    async createRole(person: Role) {
        return await organizationRepo.createRole({
            firstName: person.firstName.trim(),
            lastName: person.lastName.trim(),
            role: person.role.trim()
        })
    }
}