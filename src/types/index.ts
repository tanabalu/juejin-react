export interface PostCommandParams {
  uid: string;
  authorization: string;
  gameId: string;
  command: Command[];
}

export type CommandType = '2' | '4' | '6' | '8' | 'U' | 'D' | 'L' | 'R';

export interface Command {
  times: number;
  command: (CommandType | Command)[];
}
