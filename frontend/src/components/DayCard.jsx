import { useState } from 'react';
import AddChoreForm from './AddChore';

const DayCard = ({ day, chores }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="flex flex-col"> {/* New Parent Div to contain both parts in a reversed manner */}
    {/*
      New Chore Button
      - Daniel - moved button above the Day Card 
        for uniform appearance + maximized space for chore details
    */}
    <button
          onClick={() => setShowAddForm(true)}
          className='self-start bg-accentOrange text-white rounded-full px-4 py-2 text-sm font-semibold hover:bg-accentOrangeDark transition duration-200'
        >+ New Chore
        </button>

    {/* 
      Day Card 
        - Individual DayCard was too large with the change to 7 columns
        - original Tailwind className = 'bg-primaryDark text-white rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-96'
        - Daniel - adjusted width to match the new 7 column weekday calendar view
    */}
    <div className='bg-primaryDark text-white rounded-2xl shadow-lg p-5 flex flex-col gap-5 mt-6 w-full'>
      <h3 className='text-2xl font-bold tracking-wide'>{day.toUpperCase()}</h3>

      <div className='bg-surfaceLight rounded-xl p-4 flex flex-col gap-3'>
        {chores.length > 0 ? (
          <ul className='list-disc list-inside text-primaryDark space-y-1'>
            {chores.map((chore) => (
              <li
                key={chore._id}
                className='text-accentOrange text-base font-semibold'
              >
                {chore.childName} – {chore.choreName}
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-sm text-white/70 italic'>No chores assigned.</p>
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
