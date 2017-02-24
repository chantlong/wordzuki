import React from 'react';

const Help = () => (
  <div className="w-100 h-100 mid-gray">
    <nav className="dib w-100 w-30-m w-20-l v-top border-box bg-near-white vh-100-ns h-30">
      <ul className="list ma3 ma4-ns ph2 tr fw3 f6 pointer">
        <li className="mv3 fw5 red">ヘルプ</li>
        <li className="pv2">
          <a className="link hover-red">キーボード ショートカット</a>
        </li>
      </ul>
    </nav>
    <div className="dib w-100 w-70-m w-50-l border-box pa5-ns pa3">
      <section>
        <p className="f4 fw3 ma0 pl3 pb3 mb4 bb b--light-silver">キーボード ショートカット</p>
        <table className="w-100">
          <tbody className="f6 fw4">
            <tr>
              <th className="ba b--black-10 pa3 tl f5 fw5 bg-near-white">ショットカット</th>
              <th className="ba b--black-10 pa3 tl f5 fw5 bg-near-white">操作</th>
            </tr>
            <tr>
              <td className="ba b--black-10 pa3">Option + `</td>
              <td className="ba b--black-10 pa3">検索</td>
            </tr>
            <tr>
              <td className="ba b--black-10 pa3">Option + 0</td>
              <td className="ba b--black-10 pa3">新規単語を作成</td>
            </tr>
            <tr>
              <td className="ba b--black-10 pa3">Option + 1</td>
              <td className="ba b--black-10 pa3">単語を編集する</td>
            </tr>
            <tr>
              <td className="ba b--black-10 pa3">[</td>
              <td className="ba b--black-10 pa3">単語の発音</td>
            </tr>
            <tr>
              <td className="ba b--black-10 pa3">]</td>
              <td className="ba b--black-10 pa3">単語の例の発音</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>
);

export default Help;
