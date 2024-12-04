import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import CreateASpotPage from './components/CreateASpotPage/CreateASpotPage'
import SignupFormPage from './components/SignupFormModal/SignupFormModal';
import Navigation from './components/Navigation/Navigation';
import * as sessionActions from './store/session';
import Spots from './components/Spots/Spots';
import SpotDetailsPage from './components/SpotDetailsPage/SpotDetailsPage';
import UserSpotsPage from './components/UserSpots/UserSpotsPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Spots />
      },
      {
        path: '/spots/create',
        element: <CreateASpotPage />
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      },
      {
        path: "/spots/:spotId",
        element: <SpotDetailsPage />
      },
      {
        path: "/spots/:spotId/current",
        element: <UserSpotsPage />
      },
      

    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
