import React from 'react';
import img1 from "../image/vishu.jpg"
import img2 from "../image/shaswat.jpg"
import img3 from "../image/rohit.jpg"
import img4 from "../image/harsh.jpg"
import img5 from "../image/aman.jpg"
import {motion} from 'framer-motion';
import "../about.css"

const About = () => {
  const options ={
    initial :{
      x : "-100%",
      opacity : 0,

  },
  whileInView :{
      x : 0,
      opacity : 1,

  }
  }
  const options2 ={
    initial :{
      y : "-100%",
      opacity : 0,

  },
  whileInView :{
      y : 0,
      opacity : 1,

  }
  }
  return (
    <div className="container-about">
      <motion.h1 className="title" {...options}>About Us</motion.h1>
      <motion.p {...options}>Our website is designed to provide a simple and efficient way for users to take and organize notes online. Whether it's for personal or professional use, our website provides all the necessary tools to ensure a seamless note taking experience.</motion.p>
    <motion.p {...options}>With a user-friendly interface and a variety of customization options, our website makes it easy to create and manage notes. Plus, with automatic saving and syncing across devices, users never have to worry about losing their notes again.</motion.p>
    <motion.p {...options}>Our mission is to provide the best note taking experience possible, making it simple and efficient for users to capture and organize their thoughts and ideas.</motion.p>
    <motion.h1 {...options}
    transition={{
      delay : 0.2
    }} 
    >Meet Ours Developers</motion.h1>
      {/* <motion.div className="developer-container" {...options2} transition={{
        delay : 0.4
      }}>
        <img
          src={img5}
          alt="Developer"
          className="developer-image"
        />
        <div className="developer-info">
          <h2 className="developer-name">Aman Grover</h2>
          <motion.p className="developer-description">
           Frontend Development and Security
          </motion.p>
        </div>
      </motion.div> */}
      {/* <motion.div className="developer-container"{...options2} transition={{
        delay : 0.6
      }}>
        <img
          src={img2}
          alt="Developer"
          className="developer-image"
        />
        <div className="developer-info">
          <h2 className="developer-name">Shashwat Tiwari</h2>
          <motion.p className="developer-description">
           Backend Development and Error Handling
          </motion.p>
        </div>
      </motion.div> */}
      <motion.div className="developer-container"{...options2} transition={{
        delay : 0.8
      }}>
        <img
          src={img1}
          alt="Developer"
          className="developer-image"
        />
        <div className="developer-info">
          <h2 className="developer-name">Vishwajeet Sharma</h2>
          <motion.p className="developer-description">
           Backend Development & Error Handling
          </motion.p>
        </div>
      </motion.div>
      {/* <motion.div className="developer-container"{...options2} transition={{
        delay : 1
      }}>
        <img
          src={img3}
          alt="Developer"
          className="developer-image"
        />
        <div className="developer-info">
          <h2 className="developer-name">Rohit Kumar</h2>
          <motion.p className="developer-description">
          Frontend Development & Security
          </motion.p>
        </div>
      </motion.div> */}
      {/* <motion.div className="developer-container"{...options2} transition={{
        delay : 1.2
      }}>
        <img
          src={img4}
          alt="Developer"
          className="developer-image"
        />
        <div className="developer-info">
          <h2 className="developer-name">Harsh Parmar</h2>
          <motion.p className="developer-description">
          UI and UX Developer
          </motion.p>
        </div>
      </motion.div> */}
     
    </div>
  );
};

export default About;

