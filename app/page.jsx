import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover and share
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-powered Prompts</span>
        <p className="desc text-center">Finding new Prompts</p>
      </h1>
      <Feed />
    </section>
  );
};

export default Home;
