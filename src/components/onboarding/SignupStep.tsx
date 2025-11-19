// import React, { useState } from 'react';
// // import { useOnboarding } from '../../hooks/useOnboarding';

// const SignupStep: React.FC = () => {
//     const { actions, state } = useOnboarding();
//     const [email, setEmail] = useState(state.email);
//     const [firstName, setFirstName] = useState(state.firstName);
//     const [lastName, setLastName] = useState(state.lastName);
//     const [error, setError] = useState<string | null>(null);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!email || !firstName || !lastName) {
//             setError('All fields are required');
//             return;
//         }
//         if (!/\S+@\S+\.\S+/.test(email)) {
//             setError('Invalid email format');
//             return;
//         }
//         actions.setEmail(email);
//         actions.setFirstName(firstName);
//         actions.setLastName(lastName);
//         actions.nextStep();
//     };

//     return (
//         <div className="onboarding-step">
//             <h2>Create Your Account</h2>
//             <p>Join EcommXpert in seconds — no credit card required.</p>

//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label>First Name</label>
//                     <input
//                         type="text"
//                         value={firstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         placeholder="John"
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Last Name</label>
//                     <input
//                         type="text"
//                         value={lastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         placeholder="Doe"
//                         required
//                     />
//                 </div>

//                 <div className="form-group">
//                     <label>Email Address</label>
//                     <input
//                         type="email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         placeholder="john@example.com"
//                         required
//                     />
//                 </div>

//                 {error && <p className="error">{error}</p>}

//                 <button type="submit" className="primary-cta">
//                     Continue
//                 </button>
//             </form>

//             <div className="divider">
//                 <span>or</span>
//             </div>

//             <button className="google-signin">
//                 <i className="fab fa-google"></i> Sign up with Google
//             </button>

//             <p className="microcopy">
//                 By continuing, you agree to our Terms and Privacy Policy.
//             </p>
//         </div>
//     );
// };

// export default SignupStep;