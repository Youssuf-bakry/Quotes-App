import { useEffect } from "react";
import { Link, Route, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HiglightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";

const SingleQuote = () => {
  const params = useParams();
  const match = useRouteMatch();
  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!quote.text) {
    return <p>quote not found</p>;
  }

  return (
    <section>
      <HiglightedQuote text={quote.text} author={quote.author} />
      <div className="centered">
        <Route path={match.path} exact>
          <Link className="btn--flat" to={`${match.url}/comments`}>
            {" "}
            Load Comments
          </Link>
        </Route>
      </div>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </section>
  );
};

export default SingleQuote;
