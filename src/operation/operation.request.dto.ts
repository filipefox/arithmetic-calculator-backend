export class OperationRequest {
  number1?: number;
  number2?: number;
  operationId: number;

  constructor(number1: number, number2: number, operationId: number) {
    this.number1 = number1;
    this.number2 = number2;
    this.operationId = operationId;
  }
}
