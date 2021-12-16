/**
 *  @author: Razvan Rauta
 *  Date: Dec 17 2021
 *  Time: 00:30
 */

import ReactMarkdown from 'react-markdown';
import type { Params } from 'react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { LoaderFunction } from 'remix';
import { json, useLoaderData } from 'remix';

import api from '~/lib/graphql-request';
import { parsePost } from '~/lib/parser';

import type { PostEntity } from '~/generated';
import { PublicationState } from '~/generated';

import type { DataFunctionArgs } from '@remix-run/server-runtime';

interface SlugArgs extends DataFunctionArgs {
  params: Params<'slug'>;
}

export const loader: LoaderFunction = async ({ params }: SlugArgs) => {
  const { posts } = await api.PostBySlug({
    slug: params.slug || '',
    state: PublicationState.Live,
  });

  return json(posts?.data[0]);
};

export default function Post() {
  const data = useLoaderData<PostEntity>();

  const post = parsePost(data);

  return (
    <article className='prose md:prose-xl dark:md:prose-xl-dark dark:prose-dark'>
      <h1>{post.title}</h1>
      <ReactMarkdown
        components={{
          code({ node, inline, className, children, ref, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const _notUsed = { node, ref };
            return !inline && match ? (
              <SyntaxHighlighter
                style={theme}
                language={match[1]}
                PreTag='div'
                {...props}
              >
                {String(children).replace(/\n$/, '') || ''}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {post?.content || ''}
      </ReactMarkdown>
    </article>
  );
}
