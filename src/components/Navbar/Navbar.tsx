import Image from 'next/image';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import NavbarProps from 'src/Utils/Types/NavbarProps';
import Categories from 'src/Utils/Categories';
import camera from '@assets/camera.png';

const Navbar: NextPage<NavbarProps> = ({ toggle, setToggle }) => {
  const router = useRouter();

  return (
    <>
      <nav className="lg:h-screen lg:w-60 sm:w-full px-6 shadow-lg lg:flex flex-col items-center pt-8 fixed tracking-wider text-slate-900 bg-white z-50 sm:hidden sm:h-screen">
        <Link href="/home" passHref>
          <div className="flex items-center mb-20 cursor-pointer">
            <Image src={camera} alt="camera icon" height={48} width={48} />
            <h1 className="text-2xl font-semibold ml-4 ">SHARE ME</h1>
          </div>
        </Link>
        {Categories.map((cat, index: number) => (
          <Link href={`/categories/${cat}`} passHref key={index}>
            <h1
              className={`text-xl mb-8 cursor-pointer px-4 py-2 hover:bg-slate-100 rounded-lg transition-all ${
                router.asPath === `/categories/${cat}` ? 'bg-slate-100' : null
              }`}
            >
              {cat}
            </h1>
          </Link>
        ))}
      </nav>
      {toggle && (
        <nav className="sm:w-full sm:flex flex-col items-center fixed tracking-wider text-slate-900 bg-white z-50 sm:h-screen">
          <div
            className=" sm:flex mt-8 w-full justify-end cursor-pointer"
            onClick={() => setToggle(false)}
          >
            <div className="bg-slate-800 rounded-xl w-8 h-1 mb-1 rotate-45 -mr-8"></div>
            <div className="bg-slate-800 rounded-xl w-8 h-1  -rotate-45 "></div>
          </div>
          <div>
            <Link href="/home" passHref>
              <div className="flex items-center mb-20 mt-4 cursor-pointer">
                <Image src={camera} alt="camera icon" height={48} width={48} />
                <h1 className="text-2xl font-semibold ml-4 ">SHARE ME</h1>
              </div>
            </Link>
          </div>

          {Categories.map((cat, index: number) => (
            <Link href={`/categories/${cat}`} passHref key={index}>
              <h1
                className={`text-xl mb-8 cursor-pointer px-4 py-2 hover:bg-slate-100 rounded-lg transition-all ${
                  router.asPath === `/categories/${cat}` ? 'bg-slate-100' : null
                }`}
              >
                {cat}
              </h1>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navbar;
