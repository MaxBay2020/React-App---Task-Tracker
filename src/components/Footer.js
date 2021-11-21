import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <footer>
            <p>Copyright &copy; 2021 Cong wang</p>
            <Link to="/about">About</Link>
        </footer>
    );
};

export default Footer;
