import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

import Loading from './Loading';

function SelectLangauge({ selectedLanguage, onSelect }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className="languages">
      {languages.map(lang => (
        <li
          style={lang === selectedLanguage ? { color: '#d0021b' } : null}
          onClick={() => onSelect(lang)}
          key={lang}>
          {lang}
        </li>
      ))}
    </ul>
  );
}

SelectLangauge.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const RepoGrid = ({ repos }) => (
  <ul className="popular-list">
    {repos.map(
      (
        { name, owner: { avatar_url, login }, stargazers_count, html_url },
        index,
      ) => (
        <li key={name} className="popular-item">
          <div className="popular-rank">#{index + 1}</div>
          <ul className="space-list-items">
            <li>
              <img
                className="avatar"
                src={avatar_url}
                alt={'Avatar for ' + login}
              />
            </li>
            <li>
              <a href={html_url}>{name}</a>
            </li>
            <li>@{login}</li>
            <li>{stargazers_count}</li>
          </ul>
        </li>
      ),
    )}
  </ul>
);

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null,
  };

  componentDidMount() {
    // AJAX calls here
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage = async lang => {
    this.setState(() => ({ selectedLanguage: lang, repos: null }));

    const repos = await fetchPopularRepos(lang);

    this.setState(() => ({ repos }));
  };

  render() {
    const { selectedLanguage, repos } = this.state;
    return (
      <div>
        <SelectLangauge
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!repos ? <Loading /> : <RepoGrid repos={repos} />}
      </div>
    );
  }
}

export default Popular;
