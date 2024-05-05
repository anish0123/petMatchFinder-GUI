import {useEffect, useState} from 'react';
import {User} from '../types/User';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {getAnimalsByOwner, getUserById} from '../graphql/queries';
import NavBar from '../components/NavBar';
import {Animal} from '../types/Animal';
import AnimalContainer from '../components/AnimalContainer';
import { useParams } from 'react-router-dom';

const ListerProfilePage = () => {
  const [user, setUser] = useState<User>();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const token = localStorage.getItem('token');
  const {userId} = useParams();

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, getUserById, {
        userByIdId: userId
      }, token!);
      if (response.userById) {
        setUser(response.userById);
      }
      const animalsResponse = await doGraphQLFetch(
        APIUrl,
        getAnimalsByOwner,
        {
          ownerId: response.userById.id,
        },
        token!,
      );
      
      console.log("animalsResponse: ", animalsResponse);
      if (animalsResponse.animalsByOwner) {
        
        setAnimals(animalsResponse.animalsByOwner);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="px-10 py-16">
        <div className="grid grid-cols-4">
          <div>
            <h1 className="text-2xl font-semibold">{user?.user_name}</h1>
            <h1 className="text-base font-semibold">{user?.email}</h1>
            <h1 className="text-base font-semibold">
              {user?.streetAddress}, {user?.postalCode} {user?.city}
            </h1>
          </div>
        </div>

        <div className="w-full h-full grid place-items-center">
          <h1 className="text-2xl font-semibold py-8">Listed Animals</h1>
          <div className="grid grid-cols-3 gap-8">
            {animals.length !== 0 &&
              animals.map((animal, i) => {
                return <AnimalContainer animal={animal} key={i} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListerProfilePage;
