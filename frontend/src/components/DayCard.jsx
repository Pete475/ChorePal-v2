import { useState, useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import AddChoreForm from './AddChore';

const DayCard = ({ day, chores, canEdit, onToggleStatus }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isParent, setIsParent] = useState(null);

  useEffect(() => {
    if (canEdit) {
      setIsParent(true);
    }
  }, [canEdit]);

  return (
    <div>
      {isParent && (
        <button
          onClick={() => setShowAddForm(true)}
          className='self-start bg-accentOrange text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'
        >
          Add New Chore
        </button>
      )}

      {showAddForm && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 max-w-md w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold text-primaryDark'>
                Add Chore for {day.toUpperCase()}
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className='text-gray-500 hover:text-gray-700'
              >
                x
              </button>
            </div>
            <AddChoreForm day={day} onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}
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
    </div>
  );
};

export default DayCard;
