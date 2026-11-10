import { Router } from 'express'
import { employeeController } from '../controllers/employeeController'

const router = Router()

router.get('/', employeeController.getEmployees)
router.post('/', employeeController.createEmployee)

export default router