import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { charactersSelector } from '../../reducers';

const CharactersPage = ({ characters }) => (
  <div>
    {characters.length === 0 && (
      <div className="text-center">
        <div className="alert alert-info">
          You have no characters yet. How about creating one?
        </div>
        <Link to="/characters/new" className="btn btn-primary btn-lg">
          Create New Character
        </Link>
      </div>
    )}
  </div>
);

CharactersPage.propTypes = {
  characters: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
  characters: charactersSelector(state),
});

export default connect(mapStateToProps)(CharactersPage);
