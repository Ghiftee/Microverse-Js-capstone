import { lookupShow, getComments } from '../api/api.js';

const addItemToList = (ul, arr) => {
  arr.forEach((el) => {
    ul.innerHTML += `<li class="comment-list-item my-1">${el.creation_date} ${el.username}: ${el.comment}</li>`;
  });
};

async function gotoCommentPage(showId) {
  const showInfo = await lookupShow(showId);
  const commentsInfo = await getComments(showId);
  const modal = document.querySelector('.modal');
  modal.classList.add('active');

  modal.innerHTML = `
  <div
          class="
            modal-content
            d-flex
            flex-column
            align-items-center
            justify-content-center
          "
        >
          <div class="d-flex flex-row w-100 justify-content-center">
            <img
              src="${showInfo.image.medium}"
              alt="shows"
              class="popup-image"
            />
            <div class="close">&times;</div>
          </div>
          <h3 class="popup-title my-4">${showInfo.name}</h3>
          <div class="info d-flex flex-row my-2 w-75">
            <div class="categories d-flex flex-column align-items-start w-50">
              <h5>Genre : ${showInfo.genres[0]}</h5>
              <h5>Language : ${showInfo.language}</h5>
            </div>
            <div class="categories d-flex flex-column align-items-start w-50">
              <h5>Release Date : ${showInfo.premiered.split('-')[0]}</h5>
              <h5>Rating : ${showInfo.rating.average}</h5>
            </div>
          </div>
          <h4 class="comments-title my-2">Comments</h4>
          <ul class="comments-list list-group list-unstyled">
          </ul>
        </div>
  `;
  const ul = document.querySelector('.comments-list');
  addItemToList(ul, commentsInfo);

  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', () => modal.classList.remove('active'));
}

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

export { displayShows, addItemToList };
