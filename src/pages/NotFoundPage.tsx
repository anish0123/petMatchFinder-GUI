const NotFoundPage = () => {
  return (
    <div className="w-screen h-screen">
      <div className="grid place-items-center">
        <h1 className="pt-12 font-semibold text-2xl"> Page not found</h1>

        <a href="/" className="pt-4 underline">Please click here to go to home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
