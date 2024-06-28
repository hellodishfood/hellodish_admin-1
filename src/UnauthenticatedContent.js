import { Routes, Route, Navigate } from 'react-router-dom';
// import { SingleCard } from './layouts';
import Login from "./Screens/Login";
// import { LoginForm} from './components';

export default function UnauthenticatedContent() {
  return (
    <Routes>
      <Route
        path='/Login' 
        element={
            <Login />
        }
      />
      <Route path='*' element={<Navigate to={'/Login'} />}></Route>
    </Routes>
  );
}
