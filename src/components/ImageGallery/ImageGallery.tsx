import React from "react";
import ImageCard from "../ImageCard/ImageCard";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import s from "./ImageGallery.module.css";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface ImageGalleryProps {
  images: Image[];
  loading: boolean;
  loadMore: () => void;
  openModal: (image: { src: string; alt: string }) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  loading,
  loadMore,
  openModal,
}) => {
  return (
    <div>
      <ul className={s.gallerycontainer}>
        {images.map((image) => (
          <li className={s.galleryItem} key={image.id}>
            <ImageCard
              src={image.urls.small}
              alt={image.alt_description}
              onClick={() =>
                openModal({
                  src: image.urls.regular,
                  alt: image.alt_description,
                })
              }
            />
          </li>
        ))}
      </ul>
      {loading && <Loader />}
      {!loading && images.length > 0 && (
        <LoadMoreBtn onLoadMore={loadMore} show={true} />
      )}
    </div>
  );
};

export default ImageGallery;
