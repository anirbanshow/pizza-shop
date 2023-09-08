import React from 'react';
import { Link } from "react-router-dom";
import { RiFindReplaceLine } from "react-icons/ri";
import me from "../../assets/founder.webp";

const About = () => {
    return (
        <section className="about">
            <main>
                <h1>About Us</h1>

                <article>
                    <h4>Pizza Shop</h4>
                    <p>We are try to give you the best taste possible.</p>
                    <p> Explore the various type of pizza </p>

                    <Link to="/">
                        <RiFindReplaceLine />
                    </Link>

                    <div>
                        <h2>Founder</h2>
                        <article>
                            <div>
                                <img src={me} alt="Founder" />
                                <h3>Stupid Ninja</h3>
                            </div>
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat recusandae praesentium deserunt
                                fuga! Dolores debitis totam, ducimus blanditiis, maxime ipsam ipsa corrupti neque saepe quaerat
                                ab provident veniam quas tenetur.
                            </p>
                        </article>
                    </div>

                </article>
            </main>
        </section>
    )
}

export default About;