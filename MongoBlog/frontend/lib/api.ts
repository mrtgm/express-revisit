import axios, { Axios, AxiosAdapter, AxiosInstance, AxiosResponse } from 'axios';
import { formatDateAdaptor } from './util';

export type ApiHandlerOption = {
  accessToken?: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: {
    page: number;
    totalPages: number;
  };
};

export type AuthorEntity = {
  _id: string;
  name: string;
  description: string;
  links: string[];
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type CategoryEntity = {
  _id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type ArticleEntity = {
  _id: string;
  title: string;
  content: string;
  author: AuthorEntity;
  categories: CategoryEntity[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateArticleOption = {
  title: string;
  content: string;
  author: string;
  published: boolean;
};

export type GetArticleOption = {
  page: number;
  limit: number;
  author?: string;
  category?: string;
  published?: boolean;
};

export default class ApiHandler {
  private api: AxiosInstance;

  public accessToken: string;

  constructor({ accessToken }: ApiHandlerOption) {
    this.accessToken = accessToken as string;

    this.api = axios.create({
      baseURL: 'http://localhost:8080/',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  public getArticles = (option: GetArticleOption) =>
    this.api
      .get<PaginatedResponse<ArticleEntity>>('/articles', {
        params: option,
        transformResponse: [formatDateAdaptor],
      })
      .then((res) => res.data);

  public getArticle = (id: string) =>
    this.api
      .get<ArticleEntity>(`/articles/${id}`, {
        transformResponse: [formatDateAdaptor],
      })
      .then((res) => res.data);

  public createArticle = (article: CreateArticleOption) =>
    this.api.post<ArticleEntity>('/articles', article).then((res) => res.data);

  public updateArticle = (id: string, article: CreateArticleOption) =>
    this.api.put<ArticleEntity>(`/articles/${id}`, article).then((res) => res.data);

  public deleteArticle = (id: string) => this.api.delete(`/articles/${id}`).then((res) => res.data);

  public getAuthors = () => this.api.get<AuthorEntity[]>('/authors').then((res) => res.data);

  public getAuthor = (id: string) => this.api.get<AuthorEntity>(`/authors/${id}`).then((res) => res.data);

  public createAuthor = (author: AuthorEntity) =>
    this.api.post<AuthorEntity>('/authors', author).then((res) => res.data);

  public updateAuthor = (id: string, author: AuthorEntity) =>
    this.api.put<AuthorEntity>(`/authors/${id}`, author).then((res) => res.data);

  public deleteAuthor = (id: string) => this.api.delete(`/authors/${id}`).then((res) => res.data);

  public getCategories = () => this.api.get<CategoryEntity[]>('/categories').then((res) => res.data);

  public getCategory = (id: string) => this.api.get<CategoryEntity>(`/categories/${id}`).then((res) => res.data);

  public createCategory = (category: CategoryEntity) =>
    this.api.post<CategoryEntity>('/categories', category).then((res) => res.data);

  public updateCategory = (id: string, category: CategoryEntity) =>
    this.api.put<CategoryEntity>(`/categories/${id}`, category).then((res) => res.data);

  public deleteCategory = (id: string) => this.api.delete(`/categories/${id}`).then((res) => res.data);

  public getComments = (articleId: string) => this.api.get(`/articles/${articleId}/comments`).then((res) => res.data);

  public createComment = (articleId: string, comment: string) =>
    this.api.post(`/articles/${articleId}/comments`, { comment }).then((res) => res.data);

  public deleteComment = (articleId: string, commentId: string) =>
    this.api.delete(`/articles/${articleId}/comments/${commentId}`).then((res) => res.data);
}
