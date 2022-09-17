import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['Float'];
  comment: Scalars['String'];
  PostId: Scalars['Float'];
  Comments?: Maybe<Array<Maybe<Comment>>>;
  User?: Maybe<User>;
  CommentId?: Maybe<Scalars['Float']>;
  UserId: Scalars['Float'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  post?: Maybe<Post>;
  Comments?: Maybe<Array<Comment>>;
  message?: Maybe<Scalars['String']>;
};


export type LoginResponse = {
  __typename?: 'LoginResponse';
  message?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  token?: Maybe<Scalars['String']>;
  status: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  signup: SignupResponse;
  createRole: RoleResponse;
  deleteRole: RoleResponse;
  createPost: PostResponse;
  editPost: PostResponse;
  deletePost: PostResponse;
  createComment: CommentResponse;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationSignupArgs = {
  userBody: SignupBody;
};


export type MutationCreateRoleArgs = {
  name: Scalars['String'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  createPostBody: CreatePostBody;
};


export type MutationEditPostArgs = {
  editPostBody: CreatePostBody;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationCreateCommentArgs = {
  createCommentBody: CreateCommentBody;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  description: Scalars['String'];
  UserId: Scalars['Float'];
  User?: Maybe<User>;
  Comments?: Maybe<Array<Maybe<Comment>>>;
  createdAt: Scalars['DateTime'];
  PostMedia?: Maybe<Array<Maybe<PostMedia>>>;
};

export type PostMedia = {
  __typename?: 'PostMedia';
  id: Scalars['Float'];
  mediaUrl: Scalars['String'];
  PostId: Scalars['Float'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  post?: Maybe<Post>;
  posts?: Maybe<Array<Post>>;
  message?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Float']>;
};

export type PostsResponse = {
  __typename?: 'PostsResponse';
  posts: Array<Post>;
  count: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getLoggedInUser: User;
  getPosts: PostsResponse;
  getComments: CommentResponse;
};


export type QueryGetPostsArgs = {
  page: Scalars['Float'];
  limit: Scalars['Float'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type RoleResponse = {
  __typename?: 'RoleResponse';
  role?: Maybe<Role>;
  message?: Maybe<Scalars['String']>;
};

export type SignupResponse = {
  __typename?: 'SignupResponse';
  message?: Maybe<Scalars['String']>;
  status: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  date_of_birth?: Maybe<Scalars['DateTime']>;
  profileImageUrl?: Maybe<Scalars['String']>;
  RoleId?: Maybe<Scalars['Float']>;
  role?: Maybe<Role>;
};

export type CreateCommentBody = {
  comment: Scalars['String'];
  rootId?: Maybe<Scalars['Float']>;
  postId: Scalars['Float'];
};

export type CreatePostBody = {
  description: Scalars['String'];
};

export type SignupBody = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  date_of_birth: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', token?: Maybe<string>, message?: Maybe<string>, status: number, user?: Maybe<{ __typename?: 'User', email: string, firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, date_of_birth?: Maybe<any> }> } };

export type GetLoggedInUSerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedInUSerQuery = { __typename?: 'Query', getLoggedInUser: { __typename?: 'User', email: string, firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, date_of_birth?: Maybe<any> } };

export type CreatePostMutationVariables = Exact<{
  description: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', post?: Maybe<{ __typename?: 'Post', id: number, UserId: number, description: string, createdAt: any, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }> }> } };

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars['Float'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'PostResponse', message?: Maybe<string> } };

export type EditPostMutationVariables = Exact<{
  editPostEditPostBody: CreatePostBody;
  editPostId: Scalars['Float'];
}>;


export type EditPostMutation = { __typename?: 'Mutation', editPost: { __typename?: 'PostResponse', post?: Maybe<{ __typename?: 'Post', description: string, id: number, UserId: number, createdAt: any, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, PostMedia?: Maybe<Array<Maybe<{ __typename?: 'PostMedia', mediaUrl: string, id: number, PostId: number }>>>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, CommentId?: Maybe<number>, comment: string, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, comment: string, CommentId?: Maybe<number>, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, comment: string, CommentId?: Maybe<number>, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }> }>>> }>>> }>>> }> } };

export type CreateCommentMutationVariables = Exact<{
  createCommentCreateCommentBody: CreateCommentBody;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'CommentResponse', post?: Maybe<{ __typename?: 'Post', description: string, id: number, UserId: number, createdAt: any, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, PostMedia?: Maybe<Array<Maybe<{ __typename?: 'PostMedia', mediaUrl: string, id: number, PostId: number }>>>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, CommentId?: Maybe<number>, comment: string, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, comment: string, CommentId?: Maybe<number>, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, comment: string, CommentId?: Maybe<number>, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }> }>>> }>>> }>>> }> } };

export type SignupMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  date_of_birth: Scalars['String'];
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'SignupResponse', message?: Maybe<string>, status: number } };

export type PostQueryVariables = Exact<{
  page: Scalars['Float'];
  limit: Scalars['Float'];
}>;


