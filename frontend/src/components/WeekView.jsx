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

  {/* 
  Controls how weekdays appear in a grid
    - original Tailwind className = 'grid grid-cols-4 gap-4'
    - Daniel - changed to 7 columns for a traditional calendar view
  */}

  {/* Daniel - Added validChores filter to eliminate loading error w/ chores missing fields */}
  const validChores = Array.isArray(chores) 
    ? chores.filter(chore => chore && typeof chore === 'object' && chore.day)
    : [];
    

  //pull in user info from user context container 
  const { user } = useContext(UserContext); 
  //boolean saying if user.type strictly equal to parent, then canEdit is set to true 
  const canEdit = user?.type === 'parent'; 


  return (
    <div className='grid grid-cols-7 gap-4'>
      {daysOfWeek.map((day) => {
        const choresForDay = validChores.filter(
          (chore) => chore.day.toLowerCase() === day
        );  
        {/*
          Previously, this part was causing an error:
            - (chore) => chore.day.toLowerCase() === day
            - Uncaught TypeError: Cannot read properties of null (reading 'toLowerCase')
            - Daniel - added a filter function above the original logic to ensure proper loading of website
        */}

        return <DayCard key={day} day={day} chores={choresForDay} canEdit={canEdit} />;
      })}
    </div>
  );
};

export default WeekView;

