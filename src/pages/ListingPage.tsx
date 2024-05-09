import {useEffect, useState} from 'react';
import {Animal} from '../types/Animal';
import {APIUrl} from '../constants';
import {getAllAnimals} from '../graphql/queries';
import {doGraphQLFetch} from '../graphql/fetch';
import NavBar from '../components/NavBar';
import AnimalContainer from '../components/AnimalContainer';
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from '../types/Socket';

const ListingPage = () => {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [fetchAnimals, setFetchAnimals] = useState<boolean>(true);

  // socket.io client
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  import.meta.env.VITE_SOCKET_URL
);

socket.on('addAnimal', (message) => {
  console.log("message: ", message);
  setFetchAnimals(!fetchAnimals);
})

  useEffect(() => {
    (async () => {
      try {
        const animalsResponse = await doGraphQLFetch(APIUrl, getAllAnimals, {});
        if (animalsResponse.animals) {
          const filteredAnimals = animalsResponse.animals.filter((animal: Animal) => animal.adoptionStatus === 'available');
          setAnimals(filteredAnimals);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [fetchAnimals]);

  return (
    <div className="w-screen h-screen">
      <NavBar disableBackButton />
      <div className="grid">
        <h1 className="text-4xl font-semibold text-gray-800 justify-self-center mt-8">
          Available Pets
        </h1>
        <div className="grid grid-cols-3 gap-4 mt-8 px-8 border-t pt-2">
          { animals.length && animals.map((animal, i) => (
            <AnimalContainer key={i} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
