import {SubmitHandler, useForm} from 'react-hook-form';
import {User} from '../types/User';
import React from 'react';
import {doGraphQLFetch} from '../graphql/fetch';
import {APIUrl} from '../constants';
import {updateUser} from '../graphql/queries';

const UpdateProfileForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm<User & {confirmPassword: string}>();
  const token = localStorage.getItem('token');
  const password = React.useRef({});
  password.current = watch('password', '');

  const onSubmit: SubmitHandler<User & {confirmPassword?: string}> = async (
    data,
  ) => {
    try {
      delete data.confirmPassword;
      const registerationData = await doGraphQLFetch(
        APIUrl,
        updateUser,
        {
          user: data,
        },
        token!,
      );
      if (registerationData) {
        if (registerationData.updateUser.token) {
          localStorage.setItem('token', registerationData.updateUser.token);
        }
        window.open('/profile', '_self');
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
          Update Profile
        </h1>
        <input
          type="text"
          {...register('user_name', {
            setValueAs: (value) => value || undefined,
          })}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          placeholder="Username"
        />
        <input
          type="text"
          {...register('email', {
            setValueAs: (value) => value || undefined,
          })}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          placeholder="Email"
        />
        <input
          {...register('password', {
            setValueAs: (value) => value || undefined,
          })}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          type="password"
          placeholder="Password"
        />
        <input
          {...register('confirmPassword', {
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          type="password"
          placeholder="Confirm Password"
        />
        {errors.confirmPassword && (
          <span className="mx-8 text-red-500">
            Password do not match. Please check both password!
          </span>
        )}
        <input
          {...register('streetAddress')}
          className="mx-8 my-2 px-4 h-10 border rounded-lg"
          type="text"
          placeholder="Street Address"
        />

        <div className="grid grid-flow-col">
          <input
            {...register('postalCode', {
              setValueAs: (value) => value || undefined,
            })}
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
            type="text"
            placeholder="Postal Code"
          />
          <input
            {...register('city', {
              setValueAs: (value) => value || undefined,
            })}
            className="mx-8 my-2 px-4 h-10 border rounded-lg"
            type="text"
            placeholder="City"
          />
        </div>

        <div className="grid place-items-center">
          <button
            className="mt-4 inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProfileForm;
