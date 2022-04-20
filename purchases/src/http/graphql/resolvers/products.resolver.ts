import { UseGuards } from '@nestjs/common/decorators';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductsService } from '../../../services/products';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreateProducts } from '../inputs/create-products';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productService: ProductsService) {}

  @Query(() => [Product])
  async products() {
    return this.productService.listAll();
  }

  @UseGuards(AuthorizationGuard)
  @Mutation(() => Product)
  async createProduct(@Args('data') data: CreateProducts) {
    return this.productService.createProduct(data);
  }
}
