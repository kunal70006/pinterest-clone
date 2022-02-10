/* eslint-disable @next/next/no-img-element */
import Masonry from 'react-masonry-css';
import Link from 'next/link';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CateogoryPinsProp } from 'src/Utils/Types/CategoryPins';
import { pinsArr } from 'src/Utils/Types/Pins';
import { pinsState } from 'src/Utils/Types/Pins';

const Categories: NextPage<CateogoryPinsProp> = ({ pins }) => {
  const router = useRouter();
  const { cat } = router.query;
  const [filteredPins, setFilteredPins] = useState<pinsArr>();
  const breakPts = {
    default: 5,
    1100: 3,
    700: 2,
    500: 1,
  };
  useEffect(() => {
    const filter = pins?.filter(
      (i) =>
        i?.category?.toLocaleLowerCase() ===
        cat.toLocaleString().toLocaleLowerCase()
    );
    setFilteredPins(filter);
  }, [cat, pins]);

  return (
    <div className="flex flex-wrap mt-8 h-full">
      {filteredPins?.length === 0 ? (
        <h1 className="mx-8 text-lg font-medium">No Pins Found ://</h1>
      ) : (
        <Masonry className="flex w-full" breakpointCols={breakPts}>
          {filteredPins &&
            filteredPins.map((pin: pinsState) => (
              <div key={pin.id} className="max-w-sm mx-8 mb-4 flex flex-col">
                <Link href={`/pin/${pin.id}`} passHref>
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
            ))}
        </Masonry>
      )}
    </div>
  );
};

export default Categories;
