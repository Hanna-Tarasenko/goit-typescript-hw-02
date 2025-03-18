import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import toast from "react-hot-toast";
import ImageModal from "./components/ImageModal/ImageModal";
import { fetchImages } from "./services/Unsplash";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

interface SelectedImage {
  src: string;
  alt: string;
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<SelectedImage>({
    src: "",
    alt: "",
  });

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    const getImages = async () => {
      if (!searchQuery) return;

      setLoading(true);
      setError(null);
      try {
        const fetchedImages = await fetchImages({ query: searchQuery, page });
        setImages((prevImages) => [...prevImages, ...fetchedImages]);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to fetch images.");
        toast.error("Failed to fetch images.");
      } finally {
        setLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: SelectedImage) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {loading && images.length === 0 && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && images.length > 0 && (
        <>
          <ImageGallery
            images={images}
            loading={loading}
            loadMore={loadMore}
            openModal={openModal}
          />
        </>
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        imageSrc={selectedImage.src}
        alt={selectedImage.alt}
      />
    </div>
  );
};

export default App;
