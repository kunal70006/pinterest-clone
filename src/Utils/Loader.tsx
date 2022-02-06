import { TailSpin } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <TailSpin height={80} width={80} color="#00BFFF" />
      <h1 className="mt-4 tracking-wide text-sm">Loading Content...</h1>
    </div>
  );
};

export default Loader;
