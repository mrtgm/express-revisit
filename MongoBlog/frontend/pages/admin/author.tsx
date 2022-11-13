import { useState } from 'react';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { AuthorList } from '~/features/admin/components/author_list';
import { CreateArticleForm } from '~/features/admin/components/create_article_form';
import { Layout } from '~/features/admin/layout/layout';
import { useRouter } from 'next/router';
import { NextPageWithLayout } from '../_app';

const Author: NextPageWithLayout = () => {
  const [page, setPage] = useState(1);

  const api = useApi();

  const { data } = useQuery({
    queryKey: ['posts', api.accessToken, page],
    queryFn: () => api.getAuthors(),
  });

  return (
    <>
      <AuthorList authors={data} />
    </>
  );
};

Author.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Author;
