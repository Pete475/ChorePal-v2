import { useContext, useState } from 'react';
import { UserContext } from '../components/UserContext';
import DayCard from '../components/DayCard';
import AddChild from './AddChild';

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];

const WeekView = ({ chores }) => {
  {
    /* Daniel - Added validChores filter to eliminate loading error w/ chores missing fields */
  }
  const validChores = Array.isArray(chores)
    ? chores.filter((chore) => chore && typeof chore === 'object' && chore.day)
    : [];

  //pull in user info from user context container
  const { user } = useContext(UserContext);
  //boolean saying if user.type strictly equal to parent, then canEdit is set to true
  const canEdit = user?.type === 'parent';
  const canCheckOff = user?.type === 'child';
  const [showAddChild, setShowAddChild] = useState(false);

  return (
    <div>
      <div className='grid grid-cols-7 gap-4'>
        {daysOfWeek.map((day) => {
          const choresForDay = validChores.filter(
            (chore) => chore.day.toLowerCase() === day
          );
          {
            /*
          Previously, this part was causing an error:
            - (chore) => chore.day.toLowerCase() === day
            - Uncaught TypeError: Cannot read properties of null (reading 'toLowerCase')
            - Daniel - added a filter function above the original logic to ensure proper loading of website
        */
          }

          return (
            <DayCard
              key={day}
              day={day}
              chores={choresForDay}
              canEdit={canEdit}
              canCheckOff={canCheckOff}
            />
          );
        })}
      </div>
      
      {canEdit && (
        <div className=''>
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
