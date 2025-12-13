'use client';

import React, { useRef, useState } from 'react';

import { Image } from '@/libs/next';
import classes from './ImagePicker.module.css';

import { iProps } from './ImagePicker.types';

const ImagePicker: React.FC<iProps> = function ({ label = '', name }) {
  const imageInput = useRef<HTMLInputElement>(null);

  const [pickedImage, setPickedImage] = useState<string | null>(null);

  const handleImageChange = function (event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files) {
      setPickedImage(null);
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setPickedImage(result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleClearImage = function () {
    setPickedImage(null);
    if (imageInput.current) {
      imageInput.current.value = '';
    }
  };

  const handleButtonClick = function () {
    imageInput.current?.click();
  };

  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet!</p>}
          {pickedImage && <Image src={pickedImage} alt="Picked meal" fill />}
        </div>
        <input
          ref={imageInput}
          className={classes.input}
          type="file"
          id={name}
          accept="image/png image/jpeg"
          name={name}
          onChange={handleImageChange}
          required
        />
        <div className={classes.buttons}>
          <button type="button" className={classes.button} onClick={handleButtonClick}>
            Choose Image
          </button>
          {pickedImage && (
            <button
              type="button"
              className={`${classes.button} ${classes.clear}`}
              onClick={handleClearImage}
            >
              Clear Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagePicker;
