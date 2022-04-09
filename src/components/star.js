import {useEffect, useState} from 'react'
import './star.css';

const Star = (props) => {
  const [star, setStar] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(props.name)) {
      setStar(1);
    }
  }, [props.name])

  const storeStar = () => {
    setStar(!star);
    if (localStorage.getItem(props.name)) {
      localStorage.removeItem(props.name);
      props.count(0);
    } else {
      localStorage.setItem(props.name, props.name);
      props.count(1);
    }
  }

  return (
    <button
      data-testid='star'
      type="button"
      className={star ? "on" : "off"}
      onClick={() => storeStar()}
    >
      <span className="star">&#9733;</span>
    </button>
  )
}

export default Star;