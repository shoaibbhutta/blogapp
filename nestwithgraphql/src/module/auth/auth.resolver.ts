import { Mutation, Resolver, Query, Args } from '@nestjs/graphql';

// import { LocalAuthGuard } from 'src/core/guards/local-auth.guard';UseGuards
import { AuthService } from './auth.service';
// import { UserRegisterDto } from './dto/UserRegisterDto';

import { LoginInputType, SignupInputType } from './input/input';
import { UserLoginOutput, UserSignupOutput } from './dto/outputDto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation(() => UserLoginOutput)
  async login(@Args('body') body: LoginInputType) {
    return this.authService.login(body);
  }

  // local register
  @Mutation(() => UserSignupOutput)
  async register(
    @Args('signupBody') signupBody: SignupInputType,
  ): Promise<UserSignupOutput> {
    return this.authService.register(signupBody);
  }
}
