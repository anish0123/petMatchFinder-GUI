import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
import RatingPage from './pages/RatingPage';
import NotFoundPage from './pages/NotFoundPage';

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
  const [username, setUsername] = useState<string>();
  const [role, setRole] = useState<string>();

  const checkTokenFromApi = async (token: string) => {
    const isTokenValid = await doGraphQLFetch(APIUrl, checkToken, {}, token);
    if (isTokenValid.checkToken?.message === 'Token is valid') {
      setUsername(isTokenValid.checkToken.user.user_name);
      setRole(isTokenValid.checkToken.user.role);
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

  if (!username) {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/petMatchFinder-GUI/" element={<LoginPage />} />,
            <Route path="/petMatchFinder-GUI/register" element={<RegisterationPage />} />,
          </Routes>
        </BrowserRouter>
      </>
    );
  } else {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/petMatchFinder-GUI/" element={<ListingPage />} />,
            <Route path="/petMatchFinder-GUI/register" element={<RegisterationPage />} />,
            <Route path="/petMatchFinder-GUI/login" element={<LoginPage />} />,
            <Route path="/petMatchFinder-GUI/animals/add" element={<AddAnimalPage />} />,
            <Route path="/petMatchFinder-GUI/animals/:animalId" element={<AnimalDetailPage />} />,
            <Route
              path="/petMatchFinder-GUI/animals/:animalId/adopt"
              element={<AnimalAdoptionPage />}
            />
            ,
            <Route path="/petMatchFinder-GUI/profile" element={<ProfilePage />} />,
            <Route path="/petMatchFinder-GUI/profile/update" element={<UpdateProfilePage />} />,
            <Route
              path="/petMatchFinder-GUI/animal-adoption/:adoptionId"
              element={<AnimalAdoptionDetailPage />}
            />
            ,
            <Route path="/petMatchFinder-GUI/profile/:userId" element={<ListerProfilePage />} />,
            <Route path="/petMatchFinder-GUI/profile/:userId/Rating" element={<RatingPage />} />,
            <Route
              path="/petMatchFinder-GUI/animals/:animalId/edit"
              element={<EditAnimalPage />}
            />
            {role === 'admin' && (
              <Route path="/petMatchFinder-GUI/categories" element={<Categories />} />
            )}
            <Route
                    path="*"
                    element={<NotFoundPage />}
                />
          </Routes>
        </BrowserRouter>
      </>
    );
  }
}
