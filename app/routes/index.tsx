import type { LoaderFunction, MetaFunction } from 'remix';
import { Link, useTransition } from 'remix';
import { json, useLoaderData } from 'remix';

import api from '~/lib/graphql-request';
import { parsePosts } from '~/lib/parser';

import type { PostEntityResponseCollection } from '~/generated';

export const loader: LoaderFunction = async () => {
  const { posts } = await api.PostsPaginated({ limit: 10, start: 0 });

  return json(posts);
};

export const meta: MetaFunction = () => {
  return {
    title: 'Remix Tailwind',
    description: 'Welcome to remix!',
  };
};

export default function Index() {
  const { data } = useLoaderData<PostEntityResponseCollection>();
  const transition = useTransition();
  const posts = parsePosts(data);

  return (
    <main>
      <h1 className='text-3xl text-center mb-3'>English words I learned</h1>
      <div className='text-center mb-2'>Route State: {transition.state}</div>
      <div className='flex flex-col items-center'>
        {posts &&
          posts.map((post) => (
            <div key={post.slug}>
              <Link to={`/post/${post.slug}`}>
                <h2>{post.title}</h2>
              </Link>

              <img
                className='max-w-lg'
                src={post.cover?.medium?.url || ''}
                alt={post.title || ''}
              />
              <p>{post.excerpt}</p>
            </div>
          ))}
      </div>
    </main>
  );
}
