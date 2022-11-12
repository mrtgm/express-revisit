import type { NextPageWithLayout } from 'next';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { ArticleList } from '~/features/admin/components/article_list';
import { CreateArticleForm } from '~/features/admin/components/create_article_form';
import { Layout } from '~/features/admin/layout/layout';

const Admin: NextPageWithLayout = () => {
  const { isAuthenticated } = useAuth0();

  const [page, setPage] = useState(1);

  const api = useApi();
  const { data } = useQuery({
    queryKey: ['posts', api.accessToken, page],
    queryFn: () => api.getArticles({ page, limit: 5 }),
    keepPreviousData: true,
  });

  const onClickPagination = (page: number) => {
    setPage(page);
  };

  return (
    <>
      <ArticleList articles={data} page={page} onClickPagination={onClickPagination} />

      {isAuthenticated && <CreateArticleForm />}
    </>
  );
};

Admin.getLayout = (page) => <Layout>{page}</Layout>;

export default Admin;
