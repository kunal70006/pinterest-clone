import Navbar from '@components/Navbar/Navbar';
import Search from '@components/Search/Search';
import Categories from '@components/Categories/Categories';
import { useEffect, useState } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import { db } from '@utils/firebase.config';
import { pinsArr } from 'src/Utils/Types/Pins';

const Index = () => {
  const [pins, setPins] = useState<pinsArr>();
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
    <main className="flex">
      <Navbar />
      <div className="flex flex-col ml-60 w-full">
        <Search />
        <Categories pins={pins} />
      </div>
    </main>
  );
};
export default Index;
