import { useRouter } from "next/router";
import { HitDiv, HitTitle } from "./Style/Hit";
import { SearchContext } from "./reducer";
import { useContext } from "react";

const Hit = ({ hit }) => {
  const { close } = useContext(SearchContext);

  const router = useRouter();
  const onItemSelect = () => {
    router.push(`/categories/${hit.category}/${hit.sku}`);
    close();
  };

  return (
    <HitDiv onClick={onItemSelect}>
      <img style={{ width: "30px", height: "auto" }} src={hit.image} />
      <HitTitle>{hit.name}</HitTitle>
    </HitDiv>
  );
};

export default Hit;
