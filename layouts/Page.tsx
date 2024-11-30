import React from "react"
import Footer from "@components/Footer"
import Nav from "@components/Nav"
export interface Props {
  children?: React.ReactNode
}

const Page: React.FC<Props> = (props) => {
  return (
    <>
      <Nav />

      <div className="min-h-screen overflow-x-hidden relative">
        {props.children}
      </div>

      <Footer />
    </>
  )
}

export default Page
