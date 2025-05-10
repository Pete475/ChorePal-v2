import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext'; 
import { useContext, useState } from 'react'; 
import AddChild from './AddChild';

const Navbar = () => {
  const { logout, user } = useContext(UserContext); 
 // useContext logout (onclick button) will take curr. user out of localStorage (and associated token)
 // the ?. in welcome {user?.name} simply means to not crash if no user.name found in local storage 

  // boolean saying if user.type strictly equal to parent, then createChild is set to true
  const createChild = user?.type === 'parent';
  const [showAddChild, setShowAddChild] = useState(false);


  return (
    <div className='bg-gradient-to-b from-[#0C4A6E] to-[#075985] flex justify-between sm:px-10 pb-3 rounded-b-4xl mb-5'>
        {/* 5/6 - Daniel
          - Added overarching Navbar div to better control flex
        */}
    <div className='flex items-center mt-2'>
      <img
        src='../../public/logo.png'
        className="w-25 h-25 md:w-[110px] md:h-[110px] m-4 rounded-2xl "
      ></img>
        {/* 5/6 - Daniel
          - Originally, this img had 'width/height='150''
          - Changed to 'className="w-32 h-32 md:w-[150px] md:h-[150px]' 
            to better control responsiveness
        */}
      <div>
        <h1 className='text-4xl md:text-5xl text-white font-extrabold drop-shadow-sm'>
          ChorePal
        </h1>
        <h3 className='text-xl md:text-2xl font-semibold text-[#FFD166] mt-1 ml-2 sm:mt-2'>
          Plan it. Do it.
        </h3>
          {/* 5/6 - Daniel
          - Added different sizes to headings here for responsiveness
        */}
      </div>
      </div>

      <div className="absolute hidden lg:block -top-3 right-60 w-45 h-45 z-2 pointer-events-none">
        <img 
          src="../../public/relax.gif"  
          className="w-full h-full object-contain"
        />
      </div>

      <div className='justify-center flex flex-col ml-6 mr-6 items-end'>
        {/* 5/6 - Daniel
          - Originally, this div had 'ml-auto mr-5'
          - Changed to 'justify-center flex flex-col sm:ml-6 sm:mr-6 items-end' 
            in conjunction with above addition of overarching Navbar div
        */}
        <Link to='/'>
          <button 
            onClick={logout} 
            className="bg-[#FF6B6B] hover:bg-[#FF5252] text-white px-4 py-1 rounded-lg transition duration-200"
            >Log Out</button> 
        </Link>
        <h4 className="hidden sm:block" style={{ color: 'white'}}>Welcome {user?.username}!</h4>
        <h5 className="hidden sm:block" style={{ color: 'orange'}}>{user?.type} View</h5>

        {/* 5/6 - Daniel
          - Separated original h4 into new line for increased responsiveness 
          - Added 'hidden sm:block' to hide those headings on very small screens 
        */}

        {createChild && (
        <button 
          onClick={() => setShowAddChild(true)}
          className='px-2 rounded-md mt-1'>
            Add Child
        </button>
        )}
        
        {/* 5/8 - Daniel
          - Moved Add Child button and its conditionals from Weekview.jsx to Navbar.jsx 
        */}

      {showAddChild && (
        <div className='fixed inset-0 bg-gradient-to-t from-[#7DD3FC] via-[#F1F5F9] to-[#FF9E80] bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-gradient-to-b from-[#0C4A6E] to-[#075985] rounded-xl p-6 max-w-md w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-xl font-bold text-white'>
                Add New Child
              </h3>

              <div className="absolute bottom-2 right-4 lg:bottom-10 lg:right-20 w-45 h-45 lg:w-60 lg:h-60 z-2 pointer-events-none">
                <img 
                  src="../../public/mirror.gif"  
                  className="w-full h-full object-contain"
                />
              </div>

              <button
                onClick={() => setShowAddChild(false)}
                className='text-white hover:text-gray-700 rounded-full -pt-4 px-2.5 pb-1'>
                x
              </button>
            </div>
            <AddChild onClose={() => setShowAddChild(false)} />
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Navbar;