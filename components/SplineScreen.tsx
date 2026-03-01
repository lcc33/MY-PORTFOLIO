"use client";
import { Suspense } from 'react';
import Spline from '@splinetool/react-spline';

export default function SplineScreen() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 flex items-center justify-center">
      <Suspense fallback={<div className="w-full h-full bg-black" />}>
        <Spline 
          scene="https://prod.spline.design/eRWkMy2j0Zp-8Gln/scene.splinecode" 
          className="w-full h-full opacity-60 md:opacity-100 object-cover"
        />
      </Suspense>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black pointer-events-none" />
    </div>
  );
}
