export function Footer() {
    const currentYear = new Date().getFullYear()
    return(
        <footer>
            <p>Copyright Pixell River Financial {currentYear}.</p>
        </footer>
    )
}