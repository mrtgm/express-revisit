import { useRouter } from 'next/router';
import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';
import { Layout } from '~/features/admin/layout/layout';
import { EditAuthorForm } from '~/features/admin/components/edit_author_form';
import { NextPageWithLayout } from '~/pages/_app';

const Authors: NextPageWithLayout = () => {
  const router = useRouter();

  const { id } = router.query;

  return <EditAuthorForm authorId={id as string} />;
};

Authors.getLayout = (page: any) => <Layout>{page}</Layout>;

export default Authors;
