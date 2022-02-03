import Image from 'next/image';
import { signInWithGoogle } from '@utils/googleSignIn';
import { useState } from 'react';
import camera from '@assets/camera.png';
import google from '@assets/google.png';
import { userStateProps } from 'src/Utils/Types/User';

const LandingPage = () => {
  const [user, setUser] = useState<userStateProps>({
    name: '',
    email: '',
    iconURL: '',
  });

  const handleClick = async () => {
    try {
      const res = await signInWithGoogle();
      const obj = {
        name: res.user.displayName,
        email: res.user.email,
        iconURL: res.user.photoURL,
      };

      await setUser(obj);

      localStorage.setItem('user', JSON.stringify(obj));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <main className="h-screen flex tracking-widest justify-center items-center flex-col">
      <video
        autoPlay
        muted
        loop
        className=" fixed right-0 bottom-0 min-w-full min-h-full -z-10"
      >
        <source src="/vid.mp4" type="video/mp4" />
      </video>
      <div className="flex items-center text-white bg-white/40 px-2 rounded-xl">
        <Image src={camera} alt="camera icon" height={48} width={48} />
        <h1 className=" text-3xl font-semibold ml-4">
          SHARE <span className="text-slate-900">ME</span>
        </h1>
      </div>
      <button
        onClick={handleClick}
        className="flex items-center mt-8 rounded-xl px-4 py-2 cursor-pointer bg-white transition duration-100 ease-in hover:bg-slate-100"
      >
        <Image src={google} alt="google icon" height={16} width={16} />
        <p className="ml-2">Sign in with Google</p>
      </button>
    </main>
  );
};

export default LandingPage;
