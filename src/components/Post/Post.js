import './Post.css';
import timer from "../../assets/iconmonstr-time-2@3x.png"
import favorite from "../../assets/iconmonstr-favorite-2@3x.png";
import favorited from "../../assets/iconmonstr-favorite-3@3x.png"

const Post = ({data, isFav, isViewed, appendToStorage, updateViews}) => {
  const { objectID, author, story_title, story_url, created_at } = data;

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes";
    return Math.floor(seconds) + " seconds";
  }

  return(
    <>
      <div className={isViewed ? 'post viewed' : 'post'}>
        <a href={story_url} rel="noopener noreferrer" target="_blank" onClick={() => updateViews(objectID)}>
          <div className="content">
            <div className="timeDisplay">
              <img alt="Time" src={timer}/>
              <span className="time-text">{timeSince(new Date(created_at))} ago by {author}</span>  
            </div>
            <div className="title">{story_title}</div>
          </div>  
        </a>
        
        <button className="like-btn" onClick={() => appendToStorage({ objectID, author, story_title, story_url, created_at })}>
          <img src={isFav ? favorited : favorite} alt="Favorite Button"/>
        </button>
      </div>  
    </>
  )
}

export default Post;