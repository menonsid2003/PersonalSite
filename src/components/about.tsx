import React from 'react';
import styles from './about.module.scss'; // Make sure to create and style this CSS file

const About: React.FC = () => {
    return (
        <div className= {styles.about}>
            <div className= {styles.photo}>
                <img src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/gradphoto.jpg" alt="Your Name" className="profile-photo" />
            </div>
            <div className={styles.summary}>
                <h1>Hi!</h1>
                <p>
                I'm Sid Menon! With experience in web development, cloud development and data analysis, I am always eager to 
                learn new technologies and gain practical knowledge. 
                <br></br>In my free time, I love exploring the 
                creative side of things—whether it's digging into how video games work under the hood, playing guitar,
                 or experimenting in the kitchen. Hope you enjoy your time here!
                </p>
            </div>
        </div>
    );
};

export default About;