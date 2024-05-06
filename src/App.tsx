import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterationPage from './pages/RegisterationPage';
import {doGraphQLFetch} from './graphql/fetch';
import {APIUrl} from './constants';
import {checkToken} from './graphql/queries';
import ListingPage from './pages/ListingPage';
import AnimalDetailPage from './pages/AnimalDetailPage';
import AnimalAdoptionPage from './pages/AnimalAdoptionPage';
import ProfilePage from './pages/ProfilePage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import AnimalAdoptionDetailPage from './pages/AnimalAdoptionDetailPage';
import ListerProfilePage from './pages/ListerProfilePage';
import AddAnimalPage from './pages/AddAnimalPage';
import EditAnimalPage from './pages/EditAnimalPage';
import Categories from './pages/Categories';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

export default function App() {
  const token = localStorage.getItem('token');
  const [, setUsername] = useState<string>();

  const routes = [
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterationPage />,
    },
    {
      path: '/animals',
      element: <ListingPage />,
    },
    {
      path: '/animals/add',
      element: <AddAnimalPage />,
    },
    {
      path: '/animals/:animalId',
      element: <AnimalDetailPage />,
    },
    {
      path: '/animals/:animalId/adopt',
      element: <AnimalAdoptionPage />
    },
    {
      path: "/profile", 
      element: <ProfilePage />
    },
    {
      path: "/profile/update", 
      element: <UpdateProfilePage />
    },
    {
      path: "/animal-adoption/:adoptionId",
      element: <AnimalAdoptionDetailPage />
    },
    {
      path: "/profile/:userId",
      element: <ListerProfilePage />
    },
    {
      path: "/animals/:animalId/edit",
      element: <EditAnimalPage />
    },
    {
      path: "/categories",
      element: <Categories />
    }
  ];

  const router = createBrowserRouter(routes);

  const checkTokenFromApi = async (token: string) => {
    const isTokenValid = await doGraphQLFetch(APIUrl, checkToken, {}, token);
    if (isTokenValid.checkToken?.message === 'Token is valid') {
      setUsername(isTokenValid.checkToken.user.user_name);
    } 
  };

  useEffect(() => {
    if (token !== null) {
      try {
        checkTokenFromApi(token);
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
