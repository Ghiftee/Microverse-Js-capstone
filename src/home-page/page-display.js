import gotoCommentPage from '../comments/popup.js';
// start
import { likeMovie, getLikes } from '../api/involvement.js';
// stop

class ShowContainer {
  constructor(showImage, showName, showLikes, showId) {
    this.showImage = showImage;
    this.showName = showName;

    // start
    // this.showLikes = `${showLikes} Likes`;
    this.showLikes = showLikes;
    this.updateLikes = this.updateLikes.bind(this);
    this.updateLikes.numLikesDisplay = null;
    // stop
    this.showId = showId;
  }

  // start
  updateLikes() {
    this.numLikesDisplay.innerText = this.showLikes === 1 ? `${this.showLikes} Like` : `${this.showLikes} Likes`;
  }
  // stop

  display() {
    const showsPanel = document.getElementById('movies-display');
    const container = document.createElement('div');
    container.classList.add('col-4', 'mb-4');

    const showImg = document.createElement('img');
    showImg.src = this.showImage;
    showImg.classList.add('w-100', 'h-auto');

    const showTitle = document.createElement('p');
    showTitle.classList.add('mb-0');
    showTitle.innerText = this.showName;
    const numLikes = document.createElement('p');
    numLikes.classList.add('text-end', 'mb-0');
    numLikes.innerText = this.showLikes;

    // start
    this.numLikesDisplay = numLikes;
    // stop

    const likeButton = document.createElement('i');
    likeButton.classList.add('far', 'fa-heart');

    // start
    likeButton.addEventListener('click', async () => {
      const status = await likeMovie(this.showId);
      if (status === 201) {
        this.showLikes += 1;
        this.updateLikes();
      }
    });
    // stop

    const infoDiv = document.createElement('div');
    infoDiv.classList.add(
      'd-flex',
      'justify-content-between',
      'align-items-baseline',
      'mt-2',
    );
    infoDiv.append(showTitle, likeButton);
    const commentButton = document.createElement('button');
    commentButton.classList.add('mt-2');
    commentButton.innerText = 'Comment';

    commentButton.addEventListener('click', () => gotoCommentPage(this.showId));

    container.append(showImg, infoDiv, numLikes, commentButton);
    showsPanel.append(container);

    // start
    this.updateLikes();
    // stop
  }
}

const displayShows = async (shows) => {
  // start
  const result = await getLikes();
  shows.forEach((show) => {
    let numLikes = 0;
    numLikes = result.likes.find((item) => item.item_id === show.id)
      ? result.likes.find((item) => item.item_id === show.id).likes : 0;
    const showContainer = new ShowContainer(
      show.image.original,
      show.name,
      numLikes,
      show.id,
    );
    showContainer.display();
  });
  // stop
};

export default displayShows;