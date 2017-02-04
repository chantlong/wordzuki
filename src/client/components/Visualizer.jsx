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
      count: 0,
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

  componentDidMount() {
    const start = (e) => {
      const count = Number(e.target.classList[1]);
      this.setState({ count });
    };
    const elements = Array.from(document.querySelectorAll('rect'));
    elements.forEach((el) => {
      el.addEventListener('touchstart', start);
      el.addEventListener('mouseover', start);
    });
  }

  render() {
    return (
      <div>
        <div className="f6 wall-bg flex flex-column items-center justify-center">
          <div className="near-white br3 bg-mid-gray pa3 center ma3">{`${this.state.count}個`}</div>
          <div className="w5 ml5">
            <CalendarHeatmap
              numDays={90}
              horizontal={false}
              values={this.state.filteredResults}
              gutterSize={1.5}
              classForValue={(value) => {
                if (!value) {
                  return 'color-empty 0';
                }
                if (value.count < 2) {
                  return `color-scale-1 ${value.count}`;
                }
                if (value.count < 7) {
                  return `color-scale-2 ${value.count}`;
                }
                if (value.count < 15) {
                  return `color-scale-3 ${value.count}`;
                }
                return `color-scale-4 ${value.count}`;
              }}
            />
          </div>
          <div className="flex items-center fr mv3">
            <p className="dib f7 ma1">Less</p>
            <div className="w1 h1 ma1 dib react-calendar-heatmap color-empty" />
            <div className="w1 h1 ma1 dib react-calendar-heatmap color-scale-1" />
            <div className="w1 h1 ma1 dib react-calendar-heatmap color-scale-2" />
            <div className="w1 h1 ma1 dib react-calendar-heatmap color-scale-3" />
            <div className="w1 h1 ma1 dib react-calendar-heatmap color-scale-4" />
            <p className="dib f7 ma1">More</p>
          </div>
          <p className="tc db cr mt2">今までは<span className="b">{this.state.total}</span>個の単語をを保存してきました。&#x1F4D2;</p>
        </div>
      </div>
    );
  }
}

Visualizer.propTypes = {
  filterByDate: PropTypes.func,
};

export default Visualizer;
