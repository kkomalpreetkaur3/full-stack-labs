import type { Employee } from '../types/Employee'

interface EmployeeDirectoryProps {
    employees: Employee[]
}

export function EmployeeDirectory({ employees }: EmployeeDirectoryProps) {
    const departments = [...new Set(employees.map(employee => employee.department))]
    
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