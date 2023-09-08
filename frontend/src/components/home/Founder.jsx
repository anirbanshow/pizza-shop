import React from 'react';
import { motion } from "framer-motion";
import me from "../../assets/founder.webp";

const Founder = () => {

    const options = {
        initial: { x: "-100%", opacity: 0 },
        whileInView: { x: 0, opacity: 1 }
    }

    return (
        <section className="founder">
            <motion.div {...options} >
                <img src={me} alt="" height={200} width={200} />
                <h3>Anirban Dev</h3>
                <p>
                    Hey, Welcome everyone, order now and free home delivary
                    <br />
                    Our aim is to create the most testy pizza
                </p>
            </motion.div>
        </section>
    )
}

export default Founder;