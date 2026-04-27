import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';

export default function Logo({ size = 100 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="100" y2="100">
          <Stop offset="0" stopColor="#F27405" />
          <Stop offset="1" stopColor="#FFB74D" />
        </LinearGradient>
      </Defs>
      <Circle cx="50" cy="50" r="45" fill="#1E1E1E" stroke="url(#grad)" strokeWidth="4" />
      <Path
        d="M35 35 L65 35 L45 70"
        stroke="url(#grad)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}