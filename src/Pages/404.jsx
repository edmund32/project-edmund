import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="flex justify-center min-h-screen items-center flex-col">
      <h1 className="text-3xl font-extrabold mb-5 text-indigo-800">
        Error 404
      </h1>
      <p className="text-center font-medium mb-5 text-slate-900 text-base/5 mb-7 ">
        {" "}
        An unexpected error has occurred.
        <br />
        Sorry for your inconvenience.🤫
      </p>
      <p>{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
