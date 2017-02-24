import React, { PropTypes } from 'react';

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
    const { KVBImporter } = this.props;
    KVBImporter(this.state.formData);
  }

  render() {
    const { inRequest, message, KVBDone } = this.props;
    return (
      <div className="pa3 measure-wide center">
        {inRequest === true && <div className="flex justify-center items-center w-100 h-100">
          <div className="loader">
            <div className="line" />
            <div className="line" />
            <div className="line" />
            <div className="line" />
          </div>
        </div>}
        {inRequest === false && message.SUCCESS && <div>
          <section className="pa2 f6 tc measure-narrow center ba br2 b--black-50 ma4 bg-white">
            <h2 className="f6 fw5">{message.SUCCESS}</h2>
          </section>
        </div>}
        {inRequest === false && message.SUCCESS ? KVBDone() : null }
        {inRequest === undefined && <div>
          <section className="pa2 f6 tc">
            <h1 className="measure center f4 fw3 pb3 bb b--light-silver">Kindle単語帳の導入</h1>
            <p className="pa2">Kindleで調べた単語をwordzukiに導入する。</p>
            <h2 className="f5 fw5 pv2">＜説明＞</h2>
            <ul className="list">
              <li className="pv2">1. Kindleの端末をパソコンに接続する。</li>
              <li className="pv2">2. &#39;Kindle\system\vocabulary&#39; のフォルダーを開く。</li>
              <p className="f6">＊これは隠れフォルダーなので、表示させる必要がある。</p>
              <li>3. &#39;vocab.db&#39;をこちらにアップしてください。</li>
            </ul>
          </section>
          <form
            className="measure-narrow center pa2 tc bg-white"
            method="post"
            encType="multipart/form-data"
            onSubmit={this.handleSubmit}
          >
            <label htmlFor="upload-button" className="w3 ma2 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer">DBを選択</label>
            <input
              className="dn"
              type="file"
              name="kindlevb"
              accept=".db"
              onChange={this.handleChange}
              id="upload-button"
            />
            <button
              className="ma2 pa2 pb1 fw5 ba b--light-silver br2 bg-transparent grow f6 dib hover-bg-dark-gray hover-white pointer"
              type="submit"
            >インポートする
            </button>
            { message && message.ERROR ? <div className="f7 pt3 dark-red">{message.ERROR}</div> : null}
          </form>
          <section className="pa2 f6 tc">
            <h2 className="f5 fw5 pv2">＜Macで隠れフォルダーを表示する方法＞</h2>
            <ul className="list mb4">
              <li className="pv2">ターミナルを開き、下記の二行を別々に入力する。</li>
              <li className="pv2">defaults write com.apple.finder AppleShowAllFiles YES</li>
              <li className="pv2">killall Finder</li>
              <li className="pv2">これではMacの隠れフォルダーがすべて表示される。</li>
              <br />
              <li className="pv2">非表示にするには、下記の二行を別々に入力する。</li>
              <li className="pv2">defaults write com.apple.finder AppleShowAllFiles NO</li>
              <li className="pv2">killall Finder</li>
            </ul>
            <h2 className="f5 fw5 pv2">＜Windowsの場合＞</h2>
            <span className="pv2"><a
              href="https://helpx.adobe.com/jp/x-productkb/global/cpsid_87117.html"
              className="near-black dim"
              target="_blank"
              rel="noopener noreferrer"
            >こちら</a>を参考してください。</span>
          </section>
        </div>}
      </div>
    );
  }
}

KVBImport.propTypes = {
  KVBImporter: PropTypes.func,
  KVBDone: PropTypes.func,
  inRequest: PropTypes.bool,
  message: PropTypes.objectOf(
    PropTypes.string,
  ),
};

export default KVBImport;
