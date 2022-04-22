import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { DatabaseModule } from '../database/database.module';
import { CoursesService } from '../services/courses';
import { EnrollmentsService } from '../services/enrollments';
import { StudentsService } from '../services/students';
import { CoursesResolver } from './graphql/resolvers/courses';
import { EnrollmentsResolver } from './graphql/resolvers/enrollments';
import { StudentsResolver } from './graphql/resolvers/students';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    CoursesResolver,
    EnrollmentsResolver,
    StudentsResolver,
    CoursesService,
    EnrollmentsService,
    StudentsService,
  ],
})
export class HttpModule {}
