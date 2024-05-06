import {useState} from 'react';
import {Rating} from '../types/Rating';
import {Rating as RatingStar} from '@mui/material';
import {User} from '../types/User';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {modifyRating} from '../graphql/queries';

type RatingContainerProps = {
  rating: Rating;
  user: User | undefined;
};

const RatingContainer = ({rating, user}: RatingContainerProps) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number | null>(rating.rating);
  const [description, setDescription] = useState<string>(rating.description);
  const token = localStorage.getItem('token');

  const onEdit = async () => {
    const data = {
      rating: newRating,
      description: description,
    };

    const response = await doGraphQLFetch(
      APIUrl,
      modifyRating,
      {
        modifyRatingId: rating.id,
        rating: data,
      },
      token!,
    );
    if (response.modifyRating) {
      alert('Rating updated successfully');
      setEditMode(false);
    }
  };

  return (
    <div className="border-b py-2 grid grid-cols-12 gap-4 pr-4">
      {editMode ? (
        <>
          <RatingStar
            name="new-rating"
            onChange={(_event, newValue) => {
              setNewRating(newValue);
            }}
            // onChange={(_event, newValue) => {
            //   setNewRating(newValue);
            // }}
            className="col-start-1"
            size="medium"
            precision={0.5}
            defaultValue={rating.rating}
          />
          <textarea
            className="ml-2 px-4 h-15 border rounded-lg col-start-3 col-span-8"
            // onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            defaultValue={rating.description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button
            className="content-center mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 pl-6 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            onClick={onEdit}
          >
            Edit
          </button>
          <button
            className="content-center mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-red-600 pl-3 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <h1 className="font-semibold pl-2">{rating.ratedBy.user_name}</h1>
          <RatingStar
            className="justify-self-center py-4 pl-4"
            name="read-only"
            value={rating.rating || 0}
            readOnly
            size="small"
          />
          <h1 className="pl-3 col-start-4 col-span-7">{rating.description}</h1>
          {user?.id === rating.ratedBy.id && (
            <button
              className="content-center mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 pl-6 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              onClick={() => setEditMode(true)}
            >
              Edit
            </button>
          )}
          {(user?.id === rating.ratedBy.id || user?.role === 'admin') && (
            <button className="content-center mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-red-600 pl-4 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100">
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default RatingContainer;
