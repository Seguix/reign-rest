import { useState, useEffect } from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import './Pagination.css';

const Pagination = ({ page, handlePage, nbPages }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const { width } = useWindowDimensions();

  useEffect(() => {
    if(width < 992){
      setEndIndex(5)
    } else {
      setEndIndex(9)
    }
  }, [width])

  const handleClick = (index) => {
    window.scrollTo(0, 0)
    handlePage(index);
  }

  const nextClick = () => {
    window.scrollTo(0, 0)
    if(endIndex < nbPages) {
      setStartIndex(prevCount => prevCount + 1); 
      setEndIndex(prevCount => prevCount + 1); 
    }
    handleClick(page+1);
  }

  const previousClick = () => {
    window.scrollTo(0, 0)
    if(startIndex > 0) {
      setStartIndex(prevCount => prevCount - 1); 
      setEndIndex(prevCount => prevCount - 1); 
    }
    handleClick(page-1);
  }

  return(
    <div>
      <ul className="pagination">
        <li className={"page-link" + (page === 0 ? ' disabled' : '')} onClick={previousClick}>&lt;</li>
        {Array.from({length: nbPages },(v,k)=>k+1).slice(startIndex, endIndex).map(item => {
          return <li key={item} className={'page-link' + (page === item-1 ? ' active' : '')} onClick={() => handleClick(item-1)}>{item}</li>
        })}
        <li className={"page-link" + (page+1 === nbPages ? ' disabled' : '')} onClick={nextClick}>&gt;</li>
      </ul>
    </div>
  )
}

export default Pagination;