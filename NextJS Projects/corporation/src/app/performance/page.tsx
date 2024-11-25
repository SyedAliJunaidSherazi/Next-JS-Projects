// Note: There is a rule for page.tsx files. they must be find out for import by exporting these react component  using export default function Componnent(){}

import perfomanceImg from "../../../public/performance.jpg";
import Hero from "@/components/hero";
export default function PerformancePage(){
    return(
        // <div>Performance Page!</div>
        <Hero imgData={perfomanceImg} imgAlt="welding" title="We serve high performance applications"/>
    );
  

}