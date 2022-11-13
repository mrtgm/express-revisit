import { useRouter } from 'next/router';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '~/features/admin/layout/layout';
import { EditArticleForm } from '~/features/admin/components/edit_article_form';
import { NextPageWithLayout } from '~/pages/_app';

const Article: NextPageWithLayout = () => {
  const router = useRouter();

  const { id } = router.query;

  return <EditArticleForm articleId={id as string} />;
};

Article.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Article;
