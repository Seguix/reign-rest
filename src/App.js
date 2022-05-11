import './App.css';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import PostList from './components/PostList/PostList';
import Selector from './components/Selector/Selector';
import Tabs from './components/Tabs/Tabs';
import Tab from './components/Tabs/Tab';
import Pagination from './components/Pagination/Pagination';

const App = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [nbPages, setNbPages] = useState(0);
  const [items, setItems] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(8);
  const [viewed, setViews] = useState([]);

  useEffect(() => {
    const views = localStorage.getItem("viewed") || [];
    let postsViewed = [];
      try {
        postsViewed = JSON.parse(views);
      } catch (error) {
        console.error(error);
      }
    setViews(postsViewed);
  }, []);

  useEffect(() => {
    setPage(0);
    setItems([]);
    setStartIndex(0);
    setEndIndex(8);
    if(selectedTab===1){
      const favoritedPosts = localStorage.getItem("favorited") || {};
      let favorites = {};
      try {
        favorites = JSON.parse(favoritedPosts);
      } catch (error) {
        console.error(error);
      }
      const result = Object.values(favorites);
      setNbPages(Math.ceil(result.length/8))
      setItems(result);
    }
  }, [selectedTab])

  useEffect(() => {
    if(selectedTab===0){
      const selectedFilter = localStorage.getItem('filter') || '';
      setFilter(selectedFilter);
      const query = selectedFilter ? '&query='+selectedFilter : '';
      const pages = '&page='+page;
      fetch("https://hn.algolia.com/api/v1/search_by_date?"+query+pages)
        .then(res => res.json())
        .then(res => {
          setNbPages(res.nbPages);
          return res.hits.filter(post => post.author && post.story_title && post.story_url && post.created_at)
        })
        .then(res => res.slice(0, 8))
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }
  }, [filter, page, selectedTab])

  const handleSelect = (value) => {
    setFilter(value);
    localStorage.setItem('filter',value)
  }

  const handlePage = (value) => {
    setPage(value);
    if(selectedTab===1) {
      setStartIndex(value*8); 
      setEndIndex((value+1)*8); 
    }
  }

  const updateViews = (id) => {
    let views = [...viewed];
    views.indexOf(id) === -1 && views.push(id);
    localStorage.setItem('viewed', JSON.stringify(views));
    setViews(views);
  }
  
  return (
    <div className="main">
      <Navbar/>
      <div className="container">
        <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
            <Tab title="All">
              <Selector value={filter} handleSelect={handleSelect}/>
              {
                error ? <div className="warning">Error: {error.message}</div>
                :
                !isLoaded ? <div className="warning">Loading...</div>
                :
                items && <PostList posts={items} viewed={viewed} updateViews={updateViews} />
              }
            </Tab>
            <Tab title="My faves">
              <br/>
              {
                items.length >0 ? 
                <PostList 
                  posts={items} 
                  showFavs={true} 
                  viewed={viewed} 
                  updateViews={updateViews} 
                  startIndex={startIndex} 
                  endIndex={endIndex}
                />
                : <div className="warning">Click the like button in a post to see it here.</div>
              }
            </Tab>
        </Tabs>
        {
          items.length >0 &&
          <Pagination 
            page={page} 
            handlePage={handlePage} 
            nbPages={nbPages}
          />
        }
      </div>
    </div>
  )
}
export default App;