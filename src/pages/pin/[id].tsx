/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loader from 'src/Utils/Loader';
import { db } from '@utils/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { pinsState } from 'src/Utils/Types/Pins';
import Search from '@components/Search/Search';
import download from '@assets/download.png';
import { userStateProps } from 'src/Utils/Types/User';
import GetUser from 'src/Utils/getUser';

const Pin = () => {
  const router = useRouter();
  const [pinData, setPinData] = useState<pinsState>();
  const [user, setUser] = useState<userStateProps>();
  const { id } = router.query;

  useEffect(() => {
    const getPin = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'pins', id as string));
        if (docSnap.exists()) {
          setPinData(docSnap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };

    getPin();
    const temp = GetUser();
    console.log(temp);

    setUser(temp);
  }, [id]);

  return (
    <>
      <Search />
      <div className="flex flex-col my-8 mx-8">
        {!pinData ? (
          <Loader />
        ) : (
          <>
            <img
              src={pinData.imageUrl}
              alt="pin image"
              className=" max-w-lg rounded-2xl shadow-lg"
            />
            <div className="ml-2 flex flex-col font-medium text-slate-800">
              <div className="mt-4 ml-2">
                <a
                  href={pinData.imageUrl}
                  download
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <Image
                    src={download}
                    alt="download icon"
                    height={24}
                    width={24}
                  />
                </a>
              </div>
              <p className="text-6xl">{pinData.title}</p>
              <p className="mt-4 text-md">{pinData.createdBy}</p>
              <h1 className="mt-10 text-4xl">Comments</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pin;
