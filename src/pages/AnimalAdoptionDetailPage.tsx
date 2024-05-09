import {useEffect, useState} from 'react';
import {AdoptionApplication} from '../types/AdoptionApplication';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl, FileUrl} from '../constants';
import {
  checkToken,
  deleteAdoptionApplication,
  getAdoptionApplicationById,
  modifyAdoptionApplication,
} from '../graphql/queries';
import {useParams} from 'react-router-dom';
import NavBar from '../components/NavBar';
import {SubmitHandler, useForm} from 'react-hook-form';
import {User} from '../types/User';

const AnimalAdoptionDetailPage = () => {
  const [adoption, setAdoption] = useState<AdoptionApplication>();
  const [refetch, setRefetch] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const adoptionId = useParams().adoptionId;
  const token = localStorage.getItem('token');

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<AdoptionApplication>();

  const onSubmit: SubmitHandler<AdoptionApplication> = async (data) => {
    try {
      const response = await doGraphQLFetch(
        APIUrl,
        modifyAdoptionApplication,
        {
          input: data,
          modifyAdoptionApplicationId: adoption?.id,
        },
        token!,
      );
      if (response.modifyAdoptionApplication) {
        setEditDescription(false);
        setRefetch(!refetch);
      } else{
        alert('Failed to update application');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onApplicationStatusChange = async (status: string) => {
    try {
      let text = '';
      if (status === 'approved') {
        text = `Are you sure you want to approve this application?`;
      } else {
        text = `Are you sure you want to reject this application?`;
      }

      if (confirm(text)) {
        const response = await doGraphQLFetch(
          APIUrl,
          modifyAdoptionApplication,
          {
            input: {applicationStatus: status},
            modifyAdoptionApplicationId: adoption?.id,
          },
          token!,
        );
        if (response.modifyAdoptionApplication) {
          setRefetch(!refetch);
        } else {
          alert('Failed to update application');}
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onDelete = async () => {
    try {
      const text = 'Do you want to delete this application?';
      if (confirm(text)) {
        const response = await doGraphQLFetch(
          APIUrl,
          deleteAdoptionApplication,
          {
            deleteAdoptionApplicationId: adoption?.id,
          },
          token!,
        );
        if (response.deleteAdoptionApplication) {
          alert('Application deleted successfully!');
          window.open('/petMatchFinder-GUI/profile', '_self');
        } else {
          alert('Failed to delete application');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      const userResponse = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      if (userResponse.checkToken?.message === 'Token is valid') {
        setUser(userResponse.checkToken.user);
      }

      const response = await doGraphQLFetch(
        APIUrl,
        getAdoptionApplicationById,
        {adoptionApplicationByIdId: adoptionId},
        token!,
      );
      if (response.adoptionApplicationById) {
        setAdoption(response.adoptionApplicationById);
      } 
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, refetch]);

  const onClickBack = () => {
    window.open(`/petMatchFinder-GUI/animals/${adoption?.animal.id}`, '_self');
  }

  return (
    <div className="w-screen h-screen">
      <NavBar backFuntion={onClickBack} />
      <div className="px-10 py-16">
        <img
          src={FileUrl + adoption?.animal.image}
          alt={adoption?.animal.animal_name}
          className="w-2/5 h-2/5"
        />
        <h1 className="text-2xl font-semibold">
          {adoption?.animal.animal_name}
        </h1>
        <div className="py-4">
          <div className="flex flex-row mb-2">
            <h1 className="font-semibold text-xl">Description </h1>
            {!editDescription &&
            adoption?.applicationStatus == 'pending' &&
            user?.id === adoption.adopter.id ? (
              <button
                className="px-2 ml-4 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
                onClick={() => setEditDescription(true)}
              >
                Edit
              </button>
            ) : (
              <></>
            )}
          </div>
          {editDescription ? (
            <form
              className="grid grid-flow-row"
              onSubmit={handleSubmit(onSubmit)}
            >
              <textarea
                {...register('description', {required: true})}
                className="my-2 px-4 h-40 border rounded-lg"
                placeholder="Description"
                defaultValue={adoption?.description}
              />
              {errors.description && <span>Description is required</span>}
              <div>
                <button
                  className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
                  type="submit"
                >
                  Save
                </button>

                <button
                  className="mt-4 ml-8 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
                  onClick={() => setEditDescription(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <p className="">{adoption?.description}</p>
          )}
        </div>

        <h1 className="font-semibold">
          Adoption Status: {adoption?.applicationStatus}
        </h1>
        {adoption?.adopter.id === user?.id && (
          <div>
            <button
              className="content-center mt-2 h-10 inline-flex items-center px-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              onClick={onDelete}
            >
              Delete Application
            </button>
          </div>
        )}
        {adoption?.animal.owner?.id === user?.id && (
          <div className="pt-4">
            <button
              className=" mr-4 content-center mt-2 h-10 inline-flex items-center px-2 bg-green-600 transition ease-in-out delay-75 hover:bg-green-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              onClick={() => onApplicationStatusChange('approved')}
            >
              Approve Application
            </button>
            <button
              className="content-center mt-2 h-10 inline-flex items-center px-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
              onClick={() => onApplicationStatusChange('rejected')}
            >
              Reject Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimalAdoptionDetailPage;
