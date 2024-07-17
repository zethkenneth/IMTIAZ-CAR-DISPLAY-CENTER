import "@styles/globals.css";
import Feed from "@components/feed";
import Nav from "@components/Nav";

function Home() {
  return (
    <div class="overflow-hidden h-screen">
      <Nav />
      <section className="w-full h-screen flex items-center justify-center flex-col">
        <h1 className="head_text text-center">
          BUY and DRIVE
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">AI-powered Guide</span>
        </h1>
        <div class="mt-10">
          <p className="desc text-center">
            Discover the ultimate driving experience with our{" "}
            <span className="highlight">AI-powered guide</span>. Seamlessly
            blend innovation and convenience as you navigate the road ahead. Our
            advanced technology offers personalized recommendations, ensuring
            you make informed decisions with ease. Say goodbye to uncertainty
            and hello to a new era of driving excellence!
          </p>
        </div>
      </section>
    </div>
  );
}

{
  /* <Feed /> */
}
export default Home;
