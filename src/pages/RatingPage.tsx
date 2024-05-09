import {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import {Rating} from '../types/Rating';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {
  addRating,
  checkToken,
  getRatingsByRatedToUser,
} from '../graphql/queries';
import {useParams} from 'react-router-dom';
import {Rating as RatingStar} from '@mui/material';
import RatingContainer from '../components/RatingContainer';
import {Socket, io} from 'socket.io-client';
import {ClientToServerEvents, ServerToClientEvents} from '../types/Socket';
import {User} from '../types/User';

const RatingPage = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [user, setUser] = useState<User>();
  const [fetchRatings, setFetchRatings] = useState<boolean>(false);
  const [overallRating, setOverallRating] = useState<number>();
  const [newRating, setNewRating] = useState<number | null>();
  const [description, setDescription] = useState<string>();
  const {userId} = useParams();
  const token = localStorage.getItem('token');

  const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    import.meta.env.VITE_SOCKET_URL,
  );

  socket.on('addRating', (message) => {
    console.log('message: ', message);
    setFetchRatings(!fetchRatings);
  });

  socket.on('modifyRating', (message) => {
    console.log('message: ', message);
    setFetchRatings(!fetchRatings);
  });

  socket.on('deleteRating', (message) => {
    console.log('message: ', message);
    setFetchRatings(!fetchRatings);
  });

  const onSubmit = async () => {
    const data = {
      ratedTo: userId,
      rating: newRating,
      description: description,
      ratedDate: new Date(),
    };

    const response = await doGraphQLFetch(
      APIUrl,
      addRating,
      {
        rating: data,
      },
      token!,
    );
    if (response.addRating) {
      alert('Rating added successfully!');
      location.reload();
    }
  };

  const onClickBack = () => {
    window.open(`/petMatchFinder-GUI/profile/${userId}`, '_self');
  }
 
  useEffect(() => {
    (async () => {
      const userResponse = await doGraphQLFetch(APIUrl, checkToken, {}, token!);
      if (userResponse.checkToken) {
        setUser(userResponse.checkToken.user);
      }

      const ratingResponse = await doGraphQLFetch(
        APIUrl,
        getRatingsByRatedToUser,
        {
          ratedTo: userId,
        },
      );
      if (ratingResponse.ratingByRatedToUser?.length) {
        setRatings(ratingResponse.ratingByRatedToUser);
        let sum = 0;
        ratingResponse.ratingByRatedToUser?.forEach((rating: Rating) => {
          sum += rating.rating;
        });
        setOverallRating(sum / ratingResponse.ratingByRatedToUser?.length);
      }
    })();
    //eslint-disable-next-line
  }, [fetchRatings]);

  return (
    <div className="w-screen h-screen">
      <NavBar backFuntion={onClickBack} />
      <div className="grid pt-8">
        <h1 className="font-semibold text-2xl justify-self-center">
          Overall Rating
        </h1>
        {ratings?.length ? (
          <>
            <RatingStar
              className="justify-self-center py-4"
              name="read-only"
              value={overallRating || 0}
              readOnly
              size="large"
              precision={0.5}
            />
            <h1 className="font-semibold text-2xl pb-4 justify-self-center">
              Ratings
            </h1>
            <div className="pt-4 pl-12">
              {ratings?.length &&
                ratings?.map((rating, i) => (
                  <div key={i}>
                    <RatingContainer rating={rating} user={user} />
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="justify-self-center py-4 font-semibold">No ratings available</h1>
          </>
        )}

        <h1 className="font-semibold text-2xl pb-4 justify-self-center pt-4">
          Add Rating
        </h1>
        <div className="grid place-items-center">
          <RatingStar
            name="new-rating"
            onChange={(_event, newValue) => {
              setNewRating(newValue);
            }}
            size="large"
            precision={0.5}
          />
          <textarea
            className="ml-2 w-2/5 my-7 px-4 h-20 border rounded-lg"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <button
            className="content-center w-32 pl-5 mt-2 h-3/5 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 pl-2 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            onClick={onSubmit}
          >
            Add Rating
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
