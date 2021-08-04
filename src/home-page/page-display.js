import gotoCommentPage from '../comments/popup.js';
import { likeMovie, getLikes } from '../api/involvement.js';

class ShowContainer {
  constructor(showImage, showName, showLikes, showId) {
    this.showImage = showImage;
    this.showName = showName;
    this.showLikes = showLikes;
    this.updateLikes = this.updateLikes.bind(this);
    this.updateLikes.numLikesDisplay = null;
    this.showId = showId;
  }

  updateLikes() {
    this.numLikesDisplay.innerText = this.showLikes === 1 ? `${this.showLikes} Like` : `${this.showLikes} Likes`;
  }

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

    this.numLikesDisplay = numLikes;

    const likeButton = document.createElement('i');
    likeButton.classList.add('far', 'fa-heart');

    likeButton.addEventListener('click', async () => {
      const status = await likeMovie(this.showId);
      if (status === 201) {
        this.showLikes += 1;
        this.updateLikes();
      }
    });

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

    this.updateLikes();
  }
}

const displayShows = async (shows) => {
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
};

export default displayShows;