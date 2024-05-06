import {useEffect, useState} from 'react';
import {Animal} from '../types/Animal';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {
  checkToken,
  getAdoptionApplicationByAnimal,
  getAnimalById,
} from '../graphql/queries';
import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import {User} from '../types/User';
import {Socket, io} from 'socket.io-client';
import {ClientToServerEvents, ServerToClientEvents} from '../types/Socket';
import AnimalInfo from '../components/AnimalInfo';
import {AdoptionApplication} from '../types/AdoptionApplication';
import AdoptionApplicationContainer from '../components/AdoptionContainer';

const AnimalDetailPage = () => {
  const [animal, setAnimal] = useState<Animal>();
  const [reFetchAnimal, setRefetchAnimal] = useState<boolean>(false);
  const [adoptionApplications, setAdoptionApplications] = useState<
    AdoptionApplication[]
  >([]);
  const {animalId} = useParams();
  const [user, setUser] = useState<User>();
  const token = localStorage.getItem('token');

  // socket.io client
  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    import.meta.env.VITE_SOCKET_URL,
  );

  socket.on('modifyAnimal', (message) => {
    console.log('message: ', message);
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
      if (response.animalById) {
        setAnimal(response.animalById);
      }
      if (response.owner.id === userResponse?.id) {
        const adoptionApplicationsResponse = await doGraphQLFetch(
          APIUrl,
          getAdoptionApplicationByAnimal,
          {
            animalId: animalId,
          },
        );
        if (adoptionApplicationsResponse.adoptionApplicationsByAnimal) {
          setAdoptionApplications(
            adoptionApplicationsResponse.adoptionApplicationsByAnimal,
          );
        }
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalId, reFetchAnimal]);

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="mx-12 my-8 p-4 border shadow-lg rounded-lg grid grid-flow-row">
        <h1 className="text-2xl font-semibold justify-self-center">
          {animal?.animal_name}
        </h1>
        <div className="grid place-items-center">
          <AnimalInfo animal={animal!} animalId={animalId!} user={user!} />

          {animal?.owner.id === user?.id && (
            <>
              <h1 className="py-8 font-semibold text-2xl">
                Adoption Applications for {animal?.animal_name}
              </h1>
              <div className="grid grid-cols-3 gap-8 pt-4">
                {adoptionApplications.length !== 0 ? (
                  adoptionApplications.map((application, i) => {
                    return (
                      <AdoptionApplicationContainer
                        application={application}
                        showAdopterDetails
                        key={i}
                      />
                    );
                  })
                ) : (
                  <h1 className="pt-2 font-semibold text-xl uppercase justify-self-center col-start-1 col-span-3">
                    No adoption applications
                  </h1>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalDetailPage;
