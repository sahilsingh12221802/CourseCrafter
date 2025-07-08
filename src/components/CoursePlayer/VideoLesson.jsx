export function VideoLesson({ content }) {
  return (
    <div className="aspect-video bg-black">
      {content?.url ? (
        <iframe 
          src={content.url} 
          className="w-full h-full"
          allowFullScreen
        />
      ) : (
        <div className="flex items-center justify-center h-full text-white">
          <p>Video coming soon</p>
        </div>
      )}
    </div>
  );
}