import React, { PropTypes } from 'react';
import fetch from 'isomorphic-fetch';

class KVBImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const formData = new FormData();
    formData.append('kindlevb', e.target.files[0]);
    this.setState({
      formData,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch('/api/kvb/', {
      method: 'POST',
      body: this.state.formData,
      credentials: 'include',
    })
    .then(res => (res.json()))
    .then(res => console.log('the res in kvb', res))
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="pa4">
        <form
          className="measure-narrow center ba br2 b--black-50 pa2 pb4 tc ma4 bg-white"
          method="post"
          encType="multipart/form-data"
          onSubmit={this.handleSubmit}
        >
     
          <input
            className="ph2 pt2 pb1 input-reset ba br2 b--light-silver hover-bg-dark-gray hover-white w-75 f6"
            type="file"
            name="kindlevb"
            accept=".db"
            onChange={this.handleChange}
            id="upload-button"
          />
          <button
            className="mt1 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
            type="submit"
          >Submit
          </button>
        </form>
      </div>
    );
  }
}

export default KVBImport;
