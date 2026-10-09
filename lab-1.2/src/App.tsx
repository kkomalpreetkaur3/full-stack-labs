import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Organization } from './components/Organization'
import { EmployeeDirectory } from './components/EmployeeDirectory'
import { EmployeeForm } from './components/EmployeeForm'

import type { Employee } from './types/Employee'
import { employeeService } from './services/employeeService'

function App() {
  const [employees, setEmployees] = useState<Employee[]>(
    () => employeeService.getEmployeeData().employees
  )

  const [departments] = useState<string[]>(
    () => employeeService.getEmployeeData().departments
  )

  function addEmployee(employee: Employee) {
    setEmployees(currentEmployees => [...currentEmployees, employee])
  }

  return (
    <>
      <Header />
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/employees" replace />} />

        <Route
          path="/employees"
          element={
            <>
              <EmployeeDirectory employees={employees} />

              <EmployeeForm
                departments={departments}
                onAddEmployee={addEmployee}
              />
            </>
          }
        />

        <Route
          path="/organization"
          element={<Organization />}
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App