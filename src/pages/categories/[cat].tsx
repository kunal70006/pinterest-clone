import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import Categories from '@components/Categories/Categories';
import { useEffect, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@utils/firebase.config';
import { pinsArr } from 'src/Utils/Types/Pins';
import Head from 'next/head';

const Index = () => {
  const [pins, setPins] = useState<pinsArr>();
  const [searchTerm, setSearchTerm] = useState('');
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    try {
      const q = query(collection(db, 'pins'));
      const temp = onSnapshot(q, (qSnap) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pinArr: any = [];
        qSnap.forEach((doc) => {
          pinArr.push({ ...doc.data(), id: doc.id });
        });
        setPins(pinArr);
      });

      return () => temp();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <>
      <Head>
        <title>Share Me</title>
      </Head>
      <main className="flex">
        <Navbar toggle={toggle} setToggle={setToggle} />
        <div className="flex flex-col lg:ml-60 sm:ml-0 w-full">
          <Search setSearchTerm={setSearchTerm} setToggle={setToggle} />
          <Categories pins={pins} />
        </div>
      </main>
    </>
  );
};
export default Index;
