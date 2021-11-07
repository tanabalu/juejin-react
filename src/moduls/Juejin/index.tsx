import React, { ChangeEvent, Component } from 'react';
import {
  Form,
  Input,
  Button,
  // Select,
  Switch,
  Radio,
  Checkbox,
  Row,
  Col,
  Card,
  Space,
  message,
} from 'antd';
import { postCommand } from '../../service';
import { MessageType, TaskStatus } from '../../enum';
import MessageConfig from '../../config/message';
import './index.less';

const { TextArea } = Input;
const { Item: FormItem } = Form;
// const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const MIN_DEEP = 1;

interface Position {
  x: number;
  y: number;
}

interface Message {}

interface Log {
  time: string;
  type: MessageType;
  message: Message;
}

interface Props {}
interface State {
  isInit: boolean;
  maxSweepTimes: number;
  currentSweepTime: number;
  maxDeep: number;
  isBacking: boolean;
  uid: string;
  gameId: string;
  authorization: string;
  logList: Log[];
  isLoading: boolean;
  taskStatus: TaskStatus;
  position: Position;
  currentMineral: number;
}

export default class Juejin extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isInit: false,
      // 总共执行冲刺方案次数
      maxSweepTimes: 1,
      // 当前冲刺方案执行次数
      currentSweepTime: 0,
      // 自动探路循环次数
      // 当前探路循环执行次数
      // 多少米自动回巢
      maxDeep: 60000,
      // 向前进还是回巢？
      isBacking: false,
      // 用户id
      uid: '',
      // 游戏id
      gameId: '',
      // authid
      authorization: '',
      // 日志列表
      logList: [],
      // 是否正在发送请求
      isLoading: false,
      // 任务状态
      taskStatus: TaskStatus.INIT,
      // 当前位置
      position: {
        x: 0,
        y: 0,
      },
      // 当前矿石数量
      currentMineral: 0,
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (prevState.isInit) {
  //     return prevState;
  //   }
  //   // console.log('dd', nextProps, prevState);
  //   return {
  //     ...prevState,
  //   };
  // }

  // 开始任务
  submit = () => {
    this.go();
  };

  // 停止任务
  handleStopTask = () => {
    this.setState({
      // hasClickStop: true,
      taskStatus: TaskStatus.STOPPING,
    });
  };

  // 重启任务
  handleRestart = () => {
    this.setState({
      taskStatus: TaskStatus.RUNNING,
    });
  };

  // 下行扫楼
  go() {
    const {
      position,
      maxDeep,
      currentSweepTime,
      maxSweepTimes,
      taskStatus,
      uid,
      authorization,
      gameId,
    } = this.state;

    if (position.y >= maxDeep) {
      this.setState({
        isBacking: true,
      });
      this.back();
      return;
    }

    if (
      currentSweepTime >= maxSweepTimes ||
      taskStatus === TaskStatus.STOPPING
    ) {
      // 如果循环次数超限
      message.warn('循环次数超限，已自动退出任务进程');
      return;
    }

    this.setState({
      isLoading: true,
    });

    postCommand({
      uid,
      gameId,
      authorization,
      // TODO:
      command: [],
    }).then((res) => {
      this.setState({
        isLoading: false,
      });
      console.log(res);
    });
  }

  // 上行扫楼
  back() {
    const { position } = this.state;
    if (position.y <= MIN_DEEP) {
      // 全局结束
      return;
    }
  }

  // 增加打印日志
  logger = () => {};

  // 清空当前日志
  clearLog = () => {
    this.setState({
      logList: [],
    });
  };

  // 修改用户ID
  onChangeUid = (e) => {
    const { value } = e.target;
    console.log(value);
    this.setState({
      uid: value,
    });
  };

  // 修改用户身份验证码
  onChangeAuthorization = (e) => {
    const { value } = e.target;
    console.log(value);
    this.setState({
      authorization: value,
    });
  };

  // 修改游戏ID
  onChangeGameId = (e) => {
    const { value } = e.target;
    console.log(value);
    this.setState({
      gameId: value,
    });
  };

  render() {
    const { isBacking, taskStatus } = this.state;
    const {
      onChangeUid,
      onChangeAuthorization,
      onChangeGameId,
      submit,
      handleStopTask,
      handleRestart,
      clearLog,
    } = this;
    return (
      <Row>
        <Col className="gutter-row" span={12}>
          <Card title="工作区">
            <Form {...layout} onFinish={submit}>
              <FormItem name="uid" label="用户ID" rules={[{ required: true }]}>
                <Input placeholder="请输入用户ID" onChange={onChangeUid} />
              </FormItem>
              <FormItem
                name="authorization"
                label="用户身份验证码"
                rules={[{ required: true }]}
              >
                <TextArea
                  placeholder="请输入用户身份校验码"
                  onChange={onChangeAuthorization}
                />
              </FormItem>
              <FormItem
                name="gameId"
                label="游戏ID"
                rules={[{ required: true }]}
              >
                <TextArea
                  placeholder="请输入游戏ID"
                  onChange={onChangeGameId}
                />
              </FormItem>
              <FormItem name="status" label="游戏方向">
                <span className="note">{`${isBacking ? '向下' : '向上'}`}</span>
              </FormItem>
              <FormItem wrapperCol={tailLayout.wrapperCol}>
                <Space>
                  {taskStatus !== TaskStatus.RUNNING && (
                    <Button
                      type="primary"
                      disabled={taskStatus === TaskStatus.STOPPING}
                      htmlType="submit"
                    >
                      开始
                    </Button>
                  )}
                  <Button
                    type="primary"
                    disabled={taskStatus !== TaskStatus.STOPPING}
                    onClick={handleStopTask}
                    danger
                  >
                    停止
                  </Button>
                  {taskStatus === TaskStatus.STOPPING && (
                    <Button type="primary" onClick={handleRestart}>
                      重启任务
                    </Button>
                  )}
                </Space>
              </FormItem>
            </Form>
          </Card>
        </Col>
        <Col className="gutter-row" span={12}>
          <Card title="日志中心">
            <div className="logger-container">fds</div>
            <Button type="primary" onClick={clearLog}>
              清空日志
            </Button>
          </Card>
        </Col>
      </Row>
    );
  }
}
