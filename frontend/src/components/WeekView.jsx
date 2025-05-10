import { useContext } from 'react';
import { UserContext } from '../components/UserContext';
import DayCard from '../components/DayCard';

const daysOfWeek = [
  'sun',
  'mon',
  'tue',
  'wed',
  'thu',
  'fri',
  'sat'
];
  {/* Daniel - changed order so that Sunday comes first, like a regular calendar */}

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

  return (
    <div className="px-12">
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-1.5 h-[72vh]'>
      {daysOfWeek.map((day) => {
        const choresForDay = validChores.filter(
          (chore) => chore.day.toLowerCase() === day
        );  

          return (
            <div key={day} className="border border-gray-500 min-h-64 rounded-md">
            <DayCard
              key={day}
              day={day}
              chores={choresForDay}
              canEdit={canEdit}
              canCheckOff={canCheckOff}
            />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WeekView;
