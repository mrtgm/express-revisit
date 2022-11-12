import type { NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '~/features/admin/layout/layout';

const Article: NextPageWithLayout = () => {
  const router = useRouter();
  const api = useApi();

  const { id } = router.query;

  const { data, isLoading, error } = useQuery([`post: ${id}`], () => api.getArticle(id as string));

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.author}</p>
      <p>{data.content}</p>
    </div>
  );
};

Article.getLayout = (page) => <Layout>{page}</Layout>;

export default Article;
