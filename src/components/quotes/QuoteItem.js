import { NavLink } from "react-router-dom";
import classes from "./QuoteItem.module.css";

const QuoteItem = (props) => {
  return (
    <li className={classes.item} dir="auto">
      <figure>
        <blockquote>
          <p dir="auto">{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      <NavLink className={classes.btn} to={`/all-quotes/${props.id}`}>
        View Fullscreen
      </NavLink>
    </li>
  );
};

export default QuoteItem;
