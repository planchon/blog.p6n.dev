import NextImage from "next/image"
import ppl from "../public/apple-touch-icon.png"

const Logo = () => (
  <NextImage
    src={ppl}
    alt="Logo"
    width={40}
    height={40}
    className="rounded-full"
  />
)

export default Logo
