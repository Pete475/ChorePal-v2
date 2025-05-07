import { Link } from 'react-router-dom';
import { UserContext } from '../components/UserContext'; 
import { useContext } from 'react'; 

const Navbar = () => {
  const { logout, user } = useContext(UserContext); 
 //useContext logout (onclick button) will take curr. user out of localStorage (and associated token)
 // the ?. in welcome {user?.name} simply means to not crash if no user.name found in local storage 

  return (
    <div className='flex items-center'>
      <img
        src='../../public/chorepal-logo-optimized.png'
        width='150'
        height='150'
      ></img>
      <div>
        <h1 className='text-6xl text-white font-extrabold drop-shadow-sm'>
          ChorePal
        </h1>
        <h3 className='text-2xl font-semibold text-accentOrange mt-2'>
          Plan it. Do it.
        </h3>

      </div>
      <div className='ml-auto mr-5'>
        <Link to='/'>
          <button onClick={logout} >Log Out</button> 
        </Link>
        <h4 style={{ color: 'white'}}>welcome {user?.name}! You are in {user?.type} view</h4>
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
