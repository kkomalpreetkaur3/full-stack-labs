import type { Request, Response } from 'express'
import { employeeService } from '../services/employeeService'

export const employeeController = {
    getEmployees(_req: Request, res: Response) {
        const data = employeeService.getEmployeeData()
        res.status(200).json(data)
    },

    createEmployee(req: Request, res: Response) {
        const result = employeeService.createEmployee(req.body)

        if (!result.success) {
            res.status(400).json(result)
            return
        }

        res.status(201).json(result)
    }
}