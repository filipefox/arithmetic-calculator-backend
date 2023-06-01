import { Body, Controller, Post } from '@nestjs/common';
import {
  OperationRequest,
  SquareRootOperationRequest,
} from './operation.request.dto';
import { OperationService } from './operation.service';
import { OperationResponse } from './operation.response.dto';

@Controller('operations')
export class OperationController {
  constructor(private operationService: OperationService) {}

  @Post()
  async operation(@Body() operationRequest: OperationRequest) {
    const result = await this.operationService.operation(operationRequest);
    return new OperationResponse(result.toString());
  }

  @Post('/squareRoot')
  async squareRoot(
    @Body() squareRootOperationRequest: SquareRootOperationRequest,
  ) {
    const result = await this.operationService.squareRoot(
      squareRootOperationRequest,
    );
    return new OperationResponse(result.toString());
  }

  @Post('/randomString')
  async randomString() {
    const result = await this.operationService.randomString();
    return new OperationResponse(result);
  }
}
