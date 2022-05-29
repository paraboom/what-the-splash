const ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const URL = 'https://api.unsplash.com/photos';

const fetchImages = async page => {
  const response = await fetch(
    `${URL}/?client_id=${ACCESS_KEY}&per_page=3&page=${page}`,
  );
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

const fetchImageStats = async id => {
  const response = await fetch(
    `${URL}/${id}/statistics?client_id=${ACCESS_KEY}`,
  );
  const data = await response.json();
  if (response.status >= 400) {
    throw new Error(data.errors);
  }
  return data;
};

export { fetchImages, fetchImageStats };
