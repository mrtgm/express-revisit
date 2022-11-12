import axios, { Axios, AxiosAdapter, AxiosInstance, AxiosResponse } from 'axios';

type ApiHandlerOption = {
  accessToken?: string;
};

type ArticleEntity = {
  _id: string;
  title: string;
  content: string;
  author: string;
  published: boolean;
};

type ArticleOption = {
  title: string;
  content: string;
  author: string;
  published: boolean;
};

class ApiHandler {
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

  private async onResponse({ request, options, response }: any) {
    console.log(response);
  }

  public getArticles = () => this.api.get<ArticleEntity[]>('/articles').then((res) => res.data);

  public getArticle = (id: string) => this.api.get<ArticleEntity>(`/articles/${id}`).then((res) => res.data);

  public createArticle = (article: ArticleOption) =>
    this.api.post<ArticleEntity>('/articles', article).then((res) => res.data);

  public updateArticle = (id: string, article: ArticleOption) =>
    this.api.put<ArticleEntity>(`/articles/${id}`, article).then((res) => res.data);

  public deleteArticle = (id: string) => this.api.delete(`/articles/${id}`).then((res) => res.data);
}

export default ApiHandler;
