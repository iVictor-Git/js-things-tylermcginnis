const axios = require('axios');

const id = 'YOUR_CLIENT_ID';
const sec = 'YOUR_SECREIT_ID';
const params = '?client_id=' + id + '&client_secret=' + sec;

const getProfile = username =>
  axios
    .get(`https://api.github.com/users/${username} ${params}`)
    .then(user => user.data);

const getRepos = username =>
  axios.get(
    `https://api.github.com/users/${username}/repos?${params}&per_page=100`,
  );

const getStarCount = repos =>
  repos.data.reduce((count, repo) => count + repo.stargazers_count, 0);

const calculateScore = ({ followers }, repos) => {
  const totalStars = getStarCount(repos);

  return followers * 3 + totalStars;
};

const handleError = error => console.warn(error) || null;

const getUserData = player =>
  axios
    .all([getProfile(player), getRepos(player)])
    .then(([profile, repos]) => ({
      profile,
      score: calculateScore(profile, repos),
    }));

const sortPlayers = players => players.sort((a, b) => b.score - a.score);

module.exports = {
  battle(players) {
    return axios
      .all(players.map(getUserData))
      .then(sortPlayers)
      .catch(handleError);
  },
  fetchPopularRepos(language) {
    const encodedURI = window.encodeURI(
      `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`,
    );
    return axios.get(encodedURI).then(response => response.data.items);
  },
};
