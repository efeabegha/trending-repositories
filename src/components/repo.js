import React, {useState, useEffect} from 'react';
import Star from './star';
import './repo.css';

const Repo = (props) => {
  const [sCount, setSCount] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(props.name)) {
      setSCount(sCount + 1);
    } 
  }, [])
  
  return <div className="repo">
    <div className="repo-owner" data-testid="repo">
      <h1 className="repo-h1">{props.name}</h1>
      <a href={props.url}>{props.url}</a>
      <p className="paragraph">{props.description}</p>
      <p className="paragraph">
        <span>&#9733;</span>
        {
          localStorage.getItem(props.name) ?
            +props.stars + sCount : +props.stars
        }
      </p>
    </div>
    <Star name={props.name} count={setSCount} />
  </div>
}

export default Repo;