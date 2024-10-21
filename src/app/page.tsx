import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <section className="text-gray-600 body-font">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Track your expense
      </h1>
      <p className="mb-8 leading-relaxed">Track your expense with our app.</p>
      <div className="flex justify-center">
        <Link href={"/dashboard"}>
        
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Get Started</button>
        </Link>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <Image className="object-cover object-center rounded" width={720} height={600}
       alt="hero" src="/images/hero.png"/>
    </div>
  </div>
</section>
    
    </>
  );
}
