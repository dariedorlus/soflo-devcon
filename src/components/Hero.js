

const Hero = () => {
    return (
      <div className="px-4 py-5 my-5 text-center">
        <img
          className="d-block mx-auto mb-4"
          src="./palm-beach-tech.png"
          alt="Tech Hub South Florida Logo"
          width="72"
          height="72"
        />
        <h1 className="display-5 fw-bold">#SoFloDevCon</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
         SoFlo DevCon is a free one-day geek fest with speakers presenting on the hottest topics in Tech!
          </p>
        </div>
      </div>
    );
}

export default Hero;