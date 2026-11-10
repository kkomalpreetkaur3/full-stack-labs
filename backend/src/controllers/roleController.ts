import type { Request, Response } from 'express'
import { roleService } from '../services/roleService'

export const roleController = {
    getRoles(_req: Request, res: Response) {
        const roles = roleService.getRoles()
        res.status(200).json(roles)
    },

    createRole(req: Request, res: Response) {
        const result = roleService.createRole(req.body)

        if (!result.success) {
            res.status(400).json(result)
            return
        }

        res.status(201).json(result)
    }
}