/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Loader from 'src/Utils/Loader';
import { db } from '@utils/firebase.config';
import { doc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { pinsState } from 'src/Utils/Types/Pins';
import Search from '@components/Search/Search';
import download from '@assets/download.png';
import { userStateProps } from 'src/Utils/Types/User';
import GetUser from 'src/Utils/GetUser';
import Navbar from '@components/Navbar/Navbar';

const Pin = () => {
  const router = useRouter();
  const [pinData, setPinData] = useState<any>();
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [user, setUser] = useState<userStateProps>();
  const { id } = router.query;

  useEffect(() => {
    const getPin = async () => {
      try {
        const unsub = onSnapshot(doc(db, 'pins', id as string), (doc) => {
          setPinData(doc.data());
          console.log(doc.data());
        });
        return () => unsub();
      } catch (err) {
        console.log(err);
      }
    };

    getPin();
    const temp = GetUser();

    setUser(temp);
  }, [id]);

  const addComment = async () => {
    setAddingComment(true);
    const docRef = doc(db, 'pins', id as string);
    try {
      await updateDoc(docRef, {
        comments: arrayUnion(comment),
      });
      setAddingComment(false);
      setComment('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex">
      <Navbar toggle={toggle} setToggle={setToggle} />
      <div className="flex flex-col lg:ml-60 sm:ml-0 w-full">
        <Search setToggle={setToggle} />
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
                <p className="lg:text-6xl sm:text-4xl">{pinData.title}</p>
                <p className="mt-4 text-md">{pinData.createdBy}</p>
                <h1 className="mt-10 text-4xl">Comments</h1>
                <div className="my-4">
                  {pinData?.comments?.length !== 0 ? (
                    pinData?.comments?.map((com: string, index: number) => (
                      <h1
                        className="text-lg italic mb-1 font-normal"
                        key={`${id}${index}`}
                      >
                        {com}
                      </h1>
                    ))
                  ) : (
                    <h1 className="text-lg italic mb-1 font-light">
                      No comments so far...
                    </h1>
                  )}
                </div>
                <div className="flex items-center mt-4 sm:w-full">
                  <Image
                    src={user.iconURL}
                    alt="user icon"
                    width={48}
                    height={48}
                    className=" rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    maxLength={48}
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className="lg:ml-8 sm:ml-0 lg:w-1/5 sm:w-full border-2 outline-none rounded-xl lg:text-xl sm:text-sm px-4 py-2 font-normal text-slate-800"
                  />
                  <button
                    onClick={addComment}
                    className="ml-4 bg-slate-400 rounded-2xl px-4 py-2 font-medium lg:text-lg sm:text-sm transition-colors hover:bg-slate-600 hover:text-slate-50"
                  >
                    {addingComment ? 'Posting the comment...' : 'Post!'}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pin;
