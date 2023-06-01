import { OperationType } from './operation.entity';

export class OperationResponse {
  constructor(result: string) {
    this.result = result;
  }

  result: string;
}
