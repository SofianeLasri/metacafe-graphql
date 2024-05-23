import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CenterOfInterest = {
  __typename?: 'CenterOfInterest';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  body: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  post: Post;
  user: User;
};

export type CurrentUserLikedPostResponse = {
  __typename?: 'CurrentUserLikedPostResponse';
  currentUserlikedPost: Scalars['Boolean']['output'];
};

export type LikeResponse = {
  __typename?: 'LikeResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type LikesCountResponse = {
  __typename?: 'LikesCountResponse';
  count: Scalars['Int']['output'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  code: Scalars['Int']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  commentPost: Comment;
  createCenterOfInterest: CenterOfInterest;
  createPost: Post;
  createUser: LoginResponse;
  likePost: LikeResponse;
  login: LoginResponse;
  setCentersOfInterest: Array<UserInterest>;
};


export type MutationCommentPostArgs = {
  body: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
};


export type MutationCreateCenterOfInterestArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationSetCentersOfInterestArgs = {
  centerOfInterestIds: Array<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  content: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  centerOfInterest: CenterOfInterest;
  centersOfInterest: Array<CenterOfInterest>;
  centersOfInterestOfUser: Array<CenterOfInterest>;
  currentUserLikedPost: CurrentUserLikedPostResponse;
  post: Post;
  postComments: Array<Comment>;
  postLikesCount: LikesCountResponse;
  posts: Array<Post>;
  user: User;
  userPosts: Array<Post>;
  users: Array<User>;
};


export type QueryCenterOfInterestArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCentersOfInterestArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCentersOfInterestOfUserArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryCurrentUserLikedPostArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryPostArgs = {
  id: Scalars['Int']['input'];
};


export type QueryPostCommentsArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryPostLikesCountArgs = {
  postId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};


export type QueryUserPostsArgs = {
  userId: Scalars['Int']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type UserInterest = {
  __typename?: 'UserInterest';
  centerOfInterest: CenterOfInterest;
  id: Scalars['Int']['output'];
  user: User;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CenterOfInterest: ResolverTypeWrapper<CenterOfInterest>;
  Comment: ResolverTypeWrapper<Comment>;
  CurrentUserLikedPostResponse: ResolverTypeWrapper<CurrentUserLikedPostResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LikeResponse: ResolverTypeWrapper<LikeResponse>;
  LikesCountResponse: ResolverTypeWrapper<LikesCountResponse>;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserInterest: ResolverTypeWrapper<UserInterest>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  CenterOfInterest: CenterOfInterest;
  Comment: Comment;
  CurrentUserLikedPostResponse: CurrentUserLikedPostResponse;
  Int: Scalars['Int']['output'];
  LikeResponse: LikeResponse;
  LikesCountResponse: LikesCountResponse;
  LoginResponse: LoginResponse;
  Mutation: {};
  Post: Post;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserInterest: UserInterest;
};

export type CenterOfInterestResolvers<ContextType = any, ParentType extends ResolversParentTypes['CenterOfInterest'] = ResolversParentTypes['CenterOfInterest']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrentUserLikedPostResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrentUserLikedPostResponse'] = ResolversParentTypes['CurrentUserLikedPostResponse']> = {
  currentUserlikedPost?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikeResponse'] = ResolversParentTypes['LikeResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikesCountResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LikesCountResponse'] = ResolversParentTypes['LikesCountResponse']> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  code?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  commentPost?: Resolver<ResolversTypes['Comment'], ParentType, ContextType, RequireFields<MutationCommentPostArgs, 'body' | 'postId'>>;
  createCenterOfInterest?: Resolver<ResolversTypes['CenterOfInterest'], ParentType, ContextType, RequireFields<MutationCreateCenterOfInterestArgs, 'name'>>;
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'content' | 'title'>>;
  createUser?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'email' | 'password' | 'username'>>;
  likePost?: Resolver<ResolversTypes['LikeResponse'], ParentType, ContextType, RequireFields<MutationLikePostArgs, 'postId'>>;
  login?: Resolver<ResolversTypes['LoginResponse'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>;
  setCentersOfInterest?: Resolver<Array<ResolversTypes['UserInterest']>, ParentType, ContextType, RequireFields<MutationSetCentersOfInterestArgs, 'centerOfInterestIds' | 'userId'>>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  centerOfInterest?: Resolver<ResolversTypes['CenterOfInterest'], ParentType, ContextType, RequireFields<QueryCenterOfInterestArgs, 'id'>>;
  centersOfInterest?: Resolver<Array<ResolversTypes['CenterOfInterest']>, ParentType, ContextType, Partial<QueryCentersOfInterestArgs>>;
  centersOfInterestOfUser?: Resolver<Array<ResolversTypes['CenterOfInterest']>, ParentType, ContextType, RequireFields<QueryCentersOfInterestOfUserArgs, 'userId'>>;
  currentUserLikedPost?: Resolver<ResolversTypes['CurrentUserLikedPostResponse'], ParentType, ContextType, RequireFields<QueryCurrentUserLikedPostArgs, 'postId'>>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<QueryPostArgs, 'id'>>;
  postComments?: Resolver<Array<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<QueryPostCommentsArgs, 'postId'>>;
  postLikesCount?: Resolver<ResolversTypes['LikesCountResponse'], ParentType, ContextType, RequireFields<QueryPostLikesCountArgs, 'postId'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userPosts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryUserPostsArgs, 'userId'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterestResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterest'] = ResolversParentTypes['UserInterest']> = {
  centerOfInterest?: Resolver<ResolversTypes['CenterOfInterest'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  CenterOfInterest?: CenterOfInterestResolvers<ContextType>;
  Comment?: CommentResolvers<ContextType>;
  CurrentUserLikedPostResponse?: CurrentUserLikedPostResponseResolvers<ContextType>;
  LikeResponse?: LikeResponseResolvers<ContextType>;
  LikesCountResponse?: LikesCountResponseResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserInterest?: UserInterestResolvers<ContextType>;
};

