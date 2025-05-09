import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

const DayCard = ({ day, chores, canEdit, canCheckOff, onToggleStatus }) => {
  return (
    <div className='border p-4 text-gray-300'>
      <h3 className='text-lg font-bold text-gray-300'>{day}</h3>{' '}
      {/* Lighter Day Text */}
      {chores.length > 0 ? (
        <ul>
          {chores.map((chore) => (
            <li key={chore._id} className='mb-4'>
              <div>
                {/* Chore Template Name or ID (Display a name if available, fallback to ID) */}
                <p className='text-gray-300'>
                  <strong>Chore:</strong>{' '}
                  {chore.template.name || chore.template._id}
                </p>
                {/* Child Assigned */}
                <p className='text-gray-300'>
                  <strong>Assigned to:</strong> {chore.to.name}
                </p>
                {/* Status with color indicators */}
                <p className='flex items-center'>
                  <button
                    onClick={() => onToggleStatus(chore._id)}
                    className='flex items-center focus:outline-none'
                  >
                    {chore.status ? (
                      <CheckCircleIcon className='h-5 w-5 text-green-500' />
                    ) : (
                      <XCircleIcon className='h-5 w-5 text-red-500' />
                    )}
                    <span
                      className={`ml-2 ${
                        chore.status ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {chore.status ? 'Completed' : 'Pending'}
                    </span>
                  </button>
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className='text-gray-300'>No chores assigned for today.</p>
      )}
    </div>
  );
};

export default DayCard;
