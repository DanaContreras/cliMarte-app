import {useState, useEffect} from 'react';
import {getComments, addComment, Comment} from '../models/CommentsModel';

export const useCommentsViewModel = () => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const storedComments = await getComments();
      setComments(storedComments.data);
    };
    fetchComments();
  }, []);

  const handleAddComment = async (
    userName: string,
    mail: string,
    comment: string,
  ) => {
    const newComment: Comment = {
      userName: userName,
      mail: mail,
      comment: comment,
      date: new Date(),
    };

    try {
      await addComment(newComment);
      setComments(prevComments =>
        Array.isArray(prevComments)
          ? [...prevComments, newComment]
          : [newComment],
      );
    } catch (error) {
      console.error('Error al agregar comentario: ', error);
    }
  };

  return {comments, handleAddComment};
};
