import gotoCommentPage from '../comments/popup.js';

class ShowContainer {
  constructor(showImage, showName, showLikes, showId) {
    this.showImage = showImage;
    this.showName = showName;
    this.showLikes = `${showLikes} Likes`;
    this.showId = showId;
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

    const likeButton = document.createElement('i');
    likeButton.classList.add('far', 'fa-heart');

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
  }
}

const displayShows = (shows) => {
  shows.forEach((show) => {
    const showContainer = new ShowContainer(
      show.image.original,
      show.name,
      0,
      show.id,
    );
    showContainer.display();
  });
};

const addItemToList = (ul, arr) => {
  arr.forEach((el) => {
    ul.innerHTML += `<li class="comment-list-item my-1">${el.creation_date} ${el.username}: ${el.comment}</li>`;
  });
};

export { displayShows, addItemToList };
