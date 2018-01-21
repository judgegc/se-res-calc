import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from './../actions';

import FilterBox from './../components/filter-box';

export default connect(state => ({ value: state.filter }), { onChangeEvent: setFilter })(FilterBox);