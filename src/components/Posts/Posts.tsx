/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import Masonry from 'react-masonry-css';
import Loader from 'src/Utils/Loader';
import GetUser from 'src/Utils/GetUser';
import PostProps from 'src/Utils/Types/PostProps';
import { db } from '@utils/firebase.config';
import { pinsArr, pinsState } from 'src/Utils/Types/Pins';

const Posts: NextPage<PostProps> = ({ searchTerm }) => {
  const [posts, setPosts] = useState<pinsArr>();
  const breakPts = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };
  useEffect(() => {
    const getPostsByUser = async () => {
      const user = GetUser();
      try {
        const q = query(
          collection(db, 'pins'),
          where('createdBy', '==', user?.name)
        );
        const qSnap = await getDocs(q);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const pinArr: any = [];
        qSnap.forEach((doc) => {
          pinArr.push({ ...doc.data(), id: doc.id });
        });
        setPosts(pinArr);
      } catch (err) {
        console.log(err);
      }
    };
    getPostsByUser();
  }, []);

  return (
    <div className="flex flex-wrap mt-8 h-full">
      {!posts ? (
        <Loader />
      ) : (
        <Masonry className="flex w-full" breakpointCols={breakPts}>
          {posts &&
            posts.map((pin: pinsState) => {
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

export default Posts;
