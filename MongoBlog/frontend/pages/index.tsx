import Head from 'next/head';
import Image from 'next/image';
import api from '~/lib/api';

import { useApi } from '~/context/api';
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  const api = useApi();

  const { data, isLoading, error } = useQuery([`posts${api.accessToken}`], api.getArticles);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      {data && (
        <div>
          {data.map((post: any) => (
            <div key={post._id}>
              <h1>{post.title}</h1>
              <p>{post.author}</p>
              <p>{post.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
