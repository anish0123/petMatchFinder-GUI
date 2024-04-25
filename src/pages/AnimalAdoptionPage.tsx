import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doGraphQLFetch } from "../graphql/fetch";
import { APIUrl } from "../constants";
import { getAnimalById } from "../graphql/queries";
import { Animal } from "../types/Animal";
import NavBar from "../components/NavBar";

const AnimalAdoptionPage = () => {
  const [animal, setAnimal] = useState<Animal>();
  const {animalId} = useParams();

  useEffect(() => {
    (async () => {
      const response = await doGraphQLFetch(APIUrl, getAnimalById, {
        animalByIdId: animalId,
      });
      setAnimal(response.animalById);
      console.log('animal: ', animal);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animalId]);

  return (
    <div>
        <NavBar />
        
    </div>
  )
};

export default AnimalAdoptionPage;
