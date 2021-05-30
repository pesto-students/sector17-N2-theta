import { useRouter } from "next/router";

const Catalog = () => {
  const router = useRouter();

  return router && <div>{router.query['category-slug']}</div>
}

export default Catalog;