// import { Routes, Route, Navigate } from 'react-router-dom';
// // import { SingleCard } from './layouts';
// import Login from "./Screens/Login";
// // import { LoginForm} from './components';

// export default function UnauthenticatedContent() {
//   return (
//     <Routes>
//       <Route
//         path='/Login' 
//         element={
//             <Login />
//         }
//       />
//       <Route path='*' element={<Navigate to={'/Login'} />}></Route>
//     </Routes>
//   );
// }


import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "./Screens/Login"; // Replace with actual component path
import Restrontpolicy from './Screens/Restrontpolicy';
import Userorder from './Screens/Userorder';
import Pickupdeleary from './Screens/Pickupdeleary';
import Privicy from './Screens/Privicy';



export default function UnauthenticatedContent() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Restrontpolicy" element={<Restrontpolicy />} /> 
      <Route path="*" element={<Navigate to="/Login" />} /> 
      <Route path="/Userorder" element={<Userorder />} /> 
      <Route path="/Pickupdeleary" element={<Pickupdeleary />} /> 
      <Route path="/Privicy" element={<Privicy />} /> 
    </Routes>
  );
}