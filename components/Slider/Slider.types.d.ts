import { StaticImageData } from 'next/image';

export type ImageType = {
  image: StaticImageData;
  alt: string;
};

export interface iProps {
  prop?: string;
}
