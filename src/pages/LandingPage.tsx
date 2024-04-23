import {SubmitHandler, useForm} from 'react-hook-form';
import logo from '../assets/petMatchFinderLogo.png';
import { doGraphQLFetch } from '../graphql/fetch';
import { APIUrl } from '../constants';
import { login } from '../graphql/queries';
import { LoginMessageResponse } from '../types/LoginMessageResponse';

type LoginInput = {
  username: string;
  password: string;
};

const LandingPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      console.log(data);
      const loginData = (await doGraphQLFetch(APIUrl, login, {credentials: data})) as LoginMessageResponse;
      localStorage.setItem('token', loginData.login.token!);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen h-screen grid grid-rows-8">
      
      <img src={logo} className='row-start-1 row-span-2 self-center justify-self-center pt-16' />
      <div className="w-2/5 h-3/4 bg-blue-800 border shadow-lg rounded-lg row-start-3 row-span-7 justify-self-center  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
        <form className="grid grid-flow-row mt-12" onSubmit={handleSubmit(onSubmit)}>
        <h1 className='justify-self-center text-4xl font-semibold text-gray-800'>Login</h1>
          <input
          type='text'
            {...register('username', {required: true})}
            className="mx-8 my-7 px-4 h-14 border rounded-lg"
          />
          {errors.username && <span>This field is required</span>}
          <input
            {...register('password', {required: true})}
            className="mx-8 my-7 px-4 h-14 border rounded-lg"
            type='password'
          />
          {errors.password && <span>This field is required</span>}
          <div className="grid place-items-center">
            <button
              className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
              type="submit"
            >
              Login
            </button>
            <a href="#" className="text-white underline pt-6 text-black">
              Forgot password?
            </a>
            <a href="#" className="text-white underline pt-6 text-black">
              New user? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LandingPage;
