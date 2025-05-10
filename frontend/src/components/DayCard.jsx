import { useState, useEffect } from 'react';
import AddChoreForm from './AddChore';
import { useDispatch } from 'react-redux';
import { toggleChoreCompleted } from '../redux/choreSlice';

const DayCard = ({ day, chores, canEdit, canCheckOff }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isParent, setIsParent] = useState(null);
  const [isChild, setIsChild] = useState(null);

  const dispatch = useDispatch();
  const handleToggleChore = (choreId) => {
    dispatch(toggleChoreCompleted(choreId));
  };

  // if canEdit changes, useEffect will run -- setting isParent
  useEffect(() => {
    if (canEdit) {
      setIsParent(true);
    }
  }, [canEdit]);

  //if canCheckOff changes, useEffect will run - setting isChild to true
  useEffect(() => {
    if (canCheckOff) {
      setIsChild(true);
    }
  }, [canCheckOff]);

  //conditional isParent (with button below) makes it so button to add chores only shows up if user.type === 'parent'
  return (
    <div className='h-full w-full flex flex-col bg-white rounded-md pl-1 pr-1 z-10'>
      {/* New Parent Div to contain both parts in a reversed manner */}      
    {/* 
      Day Card 
        - Individual DayCard was too large with the change to 7 columns
        - original Tailwind className = 'bg-primaryDark text-white rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-96'
        - Daniel - adjusted width to match the new 7 column weekday calendar view
    */}
      <div className='bg-[#fefee5] border-[0.5px] border-gray-700 text-black rounded-md shadow-lg pt-2 flex flex-col gap-2 mt-1 mb-1 w-full h-full'>
        <h3 className='text-center text-xl font-bold tracking-wide'>
          {day.toUpperCase()}
        </h3>

        {/*
          New Chore Button
            - Daniel - moved button below each day in the Day Card 
                       for uniform appearance + maximized space for chore details
        */}
        
        {isParent && (  
        <button
          onClick={() => setShowAddForm(true)}
          className='self-center bg-[#FF6B6B] text-white rounded-full px-2 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'
          >+ New Chore
        </button>
        )}

        <div className='bg-surfaceLight rounded-xl p-3 flex flex-col gap-3 overflow-y-auto h-full'>
          {chores.length > 0 ? (
            <ul className='list-disc list-inside text-primaryDark space-y-1'>
              {chores.map((chore) => (
                <li
                  key={chore._id}
                  className='text-accentOrange text-base font-semibold'
                >
                  {isChild && (
                    <input
                      type='checkbox'
                      checked={chore.completed}
                      onChange={() => handleToggleChore(chore.id)}
                      className='mr-2'
                    />
                  )}
                  {chore.childName} – {chore.choreName}
                </li>
              ))}
            </ul>
          ) : (
            <p className='text-center text-sm text-black italic mb-2'>No chores assigned.</p>
          )}

          {/*
        Logic for "+ New Chore" Popup
          - Previously, clicking on "Add New Chore" revealed a hidden div within the Day Card
          - {showAddForm && (
            <AddChoreForm day={day} onClose={() => setShowAddForm(false)}

          - Daniel changed this to a popup instead to:
              1. Maximize chore display space
              2. Eliminate visual clutter when adding a chore
        */}

          {showAddForm && (
            <div className='fixed inset-0 bg-gradient-to-t from-[#7DD3FC] via-[#F1F5F9] to-[#FF9E80] bg-opacity-2 flex items-center justify-center z-50'>
              <div className='bg-primaryDark rounded-xl p-6 max-w-md w-full'>
                <div className='flex justify-between items-center mb-4'>
                  <h3 className='text-xl font-bold text-white'>
                    Add Chore for {day.toUpperCase()}
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className='text-white items-center hover:text-gray p-1 rounded-md'>
                    x
                  </button>
                </div>
                <AddChoreForm day={day} onClose={() => setShowAddForm(false)} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-60 -left-2 w-20 h-20 pointer-events-none">
                <img 
                  src="../../public/tree.gif"  
                  className="w-full h-full object-contain"
                />
              </div>

      <div className="absolute bottom-0 right-10 w-20 h-20 pointer-events-none">
        <img 
          src="../../public/sleepy.gif"  
          className="w-full h-full object-contain"
        />
      </div>

      <div className="absolute bottom-0 left-10 w-24 h-24 pointer-events-none">
        <img 
          src="../../public/heart.gif"  
          className="w-full h-full object-contain"
        />
      </div>

    </div>
  );
};

export default DayCard;
