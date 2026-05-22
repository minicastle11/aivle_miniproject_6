import BookReportDetailList from '../components/BookReportDetailList'

function DetailPage({bookState, reviewList, onReviewLike, onReviewEdit, onReviewDelete }){
    
    return(
        <>
        <div>
            {bookState.coverImageUrl !='' ? 
            <img src = {bookState.coverImageUrl} img='img'/> : <></>}
            <div flex-direction='column'>
                <h3>{bookState.title}</h3>
                <p>{bookState.content}</p>
                <p>생성일: {bookState.createAt}</p>
            </div>
        </div>
            <BookReportDetailList
            review= {reviewList.filter(p => p.bookid === bookState.id )}
            bookTitle={bookState.title}
            onRevieLike={onReviewLike}
            onReviewEdit={onReviewEdit}
            onReviewDelete={onReviewDelete}
            />
        </>

    );
}
export default DetailPage;