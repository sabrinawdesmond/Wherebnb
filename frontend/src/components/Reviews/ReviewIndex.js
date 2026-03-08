import { useSelector } from "react-redux";
import "./ReviewIndex.css";

const RATING_CATEGORIES = [
  { key: "cleanliness", label: "Cleanliness" },
  { key: "accuracy", label: "Accuracy" },
  { key: "communication", label: "Communication" },
  { key: "location", label: "Location" },
  { key: "check_in", label: "Check-in" },
  { key: "value", label: "Value" },
];

const StarRating = ({ value }) => {
  return (
    <span className="star-rating">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={i <= value ? "star filled" : "star"}>★</span>
      ))}
    </span>
  );
};

const ReviewIndex = ({ reviews, listingId }) => {
  const sessionUser = useSelector(state => state.session.user);

  if (!reviews || reviews.length === 0) {
    return (
      <div className="review-index">
        <h2>No reviews yet</h2>
        {sessionUser && <p>Be the first to leave a review!</p>}
      </div>
    );
  }

  const avgOverall = (
    reviews.reduce((sum, r) => sum + r.overall, 0) / reviews.length
  ).toFixed(2);

  const categoryAverages = RATING_CATEGORIES.map(cat => ({
    label: cat.label,
    avg: (reviews.reduce((sum, r) => sum + r[cat.key], 0) / reviews.length).toFixed(1)
  }));

  return (
    <div className="review-index">
      <div className="review-summary">
        <h2>★ {avgOverall} · {reviews.length} review{reviews.length !== 1 ? "s" : ""}</h2>
        <div className="review-category-averages">
          {categoryAverages.map(cat => (
            <div key={cat.label} className="category-row">
              <span className="category-label">{cat.label}</span>
              <div className="category-bar-container">
                <div
                  className="category-bar"
                  style={{ width: `${(cat.avg / 5) * 100}%` }}
                />
              </div>
              <span className="category-score">{cat.avg}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="review-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <div className="reviewer-avatar">
                {review.reviewer_username?.[0]?.toUpperCase()}
              </div>
              <div>
                <p className="reviewer-name">{review.reviewer_username}</p>
                <StarRating value={review.overall} />
              </div>
            </div>
            <p className="review-body">{review.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewIndex;