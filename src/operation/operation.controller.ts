import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  OperationRequest,
  SquareRootOperationRequest,
} from './operation.request.dto';
import { OperationService } from './operation.service';
import { OperationResponse } from './operation.response.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('operations')
@UseGuards(AuthGuard)
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
