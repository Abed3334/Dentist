
import { useState } from 'react';
import UserLayout from '../components/UserLayout';
import { userUpcomingAppointments, userPastAppointments } from '../../../mocks/userAppointments';

const statusColors: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700' },
  // Updated to use Tailwind‑compatible classes (removed the unsupported “/10” syntax)
  completed: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600' },
};

export default function MyAppointmentsPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [rescheduleModal, setRescheduleModal] = useState<string | null>(null);
  const [cancelModal, setCancelModal] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('');
  const [reviewModal, setReviewModal] = useState<string | null>(null);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [toast, setToast] = useState('');
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  // Simple toast helper with safety guard
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const formatDate = (dateStr: string) => {
    // Guard against invalid dates
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const handleReschedule = () => {
    if (!rescheduleDate || !rescheduleTime) return;
    setRescheduleModal(null);
    setRescheduleDate('');
    setRescheduleTime('');
    showToast('Appointment rescheduled successfully!');
  };

  const handleCancel = () => {
    if (!cancelReason.trim()) return;
    setCancelModal(null);
    setCancelReason('');
    showToast('Appointment cancelled.');
  };

  const handleReview = () => {
    if (reviewRating === 0) return;
    setReviewModal(null);
    setReviewRating(0);
    setReviewComment('');
    showToast('Review submitted! Thank you.');
  };

  const appointments = activeTab === 'upcoming' ? userUpcomingAppointments : userPastAppointments;

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0B1F3B]">My Appointments</h1>
            <p className="text-sm text-[#6B7280] mt-1">Manage your dental appointments</p>
          </div>
          <a
            href="/book-appointment"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0F766E] text-white rounded-xl text-sm font-medium hover:bg-[#0B5B54] transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <i className="ri-add-line"></i>
            Book New
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#F3F4F6] rounded-xl p-1 mb-8 max-w-xs">
          {(['upcoming', 'past'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white text-[#0B1F3B] shadow-sm'
                  : 'text-[#6B7280] hover:text-[#0B1F3B]'
              }`}
            >
              {tab === 'upcoming' ? 'Upcoming' : 'Past'}
            </button>
          ))}
        </div>

        {/* Appointment Cards */}
        {appointments.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#E5E7EB]">
            <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mx-auto mb-4">
              <i className="ri-calendar-line text-2xl text-[#6B7280]"></i>
            </div>
            <h3 className="text-lg font-semibold text-[#0B1F3B] mb-2">No appointments</h3>
            <p className="text-sm text-[#6B7280]">
              You don&apos;t have any {activeTab} appointments.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((apt) => {
              const status = statusColors[apt.status] || statusColors.confirmed;
              return (
                <div
                  key={apt.id}
                  className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-md transition-all duration-200"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.doctorAvatar}
                        alt={apt.doctor}
                        className="w-11 h-11 rounded-xl object-cover"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-[#0B1F3B]">{apt.doctor}</h3>
                        <p className="text-xs text-[#6B7280]">{apt.specialty}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium ${status.bg} ${status.text} whitespace-nowrap`}
                    >
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                  </div>

                  {/* Service */}
                  <h4 className="text-sm font-semibold text-[#0B1F3B] mb-3">{apt.service}</h4>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <i className="ri-calendar-line w-4 h-4 flex items-center justify-center text-[#0F766E]"></i>
                      {formatDate(apt.date)} at {apt.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <i className="ri-time-line w-4 h-4 flex items-center justify-center text-[#0F766E]"></i>
                      {apt.duration} minutes
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                      <i className="ri-map-pin-line w-4 h-4 flex items-center justify-center text-[#0F766E]"></i>
                      {apt.location}
                    </div>
                    {apt.notes && (
                      <div className="flex items-start gap-2 text-xs text-[#6B7280]">
                        <i className="ri-sticky-note-line w-4 h-4 flex items-center justify-center text-[#0F766E] mt-0.5"></i>
                        {apt.notes}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB]">
                    <span className="text-sm font-bold text-[#0F766E]">${apt.price}</span>

                    {/* Actions */}
                    {activeTab === 'upcoming' && apt.status !== 'cancelled' && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setRescheduleModal(apt.id)}
                          className="px-3 py-1.5 text-xs font-medium text-[#0F766E] bg-[#F0FDF9] rounded-lg hover:bg-[#A7F3D0]/30 transition-all duration-200 cursor-pointer whitespace-nowrap"
                        >
                          Reschedule
                        </button>
                        <button
                          onClick={() => setCancelModal(apt.id)}
                          className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all duration-200 cursor-pointer whitespace-nowrap"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => showToast('Added to calendar!')}
                          className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-all duration-200 cursor-pointer"
                          title="Add to Calendar"
                        >
                          <i className="ri-calendar-event-line"></i>
                        </button>
                      </div>
                    )}

                    {activeTab === 'past' && apt.status === 'completed' && (
                      <div className="flex items-center gap-2">
                        {'reviewed' in apt && !apt.reviewed && (
                          <button
                            onClick={() => setReviewModal(apt.id)}
                            className="px-3 py-1.5 text-xs font-medium text-[#0F766E] bg-[#F0FDF9] rounded-lg hover:bg-[#A7F3D0]/30 transition-all duration-200 cursor-pointer whitespace-nowrap"
                          >
                            <i className="ri-star-line mr-1"></i>
                            Leave Review
                          </button>
                        )}
                        {'reviewed' in apt && apt.reviewed && (
                          <span className="px-3 py-1.5 text-xs font-medium text-[#6B7280] bg-[#F3F4F6] rounded-lg whitespace-nowrap">
                            <i className="ri-check-line mr-1"></i>
                            Reviewed
                          </span>
                        )}
                        <button
                          onClick={() => showToast('Receipt downloaded!')}
                          className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#0F766E] hover:bg-[#F0FDF9] rounded-lg transition-all duration-200 cursor-pointer"
                          title="Download Receipt"
                        >
                          <i className="ri-download-line"></i>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {rescheduleModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0B1F3B]">Reschedule Appointment</h3>
              <button
                onClick={() => setRescheduleModal(null)}
                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1.5">New Date</label>
                <input
                  type="date"
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F766E]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#111827] mb-1.5">New Time</label>
                <select
                  value={rescheduleTime}
                  onChange={(e) => setRescheduleTime(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F766E] cursor-pointer"
                >
                  <option value="">Select time</option>
                  {[
                    '09:00 AM',
                    '09:30 AM',
                    '10:00 AM',
                    '10:30 AM',
                    '11:00 AM',
                    '11:30 AM',
                    '01:00 PM',
                    '01:30 PM',
                    '02:00 PM',
                    '02:30 PM',
                    '03:00 PM',
                    '03:30 PM',
                    '04:00 PM',
                  ].map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setRescheduleModal(null)}
                className="flex-1 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-medium hover:bg-[#F3F4F6] transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                disabled={!rescheduleDate || !rescheduleTime}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  rescheduleDate && rescheduleTime
                    ? 'bg-[#0F766E] text-white hover:bg-[#0B5B54] cursor-pointer'
                    : 'bg-[#D1D5DB] text-white cursor-not-allowed'
                }`}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {cancelModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[#0B1F3B]">Cancel Appointment</h3>
              <button
                onClick={() => setCancelModal(null)}
                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <i className="ri-error-warning-line text-2xl text-red-500"></i>
            </div>
            <p className="text-sm text-[#6B7280] text-center mb-4">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">
                Reason for cancellation <span className="text-red-500">*</span>
              </label>
              <textarea
                value={cancelReason}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setCancelReason(e.target.value);
                }}
                placeholder="Please provide a reason..."
                rows={3}
                maxLength={500}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-red-400 resize-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCancelModal(null)}
                className="flex-1 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-medium hover:bg-[#F3F4F6] transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Keep Appointment
              </button>
              <button
                onClick={handleCancel}
                disabled={!cancelReason.trim()}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  cancelReason.trim()
                    ? 'bg-red-500 text-white hover:bg-red-600 cursor-pointer'
                    : 'bg-[#D1D5DB] text-white cursor-not-allowed'
                }`}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#0B1F3B]">Leave a Review</h3>
              <button
                onClick={() => {
                  setReviewModal(null);
                  setReviewRating(0);
                  setReviewComment('');
                }}
                className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111827] rounded-lg cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="text-center mb-6">
              <p className="text-sm text-[#6B7280] mb-3">How was your experience?</p>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="cursor-pointer transition-transform duration-200 hover:scale-110"
                  >
                    <i
                      className={`text-3xl ${
                        star <= reviewRating ? 'ri-star-fill text-yellow-400' : 'ri-star-line text-[#D1D5DB]'
                      }`}
                    ></i>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#111827] mb-1.5">Your Review</label>
              <textarea
                value={reviewComment}
                onChange={(e) => {
                  if (e.target.value.length <= 500) setReviewComment(e.target.value);
                }}
                placeholder="Share your experience..."
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 border-2 border-[#E5E7EB] rounded-xl text-sm focus:outline-none focus:border-[#0F766E] resize-none"
              />
              <p className="text-right text-xs text-[#6B7280] mt-1">{reviewComment.length}/500</p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setReviewModal(null);
                  setReviewRating(0);
                  setReviewComment('');
                }}
                className="flex-1 py-3 border-2 border-[#E5E7EB] text-[#6B7280] rounded-xl text-sm font-medium hover:bg-[#F3F4F6] transition-all duration-200 cursor-pointer whitespace-nowrap"
              >
                Cancel
              </button>
              <button
                onClick={handleReview}
                disabled={reviewRating === 0}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  reviewRating > 0
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
