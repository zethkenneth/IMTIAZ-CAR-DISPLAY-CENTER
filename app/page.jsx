import Feed from "@components/feed";

function Home() {
  return (
    <section className='w-full flex-center flex-col'>
      <h1 className='head_text text-center'>
        BUY and DRIVE
        <br className='max-md:hidden' />
        <span className='orange_gradient text-center'>AI-powered Prompts</span>
      </h1>
      <p className='desc text center'>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias deleniti
        sint minima dolorum aspernatur quidem eos non ea, facilis repellat.
        Fugit, quisquam amet velit harum laborum enim adipisci laboriosam modi.
      </p>
      <Feed />
    </section>
  );
}

export default Home;
