import { useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { EmployeeDirectory } from './components/EmployeeDirectory'
import { EmployeeForm } from './components/EmployeeForm'
import type { Employee } from './types/Employee'
import employeesData from './data/employees.json'

function App() {
  const [employees, setEmployees] = useState<Employee[]>(employeesData)
  const departments = [...new Set(employees.map(employee => employee.department))]
  
  function addEmployee(employee: Employee) {
    setEmployees(currentEmployees => [...currentEmployees, employee])
  }

  return (
    <>
      <Header/>
      <EmployeeDirectory employees={employees}/>
      <EmployeeForm
        departments={departments}
        onAddEmployee={addEmployee}
      />

      <Footer/>
    </>
  )
}

export default App