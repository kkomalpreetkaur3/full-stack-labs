import type { Role } from '../types/Role'

const API_URL = 'http://localhost:3000/api/roles'

export const organizationRepo = {
    async getRoles(): Promise<Role[]> {
        const response = await fetch(API_URL)

        if (!response.ok) {
            throw new Error('Failed to fetch organization roles.')
        }

        return response.json()
    },

    async createRole(person: Role) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(person)
        })

        return response.json()
    }
}