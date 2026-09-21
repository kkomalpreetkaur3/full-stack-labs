import { NavLink } from 'react-router-dom'

export function Navbar() {
    return (
        <nav style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <NavLink to="/employees">Employees</NavLink>
            <span>|</span>
            <NavLink to="/organization">Organization</NavLink>
    </nav>
    )
}