import {useEffect, useState} from 'react';
import NavBar from '../components/NavBar';
import {Rating} from '../types/Rating';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {getRatingsByRatedToUser} from '../graphql/queries';
import {useParams} from 'react-router-dom';

const RatingPage = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [overallRating, setOverallRating] = useState<number>();
  const {userId} = useParams();

  useEffect(() => {
    (async () => {
      const ratingResponse = await doGraphQLFetch(
        APIUrl,
        getRatingsByRatedToUser,
        {
          ratedTo: userId,
        },
      );
      console.log('ratingResponse: ', ratingResponse);
      if (ratingResponse.ratingByRatedToUser?.length !== 0) {
        setRatings(ratingResponse.ratingByRatedToUser);
        let sum = 0;
        ratingResponse.ratingByRatedToUser?.forEach((rating: Rating) => {
          sum += rating.rating;
        });
        console.log('sum: ', sum);
        setOverallRating(sum / ratingResponse.ratingByRatedToUser.length);
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="w-screen h-screen">
      <NavBar />
      <div className="grid place-items-center pt-8">
        <h1 className="font-semibold text-2xl">Overall Rating</h1>
        <h1>{overallRating}</h1>
        <div>
          {ratings.length !== 0 &&
            ratings.map((rating, i) => (
              <div key={i}>
                <h1>{rating.rating}</h1>
                <h1>{rating.description}</h1>
                <h1>{rating.ratedBy.email}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default RatingPage;
