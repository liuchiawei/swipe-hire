import Link from "next/link";

export default function CompanyPage({ params }: { params: { id: number } }) {
  const user = prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <h1>CompanyPage {params.id}</h1>
      <Link href="/">Back to home</Link>
    </div>
  );
}


/* TODO:
import { getAllPostIds, getPostData } from '../../lib/posts'; 
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  }
}

*/