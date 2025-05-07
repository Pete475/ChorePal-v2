import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChore, fetchChores } from '../redux/choreSlice';

const AddChoreForm = ({ day, onClose }) => {
  const dispatch = useDispatch();
  const [choreName, setChoreName] = useState('');
  const [childName, setChildName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (choreName.trim() === '' || childName.trim() === '') {
      alert('Please fill in both fields.');
      return;
    }

    const newChore = {
      choreName,
      childName,
      day,
      isWeekly: false,
      isCompleted: false,
      rating: null,
      image: null,
    };

    await dispatch(addChore(newChore));
    await dispatch(fetchChores());
    onClose();
  };

  return (
    <div>
      {/*
      Previously had a duplicate that was also present in DayCard.jsx:
        <h3>Add New Chore for {day.toUpperCase()}</h3>
        - Daniel - removed duplicate on AddChore.jsx
      */}
      
      {/* Daniel - added className here to add vertical spacing between all child elements */}
      <form onSubmit={handleSubmit} className="space-y-4">  
        <div>
          <label>Chore Name:</label>
          <input
            type='text'
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
          />
        </div>
        <div>
          <label>Child Name:</label>
          <input
            type='text'
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
          />
        </div>

        {/* Daniel - created a container for the buttons, so they can easily be arranged side to side */}
        <div className="pt-4 flex space-x-4">
        {/* Daniel - made the two buttons the same size */}
        <button 
          type='submit'
          className="w-1/2 bg-accentOrange text-white py-2 px-4 rounded-md hover:bg-accentOrangeDark transition duration-200">
          Add Chore</button>
        <button 
          type='button' 
          onClick={onClose}
          className="w-1/2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200">
          Cancel</button>
          </div>
      </form>
    </div>
  );
};

export default AddChoreForm;
