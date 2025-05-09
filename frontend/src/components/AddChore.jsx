import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addChore, fetchChores } from '../redux/choreSlice';

const AddChoreForm = ({ day, onClose }) => {
  const dispatch = useDispatch();

  // Grab chore lists from Redux state
  const choreLists = useSelector((state) => state.chores.choreLists);

  const [selectedChoreId, setSelectedChoreId] = useState('');
  const [childName, setChildName] = useState('');

  // Fetch chores on mount
  useEffect(() => {
    dispatch(fetchChores());
  }, [dispatch]);

  // test to see if chores are populating from redux correctly
  useEffect(() => {
    console.log('Chore Lists:', choreLists);
  }, [choreLists]);

  // Extract templates (chores) from choreLists
  const templates = choreLists;
  const allChores = templates.flatMap((list) => list.chores);

  useEffect(() => {
    console.log('templates:', templates);
  }, [templates]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedChoreId || !childName) {
      alert('Please choose from both fields.');
      return;
    }

    // Find the selected chore by ID
    const selectedChore = templates
      .flatMap((template) => template.chores) // Flatten the array of chores from each template
      .find((chore) => chore._id === selectedChoreId); // Find the specific chore by ID

    if (!selectedChore) {
      alert('Chore not found!');
      return;
    }

    const newChore = {
      title: selectedChore.title,
      childId: childName,
      day: day, 
    };

    console.log('newChore:', newChore); 

    await dispatch(addChore(newChore));
    await dispatch(fetchChores());
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label>Choose a Chore:</label>
        <select
          value={selectedChoreId}
          onChange={(e) => setSelectedChoreId(e.target.value)}
        >
          <option value=''>-- Choose a chore --</option>
          {allChores.map((chore) => (
            <option key={chore._id} value={chore._id}>
              {chore.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Child Name:</label>
        <input
          type='text'
          value={childName}
          onChange={(e) => setChildName(e.target.value)}
          className='w-full border p-2 rounded'
        />
      </div>

      <div className='pt-4 flex space-x-4'>
        <button
          type='submit'
          className='w-1/2 bg-accentOrange text-white py-2 px-4 rounded-md hover:bg-accentOrangeDark transition duration-200'
        >
          Add Chore
        </button>
        <button
          type='button'
          onClick={onClose}
          className='w-1/2 border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 transition duration-200'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddChoreForm;
