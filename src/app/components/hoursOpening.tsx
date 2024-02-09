import React from 'react';
import alarm from '../assets/images/tv-della/alarm.svg';
import Image from 'next/image';

export const HourOpening = () => (
  <footer>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <Image
      src={alarm}
      alt=""
    />
    {/* <img
      src={alarm}
      alt=""
    /> */}
    <div>
      <h3>FUNCIONAMENTO</h3>
      <p>
        Segunda a segunda-feira
        <br />
        das 6h as 22:30h
      </p>
    </div>
  </footer>
);
export default HourOpening;
