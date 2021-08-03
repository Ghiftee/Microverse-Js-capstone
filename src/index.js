import './style.css';
import lookupShow from './api/api.js';
import displayShows from './home-page/page-display.js';

const shows = [];

document.addEventListener('DOMContentLoaded', async () => {
  shows.push(
    await lookupShow(139),
    await lookupShow(140),
    await lookupShow(141),
    await lookupShow(145),
    await lookupShow(143),
    await lookupShow(144),
  );
  displayShows(shows);
});
