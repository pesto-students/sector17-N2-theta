import Link from "next/link";
import { useRouter } from "next/router";
import BreadcrumbsStyle from "./Style";

const Breadcrumbs = (props) => {
  const router = useRouter();
  return (
    router && (
      <div>
        <BreadcrumbsStyle>
          <ul className="breadcrumbs">
            <li>
              <Link href="/">Home</Link>
            </li>
            {props.parent && (
              <li>
                <Link href={props.parentLink}>{props.parent}</Link>
              </li>
            )}
            {props.subparent && (
              <li>
                <Link href={props.subparentLink}>{props.subparent}</Link>
              </li>
            )}
            <li>{props.current}</li>
          </ul>
        </BreadcrumbsStyle>
      </div>
    )
  );
};

export default Breadcrumbs;
