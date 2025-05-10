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
      {/* Daniel - added className here to add vertical spacing between all child elements */}
      <form onSubmit={handleSubmit} className="space-y-4">  
        <div>
          <label className='text-md font-semibold text-[#FFD166] mt-1 sm:mt-2'>Chore Name:</label>
          <input
            type='text'
            value={choreName}
            onChange={(e) => setChoreName(e.target.value)}
            className='bg-white ml-3 w-50 px-1 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accentOrange'
          />
        </div>
        <div>
          <label className='text-md font-semibold text-[#FFD166] mt-1 sm:mt-2'>Child Name:</label>
          <input
            type='text'
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className='bg-white ml-4.5 w-50 px-1 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accentOrange'
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
          className="w-1/2 text-white py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200">
          Cancel</button>
          </div>
      </form>
    </div>
  );
};

export default AddChoreForm;
