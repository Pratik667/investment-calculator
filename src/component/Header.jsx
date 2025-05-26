import logo from '../assets/money-logo.png';
export default function Header() {

    return (
        <header id='header'>
           <img src={logo} alt='brand logo' />
           <h1>Investment Calculator</h1>
        </header>
    )
}