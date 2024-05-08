import { SubmitHandler, useForm } from "react-hook-form";
import { doGraphQLFetch } from "../graphql/fetch";
import { APIUrl } from "../constants";
import { login } from "../graphql/queries";
import { LoginMessageResponse } from "../types/LoginMessageResponse";
import { Link } from "react-router-dom";

type LoginInput = {
    email: string;
    password: string;
  };

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      console.log(data);
      const loginData = (await doGraphQLFetch(APIUrl, login, {
        credentials: data,
      })) as LoginMessageResponse;
      localStorage.setItem('token', loginData.login.token!);
      localStorage.setItem('user_name', loginData.login.user.user_name!);
      window.open('/', '_self');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <form
        className="grid grid-flow-row mt-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="justify-self-center text-4xl font-semibold text-gray-800">
          Login
        </h1>
        <input
          type="text"
          {...register('email', {required: true})}
          className="mx-8 my-7 px-4 h-14 border rounded-lg"
          placeholder="Email"
        />
        {errors.email && <span>This field is required</span>}
        <input
          {...register('password', {required: true})}
          className="mx-8 my-7 px-4 h-14 border rounded-lg"
          type="password"
          placeholder="Password"
        />
        {errors.password && <span>This field is required</span>}
        <div className="grid place-items-center">
          <button
            className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            type="submit"
          >
            Login
          </button>
          <a href="#" className="text-gray-800 underline pt-6">
            Forgot password?
          </a>
          <Link to="/register" className=" underline pt-6 text-gray-800">New user? Register</Link>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
