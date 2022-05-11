import { useState, useEffect } from 'react';
import angular_logo from '../../assets/image-138@3x.png';
import react_logo from '../../assets/image-140@3x.png';
import vue_logo from '../../assets/image-141@3x.png';
import './Selector.css';

const Selector = ({value, handleSelect}) => {
  const [defaultText, setDefaultText] = useState('Select your news');
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    value && setDefaultText(value);
  }, [value])

  const handleClickOutside = e => {
    if (
      !e.target.classList.contains("select_option") &&
      !e.target.classList.contains("select_text") &&
      !e.target.classList.contains("select_img") &&
      !e.target.classList.contains("selected-text")
    ) {
      setOpen(false);
    }
  };

  const handleListDisplay = () => {
    setOpen(!isOpen);
  };

  const handleOptionClick = value => {
    setDefaultText(value);
    handleSelect(value);
    setOpen(false);
  };

  return(
    <div className="select-container">
      <div className={isOpen ? 'selected-text active': 'selected-text'} onClick={handleListDisplay}>
        {
          defaultText !== 'Select your news' &&
          <img 
          className="select_img" 
          src={
              value === 'angular' ? angular_logo : 
              value === 'reactjs' ? react_logo :
              value === 'vuejs' && vue_logo 
          } 
          alt="selected logo"
          />
        }
        {defaultText}
      </div>
      {
        isOpen && (
          <ul className="select">
            <li className="select_option" onClick={() => handleOptionClick('angular')}>
              <img className="select_img" src={angular_logo} alt="angular_logo"/>
              <span className="select_text">Angular</span>
            </li>
            <li className="select_option" onClick={() => handleOptionClick('reactjs')}>
              <img className="select_img" src={react_logo} alt="react_logo"/>
              <span className="select_text">Reactjs</span>
            </li>
            <li className="select_option" onClick={() => handleOptionClick('vuejs')}>
              <img className="select_img" src={vue_logo} alt="vue_logo"/>
              <span className="select_text">Vuejs</span>
            </li>
          </ul>
        )
      }
    </div>
  )
}
export default Selector;