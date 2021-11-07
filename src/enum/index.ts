export enum GO {
  // 横扫千军（左右横扫）
  CROSS,
  // 百米冲刺
  HUNDRED,
  // 千米冲刺
  THOUSAND,
  // 万米冲刺
  TEN_THOUSAND
}

export enum BACK {
  // 横扫回巢
  CROSS,
  // 冲刺回巢
  SPRINT
}

export enum FIND {
  // 探路方案一
  FIRST,
  // 探路方案二
  SECOND,
  // 探路方案三
  THIRD,
  // 探路方案四
  FOURTH,
  // 探路方案五
  FIFTH
}

export enum MessageType {
  // 任务执行通知
  EXECUTE,
  // 遇到障碍通知
  ENCOUNTER_BARRIER,
  // 越过障碍通知
  OVERCOME_BARRIER,
  // 任务结束
  END,
  // 请求错误
  REQUEST_ERROR,
}

export enum TaskStatus {
  INIT,
  RUNNING,
  STOPPING,
}

