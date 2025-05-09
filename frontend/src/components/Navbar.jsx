import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext'; 
import { useContext } from 'react'; 

const Navbar = () => {
  const { logout, user } = useContext(UserContext); 
 //useContext logout (onclick button) will take curr. user out of localStorage (and associated token)
 // the ?. in welcome {user?.name} simply means to not crash if no user.name found in local storage 

  return (
    <div className='flex justify-between sm:px-10'>
        {/* 5/6 - Daniel
          - Added overarching Navbar div to better control flex
        */}
    <div className='flex items-center'>
      <img
        src='../../public/chorepal-logo-optimized.png'
        className="w-32 h-32 md:w-[150px] md:h-[150px]"
      ></img>
        {/* 5/6 - Daniel
          - Originally, this img had 'width/height='150''
          - Changed to 'className="w-32 h-32 md:w-[150px] md:h-[150px]' 
            to better control responsiveness
        */}
      <div>
        <h1 className='text-5xl md:text-6xl text-white font-extrabold drop-shadow-sm'>
          ChorePal
        </h1>
        <h3 className='text-xl md:text-2xl font-semibold text-[#FFD166] mt-1 sm:mt-2'>
          Plan it. Do it.
        </h3>
          {/* 5/6 - Daniel
          - Added different sizes to headings here for responsiveness
        */}
      </div>
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
        <h4 className="hidden sm:block" style={{ color: 'white'}}>Welcome {user?.name}!</h4>
        <h5 className="hidden sm:block" style={{ color: 'orange'}}>{user?.type} View</h5> 
        {/* 5/6 - Daniel
          - Separated original h4 into new line for increased responsiveness 
          - Added 'hidden sm:block' to hide those headings on very small screens 
        */}
    </div>
    </div>
  );
};

export default Navbar;

// import { Link } from 'react-router-dom';
// import { pageData } from './pageData';
// import { useNavigate } from 'react-router-dom';

// export function Navbar() {
//   const navigate = useNavigate();

//   function handleLogout() {
//     sessionStorage.removeItem('User');
//     navigate('/');
//   }

//   return (
//     <div className='navbar'>
//       {pageData.map((page) => {
//         return (
//           <Link to={page.path} className='navItem' key={page.path}>
//             <button>{page.name}</button>
//           </Link>
//         );
//       })}
//         <button onClick={handleLogout} className='logoutButton'>
//         Log Out
//         </button>

//     </div>
//   );
// }
