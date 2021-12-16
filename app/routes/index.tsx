import consola from 'consola';
import { LoaderFunction, MetaFunction, useTransition } from 'remix';
import { json, useLoaderData } from 'remix';

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = () => {
  const data: IndexData = {
    resources: [
      {
        name: 'Remix Docs',
        url: 'https://remix.run/docs',
      },
      {
        name: 'React Router Docs',
        url: 'https://reactrouter.com/docs',
      },
      {
        name: 'Remix Discord',
        url: 'https://discord.gg/VBePs6d',
      },
    ],
    demos: [
      {
        to: 'demos/actions',
        name: 'Actions',
      },
      {
        to: 'demos/about',
        name: 'Nested Routes, CSS loading/unloading',
      },
      {
        to: 'demos/params',
        name: 'URL Params and Error Boundaries',
      },
    ],
  };

  // https://remix.run/api/remix#json
  return json(data);
};

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: 'Remix Starter',
    description: 'Welcome to remix!',
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  const data = useLoaderData<IndexData>();
  const transition = useTransition();

  consola.info({ data });

  return (
    <main>
      <h1 className='text-3xl text-center mb-3'>English words I learned</h1>
      <div className='text-center mb-2'>Route State: {transition.state}</div>
      <div className='grid grid-cols-1 md:grid-cols-2 '>
        <div className='flex flex-col items-center'>
          <h2 className='text-2xl pb-2'>Words</h2>
        </div>
      </div>
    </main>
  );
}
