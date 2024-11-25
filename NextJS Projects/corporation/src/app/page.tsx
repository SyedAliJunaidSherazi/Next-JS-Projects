// Note#1: In Next js, we have file based routing system, which means routing will be performed based on  the folder name.
// folder name  should be special and specfic. for each screen, we have one name for the file called as page.tsx and we navigate to them based on their folder name
// for example https://localhost:3000/performance
//or for home page -> https://localhost:3000/

// Note#2: In Next JS, all the react components for page.tsx files comes with file based routing, which means , there is no need to setup seperate App Router like React, rather we can navigate to different screens by just using specific folder names in the url path
// for example -> https://localhost:3000/scale -> it will display us scale page

// Note#3: For navigation in Next js, we use a component from next called "Link", it is similar to anchor tag in html but there is a good reasoning behind using Link component for navigation
// import Link from "next/link";

//Note#4: Each time we hit a route using folder name, the next first find the ui page of that folder, and then it is render as a child of <Layout><Page(eg: Performance Page)></Layout> component. 
// we have a seprate file for layout by default then will be the parent of each file we try to render. That's what is behind the scenes.

//Note#6: As we know that src/app is a special folder only for keeping folder that contains route file for screens. so keeping other folder like components or data or utils will create a confusion for developer.
// so we should place other folder outside in app folder and inside the src.
// src/app
// src/components etc

//Note#9: Next js gives us a highly optimized image component to render our images instead of making our own component.
// We can gives it either locally present image in our project or get it online from internet
// it does a cool thing, if our image size is large and the screen gets small, then this image component sends a request to next js server to resize the image according to the screen size.
// the next js server resizes the image one time and saves it in the Cache.
// import Image from "next/image";
// we can directly import it
import homeImg from "../../public/home.jpg";
import Hero from "@/components/hero";


export default function Home() {
  return (

    // we can comment that and can use our hero component instead
    // <div>

    //   {/* we can place our links inside the root Layout component in layout file instead of placing here as it will be a lot of copy paste */}
    //   {/* <div>
    //     <Link href="/performance">Performance</Link>
    //     <Link href="/reliability">Reliability</Link>
    //     <Link href="/scale">Scale</Link>
        
    //   </div> */}
      
    //   {/* we can use this div directly inside our Hero Component for reusability */}
    //   {/* <div className="absolute -z-10 inset-0">
    //     <Image src={homeImg} alt="Car Factory"
    //       fill style={{objectFit:"cover"}} />

    //   </div> */}

    //   Home Page</div>

    <Hero imgData={homeImg} imgAlt="Car Factory" title="Professional Cloud Hosting"/>
  );

}
