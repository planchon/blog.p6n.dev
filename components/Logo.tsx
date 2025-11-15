import NextImage from "next/image";
import ppl from "../public/apple-touch-icon.png";

const Logo = () => (
  <NextImage
    alt="Logo"
    className="rounded-full border shadow-md"
    height={40}
    src={ppl}
    width={40}
  />
);

export default Logo;
