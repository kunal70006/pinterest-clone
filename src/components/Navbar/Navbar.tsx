import Image from 'next/image';
import Link from 'next/link';
import Categories from 'src/Utils/Categories';
import camera from '@assets/camera.png';

const Navbar = () => {
  return (
    <nav className="h-screen w-60 px-6 shadow-lg flex flex-col items-center mt-8 fixed tracking-wider text-slate-900">
      <Link href="/home" passHref>
        <div className="flex items-center mb-20 cursor-pointer">
          <Image src={camera} alt="camera icon" height={48} width={48} />
          <h1 className="text-2xl font-semibold ml-4 ">SHARE ME</h1>
        </div>
      </Link>
      {Categories.map((cat, index: number) => (
        <Link href={`/categories/${cat}`} passHref key={index}>
          <h1 className="text-xl mb-8 cursor-pointer px-4 py-2 hover:bg-slate-100 rounded-lg transition-all">
            {cat}
          </h1>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
