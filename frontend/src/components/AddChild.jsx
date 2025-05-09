import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addChild } from '../redux/childSlice';

const AddChild = ({ onClose }) => {
  const [name, setName] = useState('');
  //   const [username, setUsername] = useState('');
  //   const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    //sent info to backend & create a new child (to do)

    try {
      await dispatch(addChild(name));
    //   await dispatch(fetchChildren());
      onClose();
    } catch (err) {
      console.error('Failed to add child:', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-1/2 bg-accentOrange text-white py-2 px-4 rounded-md hover:bg-accentOrangeDark transition duration-200'
    >
      <label className='block text-sm font-medium text-gray-700'>
        Name:
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      {/* <label className='block text-sm font-medium text-gray-700'>
        Username:
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label className='block text-sm font-medium text-gray-700'>
        Password:
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label> */}
      <button className='flex space-x-4 pt-4' type='submit'>
        Create Child
      </button>
    </form>
  );
};

export default AddChild;
