import axios, { Axios, AxiosAdapter, AxiosInstance, AxiosResponse } from "axios";

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
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:3000/",
      withCredentials: true,
    });
  }

  private async onResponse({ request, options, response }: any) {
    console.log(response);
  }

  public getArticles = () => this.api.get<ArticleEntity[]>("/articles");
  public getArticle = (id: string) => this.api.get<ArticleEntity>(`/articles/${id}`);

  public createArticle = (article: ArticleOption) => this.api.post<ArticleEntity>("/articles", article);

  public updateArticle = (id: string, article: ArticleOption) => this.api.put<ArticleEntity>(`/articles/${id}`, article);

  public deleteArticle = (id: string) => this.api.delete(`/articles/${id}`);
}

export default new ApiHandler();
