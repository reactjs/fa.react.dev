/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 * @flow
 */

import React, {Component} from 'react';
import {colors, media} from 'theme';

type State = {
  enabled: boolean,
};

class DocSearch extends Component<{}, State> {
  state = {
    enabled: true,
  };
  componentDidMount() {
    // Initialize Algolia search.
    // TODO Is this expensive? Should it be deferred until a user is about to search?
    // eslint-disable-next-line no-undef
    if (window.docsearch) {
      window.docsearch({
        apiKey: '36221914cce388c46d0420343e0bb32e',
        indexName: 'react',
        inputSelector: '#algolia-doc-search',
      });
    } else {
      console.warn('Search has failed to load and now is being disabled');
      this.setState({enabled: false});
    }
  }

  render() {
    const {enabled} = this.state;

    return enabled ? (
      <form
        css={{
          display: 'flex',
          flex: '0 0 auto',
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: '0.25rem',
          paddingRight: '0.25rem',

          [media.lessThan('expandedSearch')]: {
            justifyContent: 'flex-end',
          },
          [media.lessThan('large')]: {
            marginLeft: 10,
          },
          // TODO: Something like this could show the full search box in more cases
          // but it currently breaks its expanding animation.
          // [media.between('mediumSearch', 'largerSearch')]: {
          //   width: 'calc(100% / 8)',
          // },
          [media.greaterThan('expandedSearch')]: {
            minWidth: 100,
          },
        }}>
        <input
          css={{
            width: '100%',
            appearance: 'none',
            background: 'transparent',
            border: 0,
            color: colors.white,
            fontSize: 18,
            fontWeight: 300,
            fontFamily: 'inherit',
            position: 'relative',
            padding: '4px 29px 4px 4px',
            backgroundImage: 'url(/search.svg)',
            backgroundSize: '16px 16px',
            backgroundRepeat: 'no-repeat',
            backgroundPositionY: 'center',
            backgroundPositionX: '98%',

            ':focus': {
              outline: 0,
              backgroundColor: colors.lighter,
              borderRadius: '0.25rem',
            },

            [media.lessThan('expandedSearch')]: {
              fontSize: 16,
              width: '16px',
              transition: 'width 0.2s ease, padding 0.2s ease',
              paddingRight: '16px',

              ':focus': {
                paddingRight: '29px',
                width: '8rem',
                outline: 'none',
              },
            },
          }}
          id="algolia-doc-search"
          type="search"
          placeholder="Search"
          aria-label="Search docs"
          dir="rtl"
        />
      </form>
    ) : null;
  }
}

export default DocSearch;
