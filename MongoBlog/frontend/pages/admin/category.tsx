import { useState } from 'react';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { ArticleList } from '~/features/admin/components/article_list';
import { CreateArticleForm } from '~/features/admin/components/create_article_form';
import { Layout } from '~/features/admin/layout/layout';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';

const Category: NextPageWithLayout = () => {
  const api = useApi();
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ['posts', api.accessToken],
    queryFn: () => api.getCategories(),
  });

  return (
    <>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

Category.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Category;
