import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import DayCard from '../components/DayCard';
import AddChild from './AddChild';

const WeekView = ({ chores }) => {
  const [localChores, setLocalChores] = useState([]);

  useEffect(() => {
    if (Array.isArray(chores)) {
      setLocalChores(chores);
    }
  }, [chores]);

  const toggleChoreStatus = (choreId) => {
    setLocalChores((prevChores) =>
      prevChores.map((chore) =>
        chore._id === choreId
          ? { ...chore, status: !chore.status }
          : chore
      )
    );
  };

  const { user } = useContext(UserContext);
  const canEdit = user?.type === 'parent';
  const canCheckOff = user?.type === 'child' || user?.type === 'parent';

  const [showAddChild, setShowAddChild] = useState(false);

  const validChores = localChores.filter(
    (chore) => chore && typeof chore === 'object' && chore.day
  );

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  ];

  return (
    <div>
      <div className='grid grid-cols-7 gap-4'>
        {daysOfWeek.map((day) => {
          const choresForDay = validChores.filter(
            (chore) => chore.day.toLowerCase() === day.toLowerCase()
          );

          return (
            <DayCard
              key={day}
              day={day}
              chores={choresForDay}
              canEdit={canEdit}
              canCheckOff={canCheckOff}
              onToggleStatus={toggleChoreStatus}
            />
          );
        })}
      </div>

      {canEdit && (
        <div>
          <button onClick={() => setShowAddChild(true)}>Add A New Child</button>
        </div>
      )}

      {showAddChild && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white rounded-xl p-6 max-w-md w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold text-primaryDark'>
                Add New Child
              </h3>
              <button
                onClick={() => setShowAddChild(false)}
                className='text-gray-500 hover:text-gray-700'
              >
                x
              </button>
            </div>
            <AddChild onClose={() => setShowAddChild(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeekView;
