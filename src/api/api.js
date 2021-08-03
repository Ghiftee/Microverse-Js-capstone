const baseUrl = 'https://api.tvmaze.com';

const lookupShow = async (showId) => {
  const url = `${baseUrl}/shows/${showId}`;
  let show = await fetch(url);
  show = await show.json();
  return show;
};

export default lookupShow;
