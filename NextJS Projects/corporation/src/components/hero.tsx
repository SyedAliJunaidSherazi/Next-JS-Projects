//Note#10: A component that as a background image, a title in the center or the header is conventionally known by name as hero image or hero components

import { StaticImageData } from "next/image";
import Image from "next/image";


// As we are using typescript, so we have to defined object type of everything using either interface, object or enums

interface HeroProp {
    imgData: StaticImageData;
    imgAlt: string;
    title: string;

}

export default function Hero(props: HeroProp) {
    return (
        <div className="relative h-screen">
            <div className="absolute -z-10 inset-0">
                <Image src={props.imgData} alt={props.imgAlt}
                    fill
                    style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900"></div>


            </div>
            <div className="pt-48 flex justify-center items-center">
                <h1 className="text-white text-6xl">{props.title}</h1>

            </div>
        </div>


    );
}