import {SubmitHandler, useForm} from 'react-hook-form';
import {Animal} from '../types/Animal';
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet';
import {Category} from '../types/Category';
import MapClickHandler from './MapClickHandler';
import {useState} from 'react';
import {LatLngLiteral} from 'leaflet';
import { UploadResponse } from '../types/UploadResponse';
import { UploadUrl } from '../constants';
import { Point } from 'geojson';

type AdoptionFormProps = {
  onSubmit: (data: Animal) => void;
  categories: Category[];
};

const AnimalForm = ({onSubmit, categories}: AdoptionFormProps) => {
  const [clickedPosition, setClickedPosition] = useState<LatLngLiteral>();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Animal>();

  const token = localStorage.getItem('token');

  const onSubmitForm: SubmitHandler<Animal> = async (data) => {
    try {
      const imageFile = data.image![0];
      const formData = new FormData();
      formData.append('cat', imageFile);
      const imageUpload = await fetch(`${UploadUrl}/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const imageUploadData = (await imageUpload.json()) as UploadResponse;
      if (clickedPosition) {
        const location: Point = {
          type: 'Point',
          coordinates: [clickedPosition?.lat, clickedPosition?.lng],
        };
        data.location = location;
      }

      data.listedDate = new Date();
      data.weight = Number(data.weight);
      data.adoptionStatus = 'available';
      if (data.category === '') {
        data.category = categories[0].id;
      }
      data.image = imageUploadData.data.filename;
      onSubmit(data);
    } catch (error) {
      console.log('error: ', error);
    }
  };

  return (
    <>
      <form
        className="grid grid-flow-row mt-6"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <h1 className="justify-self-center text-2xl font-semibold text-gray-800 pb-4">
          Register
        </h1>
        <MapContainer
          center={[60.1699, 24.9384]}
          zoom={5}
          scrollWheelZoom={false}
          style={{height: '400px', width: '100%'}}
        >
          <MapClickHandler setClickedPosition={setClickedPosition} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {clickedPosition ? (
            <Marker position={[clickedPosition?.lat, clickedPosition?.lng]}>
              <Popup>Selected postion</Popup>
            </Marker>
          ) : (
            <></>
          )}
        </MapContainer>
        <input
          type="text"
          {...register('animal_name', {required: true})}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          placeholder="Name"
        />
        {errors.animal_name && <span>Name is required</span>}
        <input
          type="date"
          {...register('birthdate', {required: true})}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
        />
        {errors.birthdate && <span>Birthdate is required</span>}

        <div className="grid grid-flow-col">
          <select
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
            {...register('gender')}
          >
            <option value={'male'}>Male</option>
            <option value={'female'}>Female</option>
          </select>
          {errors.category && (
            <span className="mx-8 text-red-500">Gender is required</span>
          )}
          <select
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
            {...register('category')}
          >
            {categories.length > 0 &&
              categories.map((category, i) => {
                return (
                  <option value={category.id} key={i}>
                    {category.category_name}
                  </option>
                );
              })}
          </select>
          {errors.category && <span>Category is required</span>}
        </div>
        <input
          {...register('image', {required: true})}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          type="file"
        />
        {errors.image && <span>Image is required</span>}

        <input
          {...register('weight', {required: true, min: 0})}
          type="number"
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
        />
        {errors.weight && (
          <span>Weight is required & should be greater than 0</span>
        )}
        <textarea
          {...register('description', {required: true})}
          placeholder="description"
          className="mx-8 my-2 px-4 h-40 border rounded-lg"
        />

        <div className="grid place-items-center">
          <button
            className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default AnimalForm;
