import { useState, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import 'tailwindcss';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // 5/8 - Daniel - Added for error popup

  const BASE_URL = 'http://localhost:3000';

  //grabs login function from UserContext page
  const { login } = useContext(UserContext);

  async function handleSubmit(e) {
    e.preventDefault();

    const endpoint = isLoginMode ? '/api/auth/login' : '/api/auth/register';
    const payload = isLoginMode
      ? { email, password }
      : { email, password, username: name, type: 'parent' };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Check if the response is actually JSON before trying to parse it
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected JSON response but got ${contentType}`);
      }

      const data = await response.json();

      if (isLoginMode) {
        if (data.token) {
          setSuccess(true);
          setError('');
          localStorage.setItem('token', data.token);
          //updates userContext data & local storage so user can persist until logout
          // for Kevin -> should DB Object be structured as below??
          // { "success" : true/false, "token" : "token code here", "user": { "name": "Name Here", "type": "parent"}}
          login(data.user);
          window.location.href = '/dashboard';
        } else {
          setError(data.message);
          setSuccess(false);
        }
      } else {
        if (data._id) {
          setSuccess(true);
          setError('');
          setIsLoginMode(true);
        } else {
          setError(data.message || 'Failed to create account');
          setSuccess(false);
        }
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
      setShowErrorModal(true); // 5/8 - Daniel - added for error popup
      setSuccess(false);
    }
  }

  function switchMode() {
    setIsLoginMode(!isLoginMode);
    setError('');
    setSuccess(false);
    setEmail('');
    setPassword('');
    setName('');
  }

  return (
    // Apply the same gradient background as Dashboard
    <div className="min-h-screen bg-gradient-to-b from-[#78C0E0] to-[#5DA9E9] flex items-center justify-center p-4">
      {/* Similar styling to DayCard component */}
      <div className="bg-gradient-to-b from-[#003459] to-[#00171F] text-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        {/* Logo and Title Section */}
        <div className="flex flex-col items-center mb-2">
          <img 
            src="../../public/chorepal-logo-optimized.png" 
            className="w-24 h-24" 
            alt="ChorePal Logo" 
          />
          <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">ChorePal</h1>
          <h3 className="text-xl font-semibold text-[#FFD166] mt-1">Plan it. Do it.</h3>
        </div>

        {/* Credential Form Container */}
        <div className="bg-surfaceLight rounded-xl pt-3 pl-5 pr-5 pb-3">
          <form onSubmit={handleSubmit} className="text-primaryDark">
            {!isLoginMode && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-white font-semibold mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accentOrange"
                />
              </div>
            )}

            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-semibold mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accentOrange"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-white font-semibold mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accentOrange mb-2"
              />
            </div>

            {/* Primary Button - Similar to "+ New Chore" button */}
            <div className="flex justify-center">
            <button 
              type="submit"
              className="w-40 bg-[#FF6B6B] text-white rounded-xl px-4 py-2 text-md font-semibold hover:bg-accentOrangeDark transition duration-200"
            >
              {isLoginMode ? 'Log In' : 'Create Account'}
            </button>
            </div>
          </form>
          </div>
            <div className='flex justify-center mb-10'>
          {/* Secondary Action Button */}
          <button 
            onClick={switchMode} 
            className="w-40 mt-4 bg-transparent border border-[#FFD166] text-[#FFD166] rounded-xl px-4 py-2 text-sm font-semibold hover:bg-white/10 transition duration-200"
          >
            {isLoginMode ? 'Create Account' : 'Log In'}
          </button>
          </div>

          <div className="mb-6">
          {/* Status Messages */}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
          {success && (
            <p className="mt-4 text-green-400 text-center">
              {isLoginMode
                ? 'Login successful!'
                : 'Account created! Please login.'}
            </p>
          )}
          </div>

          {/* Error Modal Popup */}
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

      </div>
    </div>
  );
}

export default Login;
