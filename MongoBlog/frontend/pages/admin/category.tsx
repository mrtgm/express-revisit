import { useState } from 'react';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { ArticleList } from '~/features/admin/components/article_list';
import { CreateArticleForm } from '~/features/admin/components/create_article_form';
import { Layout } from '~/features/admin/layout/layout';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';

const Category: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);

  const api = useApi();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['posts', api.accessToken, page],
    queryFn: () => api.getArticles({ page, limit: 5 }),
    keepPreviousData: true,
  });

  const handleClickPagination = (page: number) => {
    setPage(page);
    router.push(`/admin/?page=${page}`);
  };

  return (
    <>
      <ArticleList articles={data} page={page} onClickPagination={handleClickPagination} />
      <CreateArticleForm />
    </>
  );
};

Category.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Category;
