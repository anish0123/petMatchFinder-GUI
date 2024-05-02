import {useEffect, useState} from 'react';
import {Animal} from '../types/Animal';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl, FileUrl} from '../constants';
import {checkToken, getAnimalById} from '../graphql/queries';
import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import {User} from '../types/User';
import {Category} from '../types/Category';
import {Socket, io} from 'socket.io-client';
import {ClientToServerEvents, ServerToClientEvents} from '../types/Socket';

const AnimalDetailPage = () => {
  const [animal, setAnimal] = useState<Animal>();
  const [reFetchAnimal, setRefetchAnimal] = useState<boolean>(false);
  const {animalId} = useParams();
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem('token');

  // socket.io client
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    import.meta.env.VITE_SOCKET_URL,
  );

  socket.on('modifyAnimal', (message) => {
    console.log("message: ", message);
    setRefetchAnimal(!reFetchAnimal);
  });

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, getAnimalById, {
        animalByIdId: animalId,
      });
      const userResponse = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      if (userResponse.checkToken?.message === 'Token is valid') {
        setUser(userResponse.checkToken.user);
      }
      console.log('userResponse: ', userResponse);
      if (response.animalById) {
        setAnimal(response.animalById);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalId, reFetchAnimal]);

  const onAdopt = () => {
    window.open(`/animals/${animalId}/adopt`, '_self');
  };

  const onEdit = () => {
    window.open(`/animals/${animalId}/edit`, '_self');
  };

  const processCategory = (
    category: Category | string | undefined,
  ): Category | undefined => {
    if (typeof category !== 'string') {
      return category;
    }
    return;
  };

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="mx-12 my-8 p-4 border shadow-lg rounded-lg grid grid-flow-row">
        <h1 className="text-2xl font-semibold justify-self-center">
          {animal?.animal_name}
        </h1>

        <div className="pt-4 h-fit">
          <img
            src={`${FileUrl}${animal?.image}`}
            alt={animal?.animal_name}
            className="w-1/2 h-1/2"
          />
          <div className="pt-4 pl-4">
            <p className="pb-4">
              <strong>Category: </strong>
              {processCategory(animal?.category)?.category_name}
            </p>
            <h6>
              <strong>Description: </strong>
            </h6>
            <p className="pb-4">{animal?.description}</p>

            <p className="pb-4">
              <strong>Gender: </strong>
              {animal?.gender}
            </p>
            <p className="pb-4">
              <strong>Date of birth: </strong>
              {animal?.birthdate.toString()}
            </p>
            <p className="pb-4">
              <strong>Listed at: </strong>
              {animal?.listedDate.toString()}
            </p>
            <p className="pb-4">
              <strong>Adoption Status: </strong>
              {animal?.adoptionStatus}
            </p>
            <p className="pb-4">
              <strong>Listed By: </strong>
              {animal?.owner.user_name}, {animal?.owner.streetAddress},
              {animal?.owner.postalCode} {animal?.owner.city}
            </p>
            <div>
              {animal?.owner.id === user?.id ? (
                <button
                  className="mt-4 relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
                  onClick={onEdit}
                >
                  <span className="relative text-white font-bold px-8 py-8">
                    {' '}
                    Edit{' '}
                  </span>
                </button>
              ) : (
                <></>
              )}
              {user?.role === 'adopter' ? (
                <button
                  className="mt-4 relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
                  onClick={onAdopt}
                >
                  <span className="relative text-white font-bold px-8 py-8">
                    {' '}
                    Adopt Me{' '}
                  </span>
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailPage;
