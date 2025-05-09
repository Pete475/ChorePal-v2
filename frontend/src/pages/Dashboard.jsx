import { useDispatch, useSelector } from 'react-redux';
import { fetchChores } from '../redux/choreSlice';
import { useEffect } from 'react';
import WeekView from '../components/WeekView';
import Navbar from '../components/Navbar';
import { UserContext } from '../components/UserContext';

function Dashboard() {
  const dispatch = useDispatch();
  const { chores, loading, error } = useSelector((state) => state.chores);

  useEffect(() => {
    dispatch(fetchChores());
  }, [dispatch]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#78C0E0] to-[#5DA9E9]'>
      {/* 5/6 - Daniel
        - Added className here to eliminate whitespace at the bottom
      */}
      <Navbar />
      {loading && <p>Loading chores...</p>}
      {error && <p>Error: {error}</p>}
      <WeekView chores={chores} />
    </div>
  );
}

export default Dashboard;
