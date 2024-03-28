import React from 'react';
import LottieView from 'lottie-react-native';

// Componente que agregar logo animado especificando tamaño y reproducción del mismo.

interface Props {
  width: number;
  height: number;
  loop?: boolean;
  autoplay?: boolean;
}

export const AnimatedLogo = ({
  width,
  height,
  loop = false,
  autoplay = false,
}: Props) => {
  return (
    <LottieView
      source={require('../../assets/images/cliMarte-logo-animated.json')}
      style={{width: width, height: height}}
      loop={loop}
      autoPlay={autoplay}
    />
  );
};
