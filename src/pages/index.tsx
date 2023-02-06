import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { H1 } from '~/components/H1';

const IndexPage = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <section className="flex flex-col items-center justify-center w-screen h-screen gap-12 p-4 overflow-hidden text-gray-50">
      <div className="flex flex-col justify-center gap-4 text-center">
        <H1 className="md:max-w-[1280px] lg:max-w-[600px] xl:max-w-none mx-auto">
          Dungeons and Devs
        </H1>
        <h2 className="text-3xl leading-none tracking-normal md:text-5xl font-cartridge">
          Embark on a magical learning quest of HTML.
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            session ? router.push('/app') : signIn();
          }}
          className="p-2 px-4 text-xl leading-none transition transform border-4 rounded shadow-xl hover:scale-110 outline-4 outline outline-solid outline-white font-cartridge border-lime-700 bg-lime-600"
        >
          Get Started
        </button>
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen overflow-hidden bg-grass -z-10">
        {Array.from({ length: 500 }, (_, i) => (
          <>
            <Sprite key={i} path="/images/tree.png" />
          </>
        ))}
        {Array.from({ length: 20 }, (_, i) => (
          <>
            <Sprite key={i} path="/images/stone.png" />
          </>
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <Sprite key={i} path="/images/foliage.png" />
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <Sprite key={i} path="/images/statue.png" />
        ))}
        {Array.from({ length: 3 }, (_, i) => (
          <Sprite key={i} path="/images/pond.png" />
        ))}
      </div>
    </section>
  );
};

const Sprite = ({ path, ...props }: { path: string }) => {
  const [[width, height], setWindowSize] = useState([0, 0]);
  useEffect(() => {
    setWindowSize([window.innerWidth, window.innerHeight]);
  }, []);

  return (
    <img
      style={{
        top: `${getRandomNumber(height)}px`,
        left: `${getRandomNumber(width)}px`,
      }}
      className={`absolute -z-10`}
      alt="Tree"
      src={path}
    />
  );
};

const getRandomNumber = (max: number, min = 0) =>
  min + Math.random() * (max - min);

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createSSGHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.fetchQuery('post.all');
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
