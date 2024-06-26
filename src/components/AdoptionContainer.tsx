import {FileUrl} from '../constants';
import {AdoptionApplication} from '../types/AdoptionApplication';
import { formatDateTime } from '../utils/formatDateTime';

type AdoptionApplicationContainerFormProps = {
  application: AdoptionApplication;
  showAdopterDetails: boolean;
};

const AdoptionApplicationContainer = ({
  application,
  showAdopterDetails,
}: AdoptionApplicationContainerFormProps) => {
  const openAdoptionPage = (id: string) => {
    window.open(`/petMatchFinder-GUI/animal-adoption/${id}`, '_self');
  };

  return (
    <>
      <div
        key={application?.id}
        className="w-full h-full grid place-items-center border shadow-lg rounded-md p-4 hover:cursor-pointer"
        onClick={() => openAdoptionPage(application.id)}
      >
        {showAdopterDetails ? (
          <>
            <h1>{application.description}</h1>
            <h1>{formatDateTime(application.appliedDate)}</h1>
            <h1 className='font-semibold'> Adopter Details</h1>
            <h1>{application?.adopter?.user_name}</h1>
            <h1>{application?.adopter?.email}</h1>
          </>
        ) : (
          <>
            <h1 className="font-semibold">{application?.animal?.animal_name}</h1>
            <img
              src={`${FileUrl}/${application?.animal.image}`}
              alt={application?.animal?.animal_name}
            />
            <h1>{application?.description}</h1>
            <h1>{formatDateTime(application?.appliedDate)}</h1>
            <h1>{application?.applicationStatus}</h1>
          </>
        )}
      </div>
    </>
  );
};

export default AdoptionApplicationContainer;
