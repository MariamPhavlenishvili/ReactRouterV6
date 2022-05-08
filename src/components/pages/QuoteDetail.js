import { Routes, Route, useParams, Link } from "react-router-dom";
import { Fragment, useEffect } from "react";
import HighlightedQuote from "../quotes/HighlightedQuote";
import Comments from "../../components/comments/Comments";
import useHttp from "../../hooks/hooks/use-http";
import { getSingleQuote } from "../../lib/lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetail = () => {
    const params = useParams();

    const { quoteId } = params;

    const { sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true);

    useEffect(() => { 
        sendRequest(quoteId)
    }, [sendRequest, quoteId])
    
    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <p className='centered'>
                { error }
            </p>
        )
    }

    if (!loadedQuote.text) {
        return (
            <p className='centered'>
                No quote found!
            </p>
        )
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Routes>
                <Route path="/" element={
                    <div className='centered'>
                        <Link className='btn--flat' to={`/quotes/${params.quoteId}/comments`}>Load Coments</Link>
                    </div>
                }></Route>
                <Route path="/comments" element={ <Comments/> }></Route>
            </Routes>
        </Fragment>
    )
};

export default QuoteDetail;