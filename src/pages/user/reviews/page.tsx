
import { useState } from 'react';
import UserLayout from '../components/UserLayout';
import { userReviews, userPastAppointments } from '../../../mocks/userAppointments';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState(userReviews);
  const [newReviewModal, setNewReviewModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [toast, setToast] = useState('');

  // Show a temporary toast message
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Appointments that are completed but not yet reviewed
  const unreviewedAppointments = userPastAppointments.filter(
    (apt) =>
      apt.status === 'completed' &&
      !apt.reviewed &&
      !reviews.find((r) => r.appointmentId === apt.id)
  );

  const handleSubmitReview = () => {
    if (!selectedAppointment || rating === 0) return;
    const apt = userPastAppointments.find((a) => a.id === selectedAppointment);
    if (!apt) return;

    const newReview = {
      id: reviews.length + 1,
      appointmentId: selectedAppointment,
      doctor: apt.doctor,
      service: apt.service,
      date: new Date().toISOString().split('T')[0],
      rating,
      comment,
    };

    // Update state immutably and reset the form
    setReviews([newReview, ...reviews]);
    setNewReviewModal(false);
    setSelectedAppointment('');
    setRating(0);
    setComment('');
    showToast('Review submitted successfully!');
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3B]">My Reviews</h1>
            <p className="text-sm text-[#6B7280] mt-1">View and manage your reviews</p>
          </div>
          {unreviewedAppointments.length > 0 && (
            <button
              onClick={() => setNewReviewModal(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-star-line"></i>
              Write Review
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F766E]/10 flex items-center justify-center">
                <i className="ri-star-fill text-[#0F766E] text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0B1F3B]">{reviews.length}</p>
                <p className="text-xs text-[#6B7280]">Total Reviews</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-50 flex items-center justify-center">
                <i className="ri-star-fill text-yellow-400 text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0B1F3B]">
                  {reviews.length > 0
                    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
                    : '0'}
                </p>
                <p className="text-xs text-[#6B7280]">Average Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <i className="ri-edit-line text-amber-500 text-lg"></i>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#0B1F3B]">{unreviewedAppointments.length}</p>
                <p className="text-xs text-[#6B7280]">Pending Reviews</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Reviews Banner */}
        {unreviewedAppointments.length > 0 && (
          <div className="bg-[#FEF3C7] rounded-xl p-4 mb-6 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-200 flex items-center justify-center flex-shrink-0">
              <i className="ri-lightbulb-line text-amber-700"></i>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-800">
                You have {unreviewedAppointments.length} completed appointment
                {unreviewedAppointments.length > 1 ? 's' : ''} waiting for your review.
              </p>
            </div>
            <button
              onClick={() => setNewReviewModal(true)}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg text-xs font-medium hover:bg-amber-700 transition-all duration-200 cursor-pointer whitespace-nowrap"
            >
              Review Now
            </button>
          </div>
        )}

        {/* Reviews List */}
        {reviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E5E7EB]">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
              <i className="ri-star-line text-2xl text-[#6B7280]"></i>
            </div>
            <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">No reviews yet</h3>
            <p className="text-sm text-[#6B7280]">
              Complete an appointment to leave your first review.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-semibold text-[#0B1F3B]">{review.service}</h3>
                    <p className="text-xs text-[#6B7280] mt-0.5">{review.doctor}</p>
                  </div>
                  <span className="text-xs text-[#6B7280]">
                    {new Date(review.date + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`text-sm ${
                        star <= review.rating
                          ? 'ri-star-fill text-yellow-400'
                          : 'ri-star-line text-[#D1D5DB]'
                      }`}
                    ></i>
                  ))}
                  <span className="text-xs text-[#6B7280] ml-1">{review.rating}.0</span>
                </div>

                {review.comment && (
                  <p className="text-sm text-[#6B7280] leading-relaxed">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Review Modal */}
      {newReviewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0B1F3B]">Write a Review</h3>
              <button
                onClick={() => {
                  setNewReviewModal(false);
                  setSelectedAppointment('');
                  setRating(0);
                  setComment('');
                }}
                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Select Appointment */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Select Appointment
              </label>
              <select
                value={selectedAppointment}
                onChange={(e) => setSelectedAppointment(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F766E] cursor-pointer"
              >
                <option value="">Choose an appointment...</option>
                {unreviewedAppointments.map((apt) => (
                  <option key={apt.id} value={apt.id}>
                    {apt.service} — {apt.doctor}{' '}
                    ({new Date(apt.date + 'T00:00:00').toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })})
                  </option>
                ))}
              </select>
            </div>

            {/* Rating */}
            <div className="mb-5 text-center">
              <p className="text-sm font-medium text-[#111827] mb-3">Your Rating</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="cursor-pointer transition-transform duration-200 hover:scale-110"
                  >
                    <i
                      className={`text-3xl ${
                        star <= rating ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-[#D1D5DB]'
                      }`}
                    ></i>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setComment(e.target.value);
                }}
                placeholder="Share your experience..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F766E] resize-none"
              />
              <p className="text-right text-xs text-[#6B7280] mt-1">{comment.length}/500</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setNewReviewModal(false);
                  setSelectedAppointment('');
                  setRating(0);
                  setComment('');
                }}
                className="flex-1 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-medium hover:bg-[#F3F4F6] transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={!selectedAppointment || rating === 0}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedAppointment && rating > 0
                    ? 'bg-[#0F766E] text-white hover:bg-[#0B5B54] cursor-pointer'
                    : 'bg-[#D1D5DB] text-white cursor-not-allowed'
                }`}
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-[#0B1F3B] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-sm animate-slide-up z-50">
          <i className="ri-check-double-line text-[#A7F3D0]"></i>
          {toast}
        </div>
      )}
    </UserLayout>
  );
}
