const baseUrl = 'https://api.tvmaze.com';
const involvementBaseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const appId = '5hF9fBsu1C5R7svnB4ZC';

const lookupShow = async (showId) => {
  const url = `${baseUrl}/shows/${showId}`;
  let show = await fetch(url);
  show = await show.json();
  return show;
};

const getComments = async (showId) => {
  const url = `${involvementBaseUrl}/${appId}/comments?item_id=${showId}`;
  let comments = await fetch(url);
  comments = await comments.json();
  return comments;
};

const postCommentToApi = async (showId, name, insight) => {
  const url = `${involvementBaseUrl}/${appId}/comments`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: `${showId}`,
      username: name,
      comment: insight,
    }),
  });
  return response.json();
};

export { lookupShow, getComments, postCommentToApi };
