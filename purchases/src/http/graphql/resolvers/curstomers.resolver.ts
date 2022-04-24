import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, ResolveReference } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { CustomersService } from '../../../services/customers';
import { PurchasesService } from '../../../services/purchases';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { AuthUser, CurrentUser } from '../../auth/current-user';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(
    private customerService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  async me(@CurrentUser() { req }: AuthUser) {
    const { user } = req;
    return this.customerService.getCustomerByAuthUserId(user.sub);
  }

  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }

  @ResolveReference()
  resolveReference(reference: { authUserId: string }) {
    return this.customerService.getCustomerByAuthUserId(reference.authUserId);
  }
}
