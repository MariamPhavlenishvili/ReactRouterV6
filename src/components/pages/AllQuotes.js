import { useEffect } from 'react';
import QuoteList from '../quotes/QuoteList';
import useHttp from '../../hooks/hooks/use-http';
import { getAllQuotes } from '../../lib/lib/api'; 
import LoadingSpinner from '../UI/LoadingSpinner';
import NoQuotesFound from '../quotes/NoQuotesFound';

const AllQuotes = () => {
    const { sendRequest, status, data: loadedQuotes, error} = useHttp(getAllQuotes, true);

    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    console.log(loadedQuotes,status);

    if (status === 'pending') {
        return (
            <div className='centered'>
                <LoadingSpinner/>
            </div>
        )
    }

    if (status === 'error') {
        return (
            <p className='centered focused'>
                { error }
            </p>
        )
    }

    if (status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)) {
        return (
            <NoQuotesFound/>
        )
    }

    return (
        <QuoteList quotes={loadedQuotes}/>
    )
};

export default AllQuotes;