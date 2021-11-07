import React, { Component } from 'react';
import { render } from 'react-dom';
import { ConfigProvider } from 'antd';
import Juejin from './src/moduls/Juejin';
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './style.css';

moment.locale('zh-cn');

interface AppProps {}
interface AppState {
  name: string;
}

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React',
    };
  }

  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Juejin />
      </ConfigProvider>
    );
  }
}

render(<App />, document.getElementById('root'));
