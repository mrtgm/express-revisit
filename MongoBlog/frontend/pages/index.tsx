import Head from "next/head";
import Image from "next/image";
import api from "~/lib/api";

import { useQuery } from "@tanstack/react-query";

const fetchArticles = async () => {
  const res = await fetch("http://localhost:3000/articles");
  return res.json();
};

export default function Home() {
  const { data, isLoading, error } = useQuery(["posts"], fetchArticles);

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
              <p>{post.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
