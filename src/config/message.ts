import { MessageType } from '../enum';

export default {
  [MessageType.EXECUTE]: '任务执行通知',
  [MessageType.ENCOUNTER_BARRIER]: '遇到障碍通知',
  [MessageType.OVERCOME_BARRIER]: '越过障碍通知',
  [MessageType.END]: '任务结束',
  [MessageType.REQUEST_ERROR]: '请求失败',
};
