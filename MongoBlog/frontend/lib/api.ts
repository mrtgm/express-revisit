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

export type ArticleEntity = {
  _id: string;
  title: string;
  content: string;
  author: string;
  published: boolean;
  createdAt: string;
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
        params: {
          page: option.page,
          limit: option.limit,
        },
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
}
