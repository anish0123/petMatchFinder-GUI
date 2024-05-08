import {SubmitHandler, useForm} from 'react-hook-form';
import {User} from '../types/User';
import React from 'react';
import { doGraphQLFetch } from '../graphql/fetch';
import { APIUrl } from '../constants';
import { registerUser } from '../graphql/queries';
import { Link } from 'react-router-dom';


const RegisterationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<User & {confirmPassword: string}>();
  const password = React.useRef({});
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<User & {confirmPassword?: string}> = async (
    data,
  ) => {
    try {
      delete data.confirmPassword;
      const registerationData = (await doGraphQLFetch(APIUrl, registerUser, {
        user: data,
      }));
     if(registerationData) {
      window.open("/", "_self")
     }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form
        className="grid grid-flow-row mt-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="justify-self-center text-2xl font-semibold text-gray-800">
          Register
        </h1>
        <input
          type="text"
          {...register('user_name', {required: true})}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          placeholder="Username"
        />
        {errors.user_name && <span>Username is required</span>}
        <input
          type="text"
          {...register('email', {required: true})}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          placeholder="Email"
        />
        {errors.email && <span>Email is required</span>}
        <input
          {...register('password', {required: true})}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          type="password"
          placeholder="Password"
        />
        {errors.password && <span>Password is required</span>}
        <input
          {...register('confirmPassword', {
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && <span className='mx-8 text-red-500'>Password do not match. Please check both password!</span>}
        
        <div className="grid place-items-center">
          <button
            className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            type="submit"
          >
            Register
          </button>
          <Link to="/" className=" underline pt-6 text-gray-800">Already have account? Login</Link>
        </div>
      </form>
    </>
  );
};

export default RegisterationForm;
