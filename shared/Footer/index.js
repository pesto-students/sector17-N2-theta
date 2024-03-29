import Link from "next/link";
import FooterStyle from "./Style";

const Footer = () => (
        <FooterStyle>
            <div className="footer__inner">
                <div className="app-container">
                    <div className="footer__blocks">
                        <div className="footer__link-blocks">
                            <div className="footer__link-block">
                                <div className="heading">Online Shopping</div>
                                <ul>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0100000"
                                        >
                                            <a>TV & Home Theater</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0200000"
                                        >
                                            <a>Audio</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0207000"
                                        >
                                            <a>Musical Instruments</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0400000"
                                        >
                                            <a>Cameras & Camcorders</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0410000"
                                        >
                                            <a>Digital Camera Accessories</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__link-block">
                                <div className="heading">Useful Links</div>
                                <ul>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0500000"
                                        >
                                            <a>Computers & Tablets</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0700000"
                                        >
                                            <a>Video Games</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0800000"
                                        >
                                            <a>Cell Phones</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/abcat0900000"
                                        >
                                            <a>Appliances</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/categories/[category-slug]"
                                            as="/categories/pcmcat252700050006"
                                        >
                                            <a>Toys, Games & Drones</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="footer__blocks">
                        <div className="copyright">© 2021 Sector17.com</div>
                        <div className="made-by">
                            Made with ❤️ by{" "}
                            <Link href="https://www.linkedin.com/in/raviyadav01/">
                                <a target="_blank">Ravi</a>
                            </Link>
                            ,{" "}
                            <Link href="https://www.linkedin.com/in/pardeep2411/">
                                <a target="_blank">Pardeep</a>
                            </Link>{" "}
                            and{" "}
                            <Link href="https://www.linkedin.com/in/raghav-narang/">
                                <a target="_blank">Raghav</a>
                            </Link>
                        </div>
                        <div className="copyright">
                            Find source code at{" "}
                            <Link href="https://github.com/pesto-students/sector17-N2-theta">
                                <a target="_blank">Github</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </FooterStyle>
    );

export default Footer;
