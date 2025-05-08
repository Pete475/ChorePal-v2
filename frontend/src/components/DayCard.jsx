import { useState, useEffect } from 'react';
import AddChoreForm from './AddChore';

const DayCard = ({ day, chores, canEdit }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [isParent, setIsParent] = useState(null);

  // if canEdit changes, useEffect will run -- setting isParent
  useEffect(() => {
    if (canEdit) {
      setIsParent(true);
    }
  }, [canEdit]);

  //conditional isParent (with button below) makes it so button to add chores only shows up if user.type === 'parent'
  return (
    <div className="flex flex-col w-full"> {/* New Parent Div to contain both parts in a reversed manner */}
    {/* 5/3 - Daniel
        - Individual DayCard was too large with the change to 7 columns
        - original Tailwind className = 'bg-primaryDark text-white rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-96'
        - adjusted width to match the new 7 column weekday calendar view

        5/6 - Daniel
        - adjusted responsiveness
            - minimum of 2 columns will always show
            - this fixed an issue with the words either poking out or disappearing
        - added 'break-words' to account for long words when site is shrunk
    */}
    <div className='bg-gradient-to-b from-primaryDark to-[#1a2844] text-white rounded-2xl shadow-lg p-5 flex flex-shrink-0 flex-col gap-5 mt-6 w-full'>
      <h3 className='text-xl font-bold tracking-wide truncate text-center'>{day.toUpperCase()}</h3>
      {/*
      New Chore Button
      - Daniel - moved button below each day in the Day Card 
        for uniform appearance + maximized space for chore details
    */}
        <button
          onClick={() => setShowAddForm(true)}
          className='self-center bg-accentOrange text-white rounded-full px-2 py-1 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'
        >+ New Chore
        </button>

      <div className='bg-surfaceLight rounded-xl p-4 flex flex-col gap-3'>
        {chores.length > 0 ? (
          <ul className='list-disc list-inside text-primaryDark space-y-1'>
            {chores.map((chore) => (
              <li
                key={chore._id}
                className='text-base font-semibold list-none'
              ><div className='flex items-center flex-col mb-4 rounded hover:bg-blue-800/30'>
                  <div className="text-accentOrange">{chore.childName}</div>
                  <div className="text-white">{chore.choreName}</div>
                </div>
                  {/* 5/6 - Daniel 
                      - Inserted div inside li for Tailwind control
                  */}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-md text-white/70 italic text-center'>No chores assigned.</p>
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


        {isParent && (
          <button
            onClick={() => setShowAddForm(true)}
            className='self-start bg-accentOrange text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'
          >
            Add New Chore
          </button>
        )}

        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-primaryDark">Add Chore for {day.toUpperCase()}</h3>
                  <button 
                    onClick={() => setShowAddForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >x
                  </button>
              </div>
              <AddChoreForm day={day} onClose={() => setShowAddForm(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default DayCard;
