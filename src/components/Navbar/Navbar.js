import './Navbar.css';
import hackernews from "../../assets/hacker-news@3x.png"

const Navbar = () => {
  return(
    <div className="navbar">
      <div className="container">
        <img className="HACKER-NEWS" src={hackernews} alt="Hacker News"/>
      </div>
    </div>
  )
}

export default Navbar;