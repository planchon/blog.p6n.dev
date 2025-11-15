import Footer from "@components/Footer";
import Nav from "@components/Nav";
import type React from "react";

export type Props = {
  children?: React.ReactNode;
};

const Page: React.FC<Props> = (props) => (
  <>
    <Nav />

    <div className="relative min-h-screen overflow-x-hidden">
      {props.children}
    </div>

    <Footer />
  </>
);

export default Page;
