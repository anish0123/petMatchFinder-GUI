import {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import UpdateProfileForm from '../components/UpdateProfileForm';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {checkToken} from '../graphql/queries';
import {User} from '../types/User';

const UpdateProfilePage = () => {
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      if (response.checkToken) {
        setUser(response.checkToken.user);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="w-screen h-screen grid grid-rows-8">
      <NavBar />
      <UpdateProfileForm user={user} />
    </div>
  );
};

export default UpdateProfilePage;
