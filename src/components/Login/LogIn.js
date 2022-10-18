import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/UserContext';
import './LogIn.css';

const LogIn = () => {
   const { signIn } = useContext(AuthContext);
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';

   const handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value;
      const password = form.password.value;


      signIn(email, password)
         .then((result) => {
            const user = result.user;
            console.log(user);
            form.reset();
            navigate(from, {replace: true})
         })
         .catch((error) => {
            console.error('This is error', error);
         })
   }

   return (
      <div className="form-container">
         <h2 className="form-title">Log In</h2>
         <form onSubmit={handleSubmit}>
            <div className="form-control">
               <label htmlFor="email">Email</label>
               <input className="email-input" type="email" placeholder="Enter Your email" name="email" />
            </div>

            <div className="form-control">
               <label htmlFor="password">Password</label>
               <input className="password-input" type="password" placeholder="Enter Your password" name="password" />
            </div>

            <div className="buttom-parent">
               <input type="submit" value="Login" className="btn btn-submit" />
               <br />
            </div>
            <p>New to ema-john <Link to="/signUp">Sign Up Now</Link></p>
         </form>
      </div>
   );
};

export default LogIn;