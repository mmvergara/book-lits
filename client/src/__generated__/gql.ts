/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation UpdateBook($data: UpdateBookInput!) {\n    updateBook(data: $data) {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }": types.UpdateBookDocument,
    "\n  query GetBooks {\n    books {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n": types.GetBooksDocument,
    "\n  mutation CreateBook($name: String!, $authorId: UUID!, $publisherId: UUID!) {\n    createBook(\n      data: { name: $name, authorId: $authorId, publisherId: $publisherId }\n    ) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n": types.CreateBookDocument,
    "\n  query GetListOfPublishers {\n    publishers {\n      id\n      name\n      owner {\n        id\n        name\n      }\n    }\n  }\n": types.GetListOfPublishersDocument,
    "\n  query GetBook($bookid: UUID!) {\n    book(id: $bookid) {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n": types.GetBookDocument,
    "\n  mutation CreatePublisher($data: CreatePublisherInput!) {\n    createPublisher(data: $data) {\n      id\n      name\n    }\n  }\n": types.CreatePublisherDocument,
    "\n  query GetPublishers {\n    publishers {\n      id\n      name\n      createdAt\n    }\n  }\n": types.GetPublishersDocument,
    "\n  query GetPublisher($publisherid: UUID!) {\n    publisher(id: $publisherid) {\n      id\n      name\n      createdAt\n      books {\n        id\n        name\n        author {\n          name\n        }\n      }\n    }\n  }\n": types.GetPublisherDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateBook($data: UpdateBookInput!) {\n    updateBook(data: $data) {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }"): (typeof documents)["\n  mutation UpdateBook($data: UpdateBookInput!) {\n    updateBook(data: $data) {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBooks {\n    books {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBooks {\n    books {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateBook($name: String!, $authorId: UUID!, $publisherId: UUID!) {\n    createBook(\n      data: { name: $name, authorId: $authorId, publisherId: $publisherId }\n    ) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateBook($name: String!, $authorId: UUID!, $publisherId: UUID!) {\n    createBook(\n      data: { name: $name, authorId: $authorId, publisherId: $publisherId }\n    ) {\n      id\n      name\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetListOfPublishers {\n    publishers {\n      id\n      name\n      owner {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetListOfPublishers {\n    publishers {\n      id\n      name\n      owner {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetBook($bookid: UUID!) {\n    book(id: $bookid) {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetBook($bookid: UUID!) {\n    book(id: $bookid) {\n      id\n      name\n      createdAt\n      author {\n        id\n        name\n      }\n      publisher {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreatePublisher($data: CreatePublisherInput!) {\n    createPublisher(data: $data) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  mutation CreatePublisher($data: CreatePublisherInput!) {\n    createPublisher(data: $data) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPublishers {\n    publishers {\n      id\n      name\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  query GetPublishers {\n    publishers {\n      id\n      name\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPublisher($publisherid: UUID!) {\n    publisher(id: $publisherid) {\n      id\n      name\n      createdAt\n      books {\n        id\n        name\n        author {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetPublisher($publisherid: UUID!) {\n    publisher(id: $publisherid) {\n      id\n      name\n      createdAt\n      books {\n        id\n        name\n        author {\n          name\n        }\n      }\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;