
import { UploadUrl } from '../constants';
import {AdoptionApplication} from '../types/AdoptionApplication';

type AdoptionApplicationContainerFormProps = {
  application: AdoptionApplication;
};

const AdoptionApplicationContainer = ({
  application,
}: AdoptionApplicationContainerFormProps) => {
  return (
    <>
      <div
        key={application.id}
        className="w-full h-full grid place-items-center border shadow-lg rounded-md p-4"
      >
        <h1>{application.animal.animal_name}</h1>
        <img
          src={UploadUrl + application.animal.image} alt={application.animal.animal_name}
          className="w-1/4 h-1/4"
        />
        <h1>{application.description}</h1>
        <h1>{application.appliedDate.toString()}</h1>
      </div>
    </>
  );
};

export default AdoptionApplicationContainer;
