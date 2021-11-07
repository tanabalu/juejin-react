import { GO, BACK, FIND } from '../enum';

export default {
  // === 前进
  go: {
    // 横扫千军（左右横扫）
    [GO.CROSS]: {
      command: [
        {
          times: 10,
          command: [
            {
              times: 10,
              command: [
                {
                  times: 10,
                  command: [
                    {
                      times: 10,
                      command: [
                        {
                          times: 10,
                          command: [
                            { times: 5, command: ['L'] },
                            '4',
                            { times: 5, command: ['L'] },
                            'D',
                            { times: 5, command: ['R'] },
                            '6',
                            { times: 5, command: ['R'] },
                            'D',
                          ],
                        },
                        '2',
                      ],
                    },
                    'L',
                    '2',
                  ],
                },
                '4',
                'D',
              ],
            },
            'U',
            '4',
            'L',
            'D',
          ],
        },
      ],
    },
    // 百米冲刺
    // 千米冲刺
    // 万米冲刺
  },

  // === 回巢
  back: {},
  // 横扫回巢
  // 冲刺回巢

  // === 探路
  find: {},
  // 探路方案一
  // 探路方案二
  // 探路方案三
  // 探路方案四
  // 探路方案五
};
