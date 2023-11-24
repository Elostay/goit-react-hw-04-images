import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContainer } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import DNA from './Loader/Loader';
import getImages from 'helpers/api';

const App = () => {
  const [results, setResults] = useState([]);
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [totalImages, setTotalImages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (q === '' && page === 1) {
      return;
    }
    const searchByData = async () => {
      try {
        setLoading(true);
        const data = await getImages(q, page);

        const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
          id,
          webformatURL,
          largeImageURL,
        }));

        setResults(prevState => [...prevState, ...images]);
        setTotalImages(data.totalHits);
      } catch (error) {
        toast.error('🦄 Something went wrong');
      } finally {
        setLoading(false);
      }
    };
    searchByData();
  }, [q, page]);

  const inputHandler = query => {
    if (query === '') {
      toast.info('🦄 Enter something');
      return;
    }

    setQ(query);
    setPage(1);
    setResults([]);
    setTotalImages(0);
  };

  const loadMore = async () => {
    setPage(prevState => prevState + 1);
  };

  return (
    <AppContainer>
      <Searchbar onSubmit={inputHandler} />

      <ImageGallery array={results} />
      {loading ? (
        <DNA />
      ) : (
        totalImages > results.length &&
        !!totalImages && <Button onClick={loadMore} />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </AppContainer>
  );
};

export default App;
