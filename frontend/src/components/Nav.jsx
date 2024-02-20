import { Link } from 'react-router-dom';

const Nav = (props) => {

    return <Link onClick={props.onClick} className='nav-link' to={props.to} style={{ background: props.bg, color: props.textColor}} >{ props.text }</Link>
}

export default Nav;