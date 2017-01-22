/* eslint-disable no-param-reassign */

import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';
import CalendarHeatmap from 'react-calendar-heatmap';

const dateFormat = (accum, item) => {
  const date = new Date(item.createdAt);
  const YMD = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  if (!accum[YMD]) {
    accum[YMD] = 0;
  }
  accum[YMD] += 1;
  return accum;
};

class Visualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredResults: [],
      total: 0,
    };
  }

  componentWillMount() {
    fetch('/api/word', { credentials: 'same-origin' })
      .then(res => res.json())
      .then((words) => {
        const dateTally = words.reduce(dateFormat, {});
        const filteredResults = [];
        let total = 0;
        Object.keys(dateTally).forEach((key) => {
          filteredResults.push({ date: key, count: dateTally[key] });
          total += dateTally[key];
        });
        this.setState({ filteredResults, total });
      });
  }

  render() {
    return (
      <div className="ma4 f6 measure center">
        <CalendarHeatmap
          values={this.state.filteredResults}
          gutterSize={1.5}
          classForValue={(value) => {
            if (!value) {
              return 'color-empty';
            }
            if (value.count < 2) {
              return 'color-scale-1';
            }
            if (value.count < 7) {
              return 'color-scale-2';
            }
            if (value.count < 15) {
              return 'color-scale-3';
            }
            return 'color-scale-4';
          }}
        />
        <div className="flex items-center fr ma2">
          <p className="dib f7 ma1">Less</p>
          <div className="w0 h0 ma1 dib react-calendar-heatmap color-empty" />
          <div className="w0 h0 ma1 dib react-calendar-heatmap color-scale-1" />
          <div className="w0 h0 ma1 dib react-calendar-heatmap color-scale-2" />
          <div className="w0 h0 ma1 dib react-calendar-heatmap color-scale-3" />
          <div className="w0 h0 ma1 dib react-calendar-heatmap color-scale-4" />
          <p className="dib f7 ma1">More</p>
        </div>
        <p className="tc db cr ma4">今までは<span className="b">{this.state.total}</span>個の単語をを保存してきました。</p>
      </div>
    );
  }
}

Visualizer.propTypes = {
  filterByDate: PropTypes.func,
};

export default Visualizer;
