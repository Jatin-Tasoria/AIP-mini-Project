import React, { useEffect, useState } from 'react';
import { Star, Pencil, Trash2, Check, X } from 'lucide-react';
import API from '../../api';

const ReviewSection = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editComment, setEditComment] = useState('');
  const [editRating, setEditRating] = useState(0);

  // Load reviews from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('coffeeReviews');
    if (stored) {
      setReviews(JSON.parse(stored));
    }
  }, []);

  const saveToStorage = (data) => {
    setReviews(data);
    localStorage.setItem('coffeeReviews', JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment || rating === 0) return;

    const newReview = {
      id: Date.now(),
      comment,
      rating,
      userName: user?.name || "Anonymous", // optional: track who posted
    };

    const updatedReviews = [newReview, ...reviews];
    saveToStorage(updatedReviews);
    setComment('');
    setRating(0);
  };

  const handleDelete = (id) => {
    const updated = reviews.filter((r) => r.id !== id);
    saveToStorage(updated);
  };

  const startEdit = (review) => {
    setEditingId(review.id);
    setEditComment(review.comment);
    setEditRating(review.rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditComment('');
    setEditRating(0);
  };

  const saveEdit = () => {
    const updated = reviews.map((r) =>
      r.id === editingId ? { ...r, comment: editComment, rating: editRating } : r
    );
    saveToStorage(updated);
    cancelEdit();
  };

  return (
    <div className="bg-[#fefaf2] text-[#4b3621] px-6 py-14 text-center">
      <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-10 space-y-4">
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`w-6 h-6 cursor-pointer ${
                  rating >= star ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
                }`}
              />
            ))}
          </div>

          <textarea
            rows="3"
            placeholder="Leave your review..."
            className="w-full p-3 rounded-md text-black"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            type="submit"
            className="bg-[#6f4e37] hover:bg-[#5a3c2a] text-white font-semibold px-6 py-2 rounded"
          >
            Submit Review
          </button>
        </form>
      ) : (
        <p className="text-red-600 font-semibold mb-8">
          Please <a href="/login" className="underline">log in</a> to leave a review.
        </p>
      )}

      <div className="max-w-3xl mx-auto space-y-6 text-left">
        {reviews.length === 0 && <p className="text-gray-500">No reviews yet. Be the first!</p>}
        {reviews.map((review, index) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 relative animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {editingId === review.id ? (
              <>
                <div className="flex gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      onClick={() => setEditRating(s)}
                      className={`w-5 h-5 cursor-pointer ${
                        editRating >= s ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <textarea
                  rows="3"
                  className="w-full p-2 rounded-md text-black mb-3"
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    <Check size={16} /> Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400"
                  >
                    <X size={16} /> Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-4 h-4 ${
                          review.rating >= s ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Pencil
                      onClick={() => startEdit(review)}
                      className="w-4 h-4 text-blue-500 cursor-pointer hover:text-blue-600"
                    />
                    <Trash2
                      onClick={() => handleDelete(review.id)}
                      className="w-4 h-4 text-red-500 cursor-pointer hover:text-red-600"
                    />
                  </div>
                </div>
                <p className="text-gray-800">{review.comment}</p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ReviewSection;
