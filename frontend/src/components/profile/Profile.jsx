import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import me from "../../assets/founder.webp";
import { MdDashboard } from "react-icons/md";

const Profile = () => {

    const options = {
        initial: {
            x: "-100%", opacity: 0
        },
        whileInView: {
            x: 0, opacity: 1
        }
    };

    return (
        <section className='profile'>

            <main>
                <motion.img src={me} alt='User' {...options} />

                <motion.h5 {...options} transition={{ delay: 0.3 }}>Anirban</motion.h5>

                <motion.div {...options} transition={{ delay: 0.5 }}>
                    <Link to="/admin/dashboard">
                        <MdDashboard /> Dashboard
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Link to="/myorders">Orders</Link>
                </motion.div>

                <motion.button
                    initial={{ x: "-100%", opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    Logout
                </motion.button>

            </main>

        </section>
    )
}

export default Profile;