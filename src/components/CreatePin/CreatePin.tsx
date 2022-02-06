/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import { ChangeEvent, useState, useEffect } from 'react';
import Image from 'next/image';
import { modalProps } from 'src/Utils/Types/Modal';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@utils/firebase.config';
import { db } from '@utils/firebase.config';
import { collection, addDoc } from 'firebase/firestore';

import upload from '@assets/upload.png';
import close from '@assets/close.png';

const CreatePin: NextPage<modalProps> = ({ isModalOpen, handleClose }) => {
  const [pinData, setPinData] = useState({
    title: '',
    imageUrl: '',
    createdBy: '',
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setPinData({ ...pinData, createdBy: user.name });

    return () =>
      setPinData({
        title: '',
        imageUrl: '',
        createdBy: '',
      });
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPinData({ ...pinData, title: e.target.value });
  };

  const uploadPin = async () => {
    if (
      pinData.title !== '' &&
      pinData.createdBy !== '' &&
      pinData.imageUrl !== ''
    ) {
      try {
        await addDoc(collection(db, 'pins'), pinData);
        setPinData({
          title: '',
          imageUrl: '',
          createdBy: '',
        });
        handleClose();
      } catch (err) {
        console.log(err);
      }
    }
  };
  const uploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const currentFile = e.currentTarget.files[0];
      if (currentFile) {
        const metadata = {
          contentType: currentFile.type,
        };
        const storageRef = ref(storage, `images/${currentFile.name}.jpg`);
        uploadBytes(storageRef, currentFile, metadata)
          .then(() =>
            getDownloadURL(storageRef)
              .then((url) => setPinData({ ...pinData, imageUrl: url }))
              .catch((err) => console.log(err))
          )
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  };
  return isModalOpen ? (
    <div className=" fixed flex flex-col h-screen w-screen bg-black/30 z-10 items-center justify-center">
      <div
        className="w-1/3 sm:w-full md:w-1/2 justify-end flex cursor-pointer mr-8"
        onClick={handleClose}
      >
        <Image src={close} alt="close icon" height={24} width={24} />
      </div>
      {pinData.imageUrl === '' ? (
        <label className="bg-slate-100 px-8 py-12 -mt-12 rounded-2xl flex flex-col w-1/3 sm:w-full md:w-1/2 h-1/2 items-center tracking-wide text-slate-800 text-xl">
          <div className="flex flex-col justify-between w-full h-full items-center mt-8">
            <div className="text-center">
              <Image src={upload} alt="upload icon" width={48} height={48} />
              <h1>Click to upload</h1>
            </div>
            <div>
              <p className=" text-sm text-slate-400 mb-8">
                Use high-quality JPG, SVG, PNG, GIF less than 5 MB.
              </p>
              <input type="file" className="w-0 h-0" onChange={uploadImage} />
            </div>
          </div>
        </label>
      ) : (
        <div className="bg-slate-100 px-8 py-12 -mt-12 rounded-2xl flex flex-col w-1/3 h-1/2 sm:w-full md:w-1/2 items-center">
          {/* <Image src={pinData.imageUrl} alt="pin" layout="fill" /> */}
          <img src={pinData.imageUrl} alt="pin" className="h-full mt-4" />
        </div>
      )}
      <input
        type="text"
        className="w-1/3 sm:w-full md:w-1/2 rounded-2xl text-xl tracking-wider mt-4 bg-slate-100 pl-4 py-2 outline-none text-slate-800"
        placeholder="Enter Title"
        value={pinData.title}
        onChange={handleChange}
      />
      <button
        onClick={uploadPin}
        className="w-1/6 sm:w-full md:w-1/2 rounded-2xl text-xl text-slate-800 tracking-wider mt-4 bg-slate-100 pl-4 py-2 outline-none transition hover:bg-slate-200"
      >
        Create Pin
      </button>
    </div>
  ) : null;
};

export default CreatePin;