export type PostQuery = { __typename?: 'Query', getPosts: { __typename?: 'PostsResponse', count: number, posts: Array<{ __typename?: 'Post', description: string, id: number, UserId: number, createdAt: any, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, PostMedia?: Maybe<Array<Maybe<{ __typename?: 'PostMedia', mediaUrl: string, id: number, PostId: number }>>>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, CommentId?: Maybe<number>, comment: string, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, comment: string, CommentId?: Maybe<number>, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }>, Comments?: Maybe<Array<Maybe<{ __typename?: 'Comment', id: number, comment: string, CommentId?: Maybe<number>, PostId: number, UserId: number, User?: Maybe<{ __typename?: 'User', firstName: string, lastName: string, profileImageUrl?: Maybe<string>, RoleId?: Maybe<number>, id: number, email: string }> }>>> }>>> }>>> }> } };


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      email
      firstName
      lastName
      profileImageUrl
      RoleId
      id
      date_of_birth
    }
    token
    message
    status
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetLoggedInUSerDocument = gql`
    query getLoggedInUSer {
  getLoggedInUser {
    email
    firstName
    lastName
    profileImageUrl
    RoleId
    id
    date_of_birth
  }
}
    `;

/**
 * __useGetLoggedInUSerQuery__
 *
 * To run a query within a React component, call `useGetLoggedInUSerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedInUSerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedInUSerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedInUSerQuery(baseOptions?: Apollo.QueryHookOptions<GetLoggedInUSerQuery, GetLoggedInUSerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoggedInUSerQuery, GetLoggedInUSerQueryVariables>(GetLoggedInUSerDocument, options);
      }
export function useGetLoggedInUSerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoggedInUSerQuery, GetLoggedInUSerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoggedInUSerQuery, GetLoggedInUSerQueryVariables>(GetLoggedInUSerDocument, options);
        }
export type GetLoggedInUSerQueryHookResult = ReturnType<typeof useGetLoggedInUSerQuery>;
export type GetLoggedInUSerLazyQueryHookResult = ReturnType<typeof useGetLoggedInUSerLazyQuery>;
export type GetLoggedInUSerQueryResult = Apollo.QueryResult<GetLoggedInUSerQuery, GetLoggedInUSerQueryVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($description: String!) {
  createPost(createPostBody: {description: $description}) {
    post {
      id
      UserId
      User {
        firstName
        lastName
        profileImageUrl
        RoleId
        id
        email
      }
      description
      createdAt
    }
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      description: // value for 'description'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($deletePostId: Float!) {
  deletePost(id: $deletePostId) {
    message
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      deletePostId: // value for 'deletePostId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
    mutation EditPost($editPostEditPostBody: createPostBody!, $editPostId: Float!) {
  editPost(editPostBody: $editPostEditPostBody, id: $editPostId) {
    post {
      description
      id
      UserId
      User {
        firstName
        lastName
        profileImageUrl
        RoleId
        id
        email
      }
      PostMedia {
        mediaUrl
        id
        PostId
      }
      Comments {
        id
        CommentId
        comment
        PostId
        UserId
        User {
          firstName
          lastName
          profileImageUrl
          RoleId
          id
          email
        }
        Comments {
          id
          comment
          CommentId
          PostId
          UserId
          User {
            firstName
            lastName
            profileImageUrl
            RoleId
            id
            email
          }
          Comments {
            id
            comment
            CommentId
            PostId
            UserId
            User {
              firstName
              lastName
              profileImageUrl
              RoleId
              id
              email
            }
          }
        }
      }
      createdAt
    }
  }
}
    `;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      editPostEditPostBody: // value for 'editPostEditPostBody'
 *      editPostId: // value for 'editPostId'
 *   },
 * });
 */
export function useEditPostMutation(baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
      }
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($createCommentCreateCommentBody: createCommentBody!) {
  createComment(createCommentBody: $createCommentCreateCommentBody) {
    post {
      description
      id
      UserId
      User {
        firstName
        lastName
        profileImageUrl
        RoleId
        id
        email
      }
      PostMedia {
        mediaUrl
        id
        PostId
      }
      Comments {
        id
        CommentId
        comment
        PostId
        UserId
        User {
          firstName
          lastName
          profileImageUrl
          RoleId
          id
          email
        }
        Comments {
          id
          comment
          CommentId
          PostId
          UserId
          User {
            firstName
            lastName
            profileImageUrl
            RoleId
            id
            email
          }
          Comments {
            id
            comment
            CommentId
            PostId
            UserId
            User {
              firstName
              lastName
              profileImageUrl
              RoleId
              id
              email
            }
          }
        }
      }
      createdAt
    }
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentCreateCommentBody: // value for 'createCommentCreateCommentBody'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($email: String!, $password: String!, $firstName: String!, $lastName: String!, $date_of_birth: String!) {
  signup(
    userBody: {email: $email, password: $password, firstName: $firstName, lastName: $lastName, date_of_birth: $date_of_birth}
  ) {
    message
    status
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      date_of_birth: // value for 'date_of_birth'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const PostDocument = gql`
    query Post($page: Float!, $limit: Float!) {
  getPosts(page: $page, limit: $limit) {
    posts {
      description
      id
      User {
        firstName
        lastName
        profileImageUrl
        RoleId
        id
        email
      }
      UserId
      PostMedia {
        mediaUrl
        id
        PostId
      }
      Comments {
        id
        CommentId
        comment
        PostId
        UserId
        User {
          firstName
          lastName
          profileImageUrl
          RoleId
          id
          email
        }
        Comments {
          id
          comment
          CommentId
          PostId
          UserId
          User {
            firstName
            lastName
            profileImageUrl
            RoleId
            id
            email
          }
          Comments {
            id
            comment
            CommentId
            PostId
            UserId
            User {
              firstName
              lastName
              profileImageUrl
              RoleId
              id
              email
            }
          }
        }
      }
      createdAt
    }
    count
  }
}
    `;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function usePostQuery(baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
      }
export function usePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(PostDocument, options);
        }
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;