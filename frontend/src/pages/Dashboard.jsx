import { useDispatch, useSelector } from 'react-redux';
import { fetchChores } from '../redux/choreSlice';
import { useEffect, useState } from 'react';
import WeekView from '../components/WeekView';
import Navbar from '../components/Navbar';
import { UserContext } from '../components/UserContext';

function Dashboard() {
  const dispatch = useDispatch();
  const { chores, loading, error } = useSelector((state) => state.chores);
  const [showErrorModal, setShowErrorModal] = useState(false); // 5/8 - Daniel - Added for error popup

  useEffect(() => {
    dispatch(fetchChores());
  }, [dispatch]);

  // Show error modal when an error occurs
  useEffect(() => {
    if (error) {
      setShowErrorModal(true);
    }
  }, [error]);

  return (
    <div className='min-h-screen bg-gradient-to-b from-[#78C0E0] to-[#5DA9E9]'>
      {/* 5/6 - Daniel
        - Added className here to eliminate whitespace at the bottom */}
      <Navbar />
      {loading && <p>Loading chores...</p>}

      {/* 5/8 - Daniel 
          - Added Error Modal Popup */}
      {showErrorModal && error && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-lg text-primaryDark">
                <h3 className="text-center text-xl font-bold text-red-500 mb-4">Error</h3>
                <p className="text-center mb-6">{error}</p>
                <div className="flex justify-center">
                  <button 
                    onClick={() => setShowErrorModal(false)}
                    className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          )}
      <WeekView chores={chores} />
    </div>
  );
}

export default Dashboard;
