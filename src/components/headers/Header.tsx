import icon from '../../assets/react.svg';
import './index.less';

function Header() {

  return (
    <nav className="header_container">
      <img src={icon}></img>
      <span className='header_container_title'>React Playground</span>
    </nav>
  )
}

export default Header