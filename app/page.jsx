import "@styles/globals.css";
import Nav from "@components/Nav";
import { Box } from "@chakra-ui/react";
import ProductLandingPage from "./landingpage/productlandingpage";
import ServicesLandingPage from "./landingpage/services";
import AboutUsLandingPage from "./landingpage/aboutuslandingpage";
import GuideLandingPage from "./landingpage/guidelandingpage";

function Home() {
  return (
    <div className="overflow-hidden h-screen">
      <Nav />
      <Box height="inherit" overflow="scroll">
        <section className="w-full h-screen flex items-center justify-center flex-col px-4 md:px-8">
          <h1 className="head_text text-center">
            BUY and DRIVE
            <br className="hidden md:block" />
            <span className="orange_gradient text-center">
              AI-powered Guide
            </span>
          </h1>
          <div className="mt-10">
            <p className="desc text-center">
              Discover the ultimate driving experience with our
              <span className="highlight">AI-powered guide</span>. Seamlessly
              blend innovation and convenience as you navigate the road ahead.
              Our advanced technology offers personalized recommendations,
              ensuring you make informed decisions with ease. Say goodbye to
              uncertainty and hello to a new era of driving excellence!
            </p>
          </div>
        </section>
        <ProductLandingPage />
        <ServicesLandingPage />
        <GuideLandingPage />
        <AboutUsLandingPage />
      </Box>
    </div>
  );
}

{
  /* <Feed /> */
}
export default Home;
