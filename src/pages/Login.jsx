// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { assets } from '../assets/assets';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// import { doc, setDoc } from 'firebase/firestore';
// import { auth, firestore } from '../firebase';

// const Login = () => {
//   const navigate = useNavigate();
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     setEmail('');
//     setPassword('');
//     setName('');
//     setError('');
//   }, [isLogin]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       if (isLogin) {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         navigate('/');
//       } else {
//         const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//         const user = userCredential.user;

//         await setDoc(doc(firestore, "users", user.uid), {
//           name: name,
//           email: email,
//           createdAt: new Date(),
//         });

//         navigate('/');
//       }
//     } catch (error) {
//       console.error('Auth error details:', error.code, error.message);

//       if (error.code === 'auth/configuration-not-found') {
//         setError('Authentication service is not properly configured. Please contact support.');
//       } else if (error.code === 'auth/invalid-email') {
//         setError('Please enter a valid email address.');
//       } else if (error.code === 'auth/wrong-password') {
//         setError('Incorrect password. Please try again.');
//       } else if (error.code === 'auth/user-not-found') {
//         setError('No account found with this email. Please sign up.');
//       } else if (error.code === 'auth/email-already-in-use') {
//         setError('This email is already registered. Please login instead.');
//       } else if (error.code === 'auth/weak-password') {
//         setError('Password should be at least 6 characters.');
//       } else {
//         setError(`Authentication failed: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGuestLogin = () => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       navigate('/');
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black text-white">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <img className="mx-auto h-24 w-auto" src={assets.logo} alt="Beauty Services Logo" />
//           <h2 className="mt-6 text-3xl font-extrabold">
//             {isLogin ? 'Sign in to your account' : 'Create a new account'}
//           </h2>
//           <p className="mt-2 text-sm text-gray-300">
//             {isLogin ? 'Enter your details to access your account' : 'Fill in your information to create an account'}
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             {!isLogin && (
//               <div>
//                 <label htmlFor="name" className="sr-only">Full Name</label>
//                 <input
//                   id="name"
//                   name="name"
//                   type="text"
//                   required={!isLogin}
//                   className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
//                   placeholder="Full Name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                 />
//               </div>
//             )}
//             <div>
//               <label htmlFor="email-address" className="sr-only">Email address</label>
//               <input
//                 id="email-address"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-400 text-white ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent`}
//                 placeholder="Email address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div>
//               <label htmlFor="password" className="sr-only">Password</label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 autoComplete={isLogin ? "current-password" : "new-password"}
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>

//           {isLogin && (
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-offset-gray-800"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
//                   Remember me
//                 </label>
//               </div>

//               <div className="text-sm">
//                 <a href="#" className="font-medium text-gray-300 hover:text-white">
//                   Forgot your password?
//                 </a>
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-900 text-white px-4 py-2 rounded-md text-sm">
//               {error}
//             </div>
//           )}

//           <div className="flex flex-col gap-3">
//             <button
//               type="submit"
//               disabled={loading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-300"
//             >
//               {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
//             </button>

//             <button
//               type="button"
//               onClick={handleGuestLogin}
//               disabled={loading}
//               className="group relative w-full flex justify-center py-3 px-4 border border-white text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-300"
//             >
//               Continue as guest
//             </button>
//           </div>
//         </form>

//         <div className="text-center mt-4">
//           <button
//             onClick={() => setIsLogin(!isLogin)}
//             className="font-medium text-gray-300 hover:text-white transition-colors duration-300"
//           >
//             {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggleForm = () => {
    // Clear form fields immediately when toggling between login and signup
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    // Then toggle the form type
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await setDoc(doc(firestore, "users", user.uid), {
          name: name,
          email: email,
          createdAt: new Date(),
        });

        navigate('/');
      }
    } catch (error) {
      console.error('Auth error details:', error.code, error.message);

      if (error.code === 'auth/configuration-not-found') {
        setError('Authentication service is not properly configured. Please contact support.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/user-not-found') {
        setError('No account found with this email. Please sign up.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('This email is already registered. Please login instead.');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else {
        setError(`Authentication failed: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <img className="mx-auto h-24 w-auto" src={assets.logo} alt="Beauty Services Logo" />
          <h2 className="mt-6 text-3xl font-extrabold">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            {isLogin ? 'Enter your details to access your account' : 'Fill in your information to create an account'}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required={!isLogin}
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-400 text-white rounded-t-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-400 text-white ${isLogin ? 'rounded-t-md' : ''} focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent`}
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-900 placeholder-gray-400 text-white rounded-b-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-800 border-gray-600 rounded focus:ring-offset-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-gray-300 hover:text-white">
                  Forgot your password?
                </a>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-900 text-white px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-300"
            >
              {loading ? 'Processing...' : isLogin ? 'Sign in' : 'Sign up'}
            </button>

            <button
              type="button"
              onClick={handleGuestLogin}
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-white text-sm font-medium rounded-md text-white bg-transparent hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors duration-300"
            >
              Continue as guest
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleToggleForm}
            className="font-medium text-gray-300 hover:text-white transition-colors duration-300"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default Login;