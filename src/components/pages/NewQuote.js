import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import QuoteForm from '../quotes/QuoteForm';
import useHttp from '../../hooks/hooks/use-http';
import { addQuote } from '../../lib/lib/api';

const NewQuotes = () => {
    const {sendRequest, status} = useHttp(addQuote);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === 'completed') {
            navigate('/quotes');
        }
    }, [status, navigate])

    const addQuoteHandler = quoteData => {
        sendRequest(quoteData)
    };

    return (
        <QuoteForm isLoaded={status === 'pending'} onAddQuote={addQuoteHandler}/>
    )
};

export default NewQuotes;