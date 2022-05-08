import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useHttp from '../../hooks/hooks/use-http';
import { addComment } from '../../lib/lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const params = useParams();

  const { sendRequest, status, error } = useHttp(addComment);

  const { onAddedComent } = props;

  useEffect(() => {
    if (status === 'completed' && !error) {
      onAddedComent();
    }
  }, [status, error, onAddedComent])

  const submitFormHandler = (event) => {
    // event.preventDefault();

    const enteredText = commentTextRef.current.value;

    // optional: Could validate here

    // send comment to server

    sendRequest({commentData: { text: enteredText }, quoteId: props.quoteId});
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      { status === 'pending' && (
        <div className='centered'>
          <LoadingSpinner/>
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
