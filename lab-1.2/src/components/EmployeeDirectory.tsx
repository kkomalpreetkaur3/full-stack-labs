import type { Employee } from '../types/Employee'
import employeesData from '../data/employees.json'

const employees: Employee[] = employeesData
const departments = [...new Set(employees.map(employee => employee.department))]

export function EmployeeDirectory() {
    return (
    <main>
        {departments.map(department => (
            <section key={department}>
                <h2>{department}</h2>
                <ul>
                    {employees
                        .filter(employee => employee.department === department)
                        .map(employee => (
                            <li key={`${employee.firstName}-${employee.lastName}`}>
                                {employee.firstName} {employee.lastName}
                            </li>
                        ))
                    }
               </ul>
            </section>
        ))}
    </main>
)
}