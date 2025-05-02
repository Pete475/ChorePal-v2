import { useContext } from 'react'; 
import { UserContext } from '../components/UserContext'; 
import DayCard from '../components/DayCard';

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
  //pull in user info from user context container 
  const { user } = useContext(UserContext); 
  //boolean saying if user.type strictly equal to parent, then canEdit is set to true 
  const canEdit = user?.type === 'parent'; 

  return (
    <div className='grid grid-cols-4 gap-4'>
      {daysOfWeek.map((day) => {
        const choresForDay = chores.filter(
          (chore) => chore.day.toLowerCase() === day
        );

        return <DayCard key={day} day={day} chores={choresForDay} canEdit={canEdit} />;
      })}
    </div>
  );
};

export default WeekView;

