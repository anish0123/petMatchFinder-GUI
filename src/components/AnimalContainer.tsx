import {UploadUrl} from '../constants';
import {Animal} from '../types/Animal';

type AnimalContainerFormProps = {
  animal: Animal;
};

const AnimalContainer = ({animal}: AnimalContainerFormProps) => {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg shadow-lg mt-2">
        <img src={UploadUrl + animal.image} alt={animal.animal_name} />
        <h2 className="text-xl font-semibold text-gray-800">
          {animal.animal_name}
        </h2>
        <p className="text-gray-600">{animal.description}</p>
      </div>
    </>
  );
};

export default AnimalContainer;
