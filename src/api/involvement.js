const baseUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi';

const createApp = async () => {
  const response = await fetch(`${baseUrl}/apps`, { method: 'POST' });
  const appId = await response.text();
  if (!localStorage.getItem('appId')) localStorage.setItem('appId', appId);
};

const getLikes = async () => {
  const appId = localStorage.getItem('appId');
  const response = await fetch(`${baseUrl}/apps/${appId}/likes`);
  let likes = await response.text();
  if (likes.length === 0) likes = '[]';
  return JSON.parse(`{"likes": ${likes}}`);
};

module.exports = { createApp, getLikes };