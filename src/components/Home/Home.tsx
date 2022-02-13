/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { db } from '@utils/firebase.config';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { pinsArr, pinsState } from 'src/Utils/Types/Pins';
import Loader from 'src/Utils/Loader';
import HomeProps from 'src/Utils/Types/HomeProps';

const Home: NextPage<HomeProps> = ({ searchTerm }) => {
  const [pins, setPins] = useState<pinsArr>();
  const breakPts = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };

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
    <div className="flex flex-wrap mt-8 h-full">
      {!pins ? (
        <Loader />
      ) : (
        <Masonry className="flex w-full" breakpointCols={breakPts}>
          {pins &&
            pins.map((pin: pinsState) => {
              if (
                pin.title
                  .toLocaleLowerCase()
                  .includes(searchTerm.toLocaleLowerCase())
              )
                return (
                  <div
                    key={pin.id}
                    className="max-w-sm mx-8 mb-4 flex flex-col"
                  >
                    <Link href={`pin/${pin.id}`} passHref>
                      <img
                        src={pin.imageUrl}
                        alt="pin image"
                        className="rounded-2xl shadow-lg cursor-pointer transition-shadow hover:shadow-2xl"
                      />
                    </Link>

                    <p className=" font-medium text-slate-800 ml-2 text-lg">
                      {pin.createdBy} | {pin.title}
                    </p>
                  </div>
                );
            })}
        </Masonry>
      )}
    </div>
  );
};

export default Home;
