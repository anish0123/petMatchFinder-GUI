import {useForm} from 'react-hook-form';

export type AdoptionFormInput = {
  description: string;
};

type AdoptionFormProps = {
  onSubmit: (data: AdoptionFormInput) => void;
};

const AdoptionForm = ({onSubmit}: AdoptionFormProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<AdoptionFormInput>();

  return (
    <>
      <form
        className="grid grid-flow-row h-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          {...register('description', {required: true})}
          className="mx-8 my-7 px-4 h-14 border rounded-lg h-60"
          cols={10}
          placeholder="Please introduce yourself and why you would like to adopt this animal."
        />
        {errors.description && <span>This field is required</span>}
        <div className="w-full grid place-items-center">
          <button
            className="inline-flex cursor-pointer items-center gap-1 rounded border border-slate-300 bg-gradient-to-b from-slate-50 to-slate-200 px-8 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:ring-offset-2 active:opacity-100"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default AdoptionForm;
