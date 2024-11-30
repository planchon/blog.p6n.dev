export const NotionVideo: React.FC<{
  src: string
  blockId: string
}> = ({ src, blockId }) => {
  return <video src={src} controls autoPlay loop muted className="rounded-lg" />
}
