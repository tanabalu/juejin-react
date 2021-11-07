import API from './api';
import { post } from './http';
import { PostCommandParams } from '../types';

export function postCommand(params: PostCommandParams) {
  return post(
    `${API.COMMAND}?uid=${params.uid}&time=${new Date().valueOf()}`,
    {
      command: params.command,
    },
    {
      authorization: params.authorization,
      'x-tt-gameid': params.gameId,
    }
  );
}
