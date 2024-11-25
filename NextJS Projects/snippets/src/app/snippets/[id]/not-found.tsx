// as we are using not-found file name, next will try to find the closes route that meets the file name then it will redner it.
// in this way, we can customize our not found pages for multiple page.tsx by keeping them in the same direclty.
// if i move it above in the root folder heirarcy, then this page will become accessable in other pages in the same folder when notFound() function will be called

export default function SnippetNotFound() {
  return (
    <div>
        <h1 className="text-xl bold">
            Sorry, but we couldnt found this Snippet :(
        </h1>
      
    </div>
  )
}
