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
                                        <Link href="#">
                                            <a>Men</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Women</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Kids</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer__link-block">
                                <div className="heading">Useful Links</div>
                                <ul>
                                    <li>
                                        <Link href="#">
                                            <a>Men</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Women</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a>Kids</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer__link-blocks">
                            <div className="footer__link-block">
                                <div className="heading">
                                    Experience app on mobile
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer__blocks">
                        <div className="copyright">© 2021 Sector17.com</div>
                        <div className="made-by">
                            Made with ❤️ by{" "}
                            <Link href="#">
                                <a>Ravi</a>
                            </Link>
                            ,{" "}
                            <Link href="#">
                                <a>Pardeep</a>
                            </Link>{" "}
                            and{" "}
                            <Link href="#">
                                <a>Raghav</a>
                            </Link>
                        </div>
                        <div className="copyright">
                            Find source code at{" "}
                            <Link href="#">
                                <a>Github</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </FooterStyle>
    );

export default Footer;
