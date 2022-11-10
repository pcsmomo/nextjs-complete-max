import Image from "next/image";

import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/noah.png"
          alt="An image showing Noah"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Noah</h1>
      <p>
        I blog about web development - especiallly frontend frameworks like
        react
      </p>
    </section>
  );
}

export default Hero;
