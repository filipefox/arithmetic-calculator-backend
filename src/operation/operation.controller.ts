import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OperationRequest } from './operation.request.dto';
import { OperationService } from './operation.service';
import { OperationResponse } from './operation.response.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller({ path: 'operations', version: '1' })
@UseGuards(AuthGuard)
export class OperationController {
  constructor(private operationService: OperationService) {}

  @Post()
  async operation(@Body() operationRequest: OperationRequest) {
    const result = await this.operationService.operation(operationRequest);
    return new OperationResponse(result.toString());
  }
}
