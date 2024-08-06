import "../css/CommentCard.css"

export const CommentCard = ({comment}) => {

    return (
        <div className='comment-card'>
            <p>{comment.author}</p>
            <p>{comment.body}</p>
            <p>{comment.votes}</p>
        
            </div>
        
    )

}