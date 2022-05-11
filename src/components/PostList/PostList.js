import { useEffect, useState } from 'react';
import './PostList.css';
import Post from '../Post/Post';

const PostList = ({posts, showFavs, viewed, updateViews, startIndex, endIndex}) => {
  const [favorited, setFavorited] = useState({});
  useEffect(() => {
    const favoritedPosts = localStorage.getItem("favorited") || {};
    let favorites = {};
    try {
      favorites = JSON.parse(favoritedPosts);
    } catch (error) {
      console.error(error);
    }
    setFavorited(favorites);
  }, []);

  const appendToStorage = (post) => {
    let favs = {...favorited};
    post.objectID in favs ? delete favs[post.objectID] : favs[post.objectID] = post;
    localStorage.setItem('favorited', JSON.stringify(favs));
    setFavorited(favs);
  }

  return(
    <div className="grid">
      {
        showFavs ? 
        posts.slice(startIndex,endIndex).map((post) => <Post key={post.objectID} updateViews={updateViews} appendToStorage={appendToStorage} data={post} isViewed={viewed.indexOf(post.objectID) > -1} isFav={post.objectID in favorited}/>)
        :
        posts.map((post) => <Post key={post.objectID} updateViews={updateViews} appendToStorage={appendToStorage} data={post} isViewed={viewed.indexOf(post.objectID) > -1} isFav={post.objectID in favorited}/>)
      }
    </div>
    
  )
}

export default PostList;