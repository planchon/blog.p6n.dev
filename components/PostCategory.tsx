import React from "react"

export const PostCategory: React.FC<{
  category: string
  className?: string
}> = ({ category, className }) => {
  return (
    <div
      className={`font-bold px-1.5 py-1 rounded max-w-max border border-red-200 text-xs uppercase ${className}`}
    >
      {category}
    </div>
  )
}
