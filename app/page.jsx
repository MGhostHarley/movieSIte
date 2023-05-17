import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover New
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">
          Worlds Through Cinema
        </span>
        <p className="desc text-center">Finding Movies That You Love</p>
      </h1>
      <Feed />
    </section>
  );
};

export default Home;
