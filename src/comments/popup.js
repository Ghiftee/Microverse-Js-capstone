import { lookupShow, getComments, postCommentToApi } from '../api/api.js';

const addItemToList = (ul, arr) => {
  arr.forEach((el) => {
    ul.innerHTML += `<li class="comment-list-item my-1">${el.creation_date} ${el.username}: ${el.comment}</li>`;
  });
};

export const getCounts = (arr) => arr.length;

const incrementCount = (title, commentsInfo) => {
  const value = getCounts(commentsInfo) + 1;
  title.textContent = `Comments (${value})`;
};

export const gotoCommentPage = async (showId) => {
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
          <h4 class="comments-title my-2">Comments (${getCounts(commentsInfo)})</h4>
          <ul class="comments-list list-group list-unstyled"></ul>
          <h5 class="add-comment my-4">Add a comment</h5>
          <form class="d-flex flex-column align-items-start" action="#">
            <input
                class="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="Your name"
            /><br />
            <textarea
                class="form-control"
                type="text"
                id="insight"
                name="insight"
                placeholder="Your insights"
                rows="4" 
                cols="50"
            ></textarea><br />
            <input class="btn btn-dark" type="submit" id="submit-btn" value="Comment" />
        </form>
        </div>
  `;
  const ul = document.querySelector('.comments-list');
  addItemToList(ul, commentsInfo);

  const closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', () => modal.classList.remove('active'));

  const name = document.querySelector('#name');
  const insight = document.querySelector('#insight');
  const form = document.querySelector('form');
  const title = document.querySelector('.comments-title');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    postCommentToApi(showId, name.value, insight.value);
    addItemToList(ul, [
      {
        creation_date: '2021-08-04',
        username: name.value,
        comment: insight.value,
      },
    ]);
    name.value = '';
    insight.value = '';
    incrementCount(title, commentsInfo);
  });
};
