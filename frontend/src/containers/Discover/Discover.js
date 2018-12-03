import React, { Component } from 'react';
import { connect } from 'react-redux';
import Filters from '../../components/MOLECULES/Discover-M/Filters-M/Filters';

import * as u from '../../shared/Utility';

class Discover extends Component {
  state = {
    filters: {
      sortBy: {
        inputType: 'select',
        value: 'Sort Order',
        dictionary: true,
        inputConfig: {
          name: 'sort_by',
          default: 'Sort Order'
        },
        options: [
          { text: 'Sort Order' },
          { text: 'Popularity: High to Low' },
          { text: 'Popularity: Low to High' },
          { text: 'Rating: High to Low' },
          { text: 'Rating: Low to High' },
          { text: 'Release Date: New to Old' },
          { text: 'Release Date: Old to New' },
          { text: 'Title: A to Z' },
          { text: 'Title: Z to A' },
          { text: 'Revenue: High to Low' },
          { text: 'Revenue: Low to High' }
        ]
      },
      year: {
        inputType: 'select',
        value: 'By Year',
        inputConfig: {
          name: 'year',
          default: 'By Year'
        },
        options: u.getOptionsIntRange('By Year', 50, u.getCurrentYear(), 'desc')
      },
      rating: {
        inputType: 'select',
        value: 'By Rating',
        inputConfig: {
          name: 'vote_average.gte',
          default: 'By Rating'
        },
        options: u.getOptionsIntRange('By Rating', 10, 10, 'desc')
      },
      keywords: {
        inputType: 'text',
        value: '',
        inputConfig: {
          type: 'text',
          placeholder: 'Keywords',
          name: 'with_keywords'
        }
      },
      people: {
        inputType: 'text',
        value: '',
        inputConfig: {
          type: 'text',
          placeholder: 'People Involved',
          name: 'with_people'
        }
      }
    }
  }
  
  updateInputValueHandler = (e, stateKey, updateKey) => {
    let newValue = '';
    if(e.target && e.target.value) {
      newValue = e.target.value;
    } else if(typeof e === 'string') {
      newValue = e;
    }

    this.setState({ 
      [stateKey]: {
        ...this.state[stateKey],
        [updateKey]: {
          ...this.state[stateKey][updateKey],
          value: newValue
        }
      }
    });
  }

  applyFiltersHandler = (e) => {
    e.preventDefault();
    const filterQuery = {};
    let pathString = [];
    
    Object.entries(this.state.filters).forEach(([key, data]) => {
      if(data.inputType === 'select' && data.inputConfig.default !== data.value) {
        if(data.dictionary) {
          const queryValue = u.getDiscoverOrderQueryValue(data.value);
          filterQuery[key] = { name: data.inputConfig.name, value: queryValue };
          pathString.push([data.inputConfig.name, queryValue].join('='));
        } else {
          filterQuery[key] = { name: data.inputConfig.name, value: data.value };
          pathString.push([data.inputConfig.name, data.value].join('='));
        }
      } else if(data.inputType !== 'select' && data.value !== '') {
        filterQuery[key] = { name: data.inputConfig.name, value: data.value };        
        pathString.push([data.inputConfig.name, data.value].join('='));
      }
    });

    if(Object.keys(filterQuery).length !== 0) {
      console.log(filterQuery);
      console.log(this.props);
      pathString = pathString.join('&');
      this.props.history.push({
        pathname: '/discover',
        search: `?${pathString}`
      });
    } else {
      this.props.history.push('/discover');
    }

  }

  render() { 
    return ( 
      <Filters 
        stateKey='filters'
        applyFilters={this.applyFiltersHandler}
        inputChanged={this.updateInputValueHandler}
        filters={this.state.filters} />
    );
  }
}

const mapStateToProps = state => {
  return {

  };
}

const mapDispatchToProps = dispatch => {
  return {

  };
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Discover);