import Image from "next/image";

import aidedImage from "@/images/aided.jpg";
import chicagoImage from '@/images/chicago.jpg';
import formalImage from '@/images/formal.jpg';
import golfImage from '@/images/golf.jpg';
import graduationImage from '@/images/graduation.jpg';
import spartahackImage from '@/images/spartahack.jpg';

export default function Gallery() {
  return (
    <div className="columns-2 sm:columns-3 gap-4 my-8 not-prose">
      <div className="h-40 mb-4">
        <Image
          src={aidedImage}
          alt="A selfie I took with my undergraduate drone research team"
          className="w-full h-full object-cover rounded-lg"
          priority
        />
      </div>
      <div className="h-80 mb-4 sm:mb-0">
        <Image
          src={golfImage}
          alt="A selfie I took with my undergraduate drone research team"
          className="w-full h-full object-cover rounded-lg"
          priority
        />
      </div>
      <div className="h-40 sm:h-80 sm:mb-4">
        <Image
          src={formalImage}
          alt="A selfie I took with my undergraduate drone research team"
          className="w-full h-full object-cover rounded-lg"
          priority
        />
      </div>
      <div className="h-40 mb-4 sm:mb-0">
        <Image
          src={spartahackImage}
          alt="A selfie I took with my undergraduate drone research team"
          className="w-full h-full object-cover rounded-lg"
          priority
        />
      </div>
      <div className="h-40 mb-4">
        <Image
          src={graduationImage}
          alt="A selfie I took with my undergraduate drone research team"
          className="w-full h-full object-cover rounded-lg"
          priority
        />
      </div>
      <div className="h-80">
        <Image
          src={chicagoImage}
          alt="A selfie I took with my undergraduate drone research team"
          className="w-full h-full object-cover rounded-lg"
          priority
        />
      </div>
    </div>
  );
}
