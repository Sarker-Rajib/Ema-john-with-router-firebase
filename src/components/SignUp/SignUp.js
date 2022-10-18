import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import './SignUp.css';

const SignUp = () => {
   const [error, setError] = useState(null);
   const {createUser} = useContext(AuthContext);

   const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;
      const confirm = form.confirm.value;

      if (password.length < 6) {
         setError('Password must be at least 6 characters')
      }

      if (password !== confirm) {
         setError('Your password did not match')
      }
      // console.log(email, password, confirm);

      createUser(email, password)
      .then((result) => {
         const user = result.user;
         console.log(user);
         form.reset();
      })
      .catch((error) => {
         console.error('This is error', error);
      })
   }

   return (
      <div className="form-container">
         <h2 className="form-title">Sign Up</h2>
         <form onSubmit={handleSubmit}>
            <div className="form-control">
               <label htmlFor="email">Email</label>
               <input className="email-input" type="email" placeholder="Enter Your email" name="email" />
            </div>

            <div className="form-control">
               <label htmlFor="password">Password</label>
               <input className="password-input" type="password" placeholder="Enter Your password" name="password" />
            </div>

            <div className="form-control">
               <label htmlFor="confirm">Confirm Password</label>
               <input className="password-input" type="password" placeholder="Enter Your password" name="confirm" />
            </div>

            <div className="buttom-parent">
               <input type="submit" value="Login" className="btn btn-submit" />
               <br />
            </div>
         </form>
         <p>Already have an account <Link to="/logIn">Log in</Link></p>
         <p className="text-error">{error}</p>
      </div>
   );
};

export default SignUp;