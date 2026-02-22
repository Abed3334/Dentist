
import { doctors } from '../../../../mocks/doctors';

interface StepDoctorProps {
  /** The id of the currently selected doctor, or `null` if none is selected. */
  selectedDoctor: number | null;
  /** Callback invoked when a doctor is selected. */
  onSelect: (id: number) => void;
}

/**
 * Renders a list of active doctors allowing the user to pick one.
 * Includes defensive checks and clear error handling to keep the UI stable
 * even if the mock data is malformed.
 */
export default function StepDoctor({
  selectedDoctor,
  onSelect,
}: StepDoctorProps) {
  // Guard against unexpected data shapes – if `doctors` is not an array we fallback to an empty list.
  const activeDoctors = Array.isArray(doctors)
    ? doctors.filter((d) => d.status === 'active')
    : [];

  // If for any reason the list is empty, we still render a friendly placeholder.
  if (activeDoctors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#6B7280]">No doctors are currently available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-[#0B1F3B] mb-2">
        Choose Your Doctor
      </h2>
      <p className="text-[#6B7280] mb-8">
        Select from our experienced dental professionals
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {activeDoctors.map((doctor) => (
          <button
            key={doctor.id}
            onClick={() => onSelect(doctor.id)}
            className={`text-left p-5 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md flex gap-4 ${
              selectedDoctor === doctor.id
                ? 'border-[#0F766E] bg-[#F0FDF9] shadow-md'
                : 'border-[#E5E7EB] bg-white hover:border-[#A7F3D0]'
            }`}
          >
            <div className="relative flex-shrink-0">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              {selectedDoctor === doctor.id && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#0F766E] flex items-center justify-center">
                  <i className="ri-check-line text-white text-sm"></i>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#0B1F3B] mb-1">
                {doctor.name}
              </h3>

              <span
                className={`inline-block text-xs font-medium text-[#0F766E] bg-[#A7F3D0]/30 px-2 py-0.5 rounded-md mb-2 whitespace-nowrap`}
              >
                {doctor.specialty}
              </span>

              <div className="flex items-center gap-1 mb-2">
                <div className="flex text-yellow-400 text-xs">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={
                        i < Math.floor(doctor.rating)
                          ? 'ri-star-fill'
                          : 'ri-star-line'
                      }
                    ></i>
                  ))}
                </div>
                <span className="text-xs text-[#6B7280]">
                  {doctor.rating} ({doctor.reviewCount})
                </span>
              </div>

              <p className="text-xs text-[#6B7280] line-clamp-2">
                {doctor.bio}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
