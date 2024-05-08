import {FileUrl} from '../constants';
import {Animal} from '../types/Animal';
import {Category} from '../types/Category';
import {User} from '../types/User';

type AnimalInfoProps = {
  animal: Animal;
  animalId: string;
  user: User;
  onDelete: (animalId: string) => void;
};

const AnimalInfo = ({animal, animalId, user, onDelete}: AnimalInfoProps) => {
  const onAdopt = () => {
    window.open(`/animals/${animalId}/adopt`, '_self');
  };

  const onEdit = () => {
    window.open(`/animals/${animalId}/edit`, '_self');
  };

  const onProfileCheck = () => {
    window.open(`/profile/${animal?.owner.id}`, '_self');
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
    <div className="pt-4 h-fit grid grid-cols-2">
      <img src={`${FileUrl}${animal?.image}`} alt={animal?.animal_name} />
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
          {animal?.birthdate?.toString()}
        </p>
        <p className="pb-4">
          <strong>Listed at: </strong>
          {animal?.listedDate?.toString()}
        </p>
        <p className="pb-4">
          <strong>Adoption Status: </strong>
          {animal?.adoptionStatus}
        </p>
        <p className="pb-4">
          <strong>Listed By: </strong>
          <a
            onClick={onProfileCheck}
            className="underline hover:cursor-pointer"
          >
            {animal?.owner?.user_name}
          </a>
        </p>
        <p className="pb-4">
          <strong>Weight: </strong>
          {animal?.weight} kg
        </p>
        <p className="pb-4">
          <strong>Price: </strong>
          {animal?.price} €
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
            <button
              className="mt-4 relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-purple-400 before:to-indigo-400"
              onClick={onAdopt}
            >
              <span className="relative text-white font-bold px-8 py-8">
                {' '}
                Adopt Me{' '}
              </span>
            </button>
          )}
          {(animal?.owner.id === user?.id || user.role === 'admin') && (
            <button
              className=" ml-4 mt-4 relative overflow-hidden rounded-lg h-12 group hover:animate-pulse hover:shadow-lg hover:scale-105 transition duration-500 before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-pink-400 before:via-red-400 before:to-orange-400"
              onClick={() => onDelete(animalId)}
            >
              <span className="relative text-white font-bold px-8 py-8">
                {' '}
                Delete{' '}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalInfo;
