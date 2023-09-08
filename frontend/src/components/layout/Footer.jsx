import React from 'react';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";

const Footer = () => {
    return (
        <footer>

            <div>
                <h2>PIZZA SHOP</h2>
                <p>We are try to give you the best taste possible.</p>
                <br />
                <em>We give attention to your feedback.</em>
                <strong>All rights reserved</strong>
            </div>

            <aside>
                <h4>Follow Us</h4>

                <a href="https://github.com/anirbanshow">
                    <AiFillGithub />
                </a>
                <a href="https://in.linkedin.com/in/anirbandepp">
                    <AiFillLinkedin />
                </a>
                <a href="mailto:anirbankreative22@gmail.com">
                    <AiOutlineMail />
                </a>
            </aside>

        </footer>
    )
}

export default Footer;