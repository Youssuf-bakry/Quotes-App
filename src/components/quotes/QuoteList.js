import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";
const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};
const QuoteList = (props) => {
  /*
   const [isSortedAsc, setIsSortedAsc] = useState("");
   منفعش لأني محتاج أستخرج البيانات من ال
   url ولازم
   أستعمل ال  
   location
   وليس هيستوري 
   لأن الهيستوري 
   Mutable
  
  */
  const history = useHistory();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isSortedAsc = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortedAsc);

  const sortingHandler = () => {
    history.push(`${location.pathname}?sort=${isSortedAsc ? "dec" : "asc"}`);
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>
          Sort {isSortedAsc ? "Descendingly" : "Ascendingly"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
