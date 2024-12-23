import React from 'react';
import styles from './contact.module.scss';

const Contact: React.FC = () => {
    return (
        <div className = {styles.contacts}>
            <h2>Contact</h2>
            <ul>
                Feel free to reach out to me via:
                <li> <img src='https://upload.wikimedia.org/wikipedia/commons/8/8c/Gmail_Icon_%282013-2020%29.svg'></img> : <a href="menonsid2003@gmail.com">menonsid2003@gmail.com</a></li>
                <li> <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"></img> : <a href="https://www.linkedin.com/in/menonsid2003" target="_blank" rel="noopener noreferrer">https://www.linkedin.com/in/menonsid2003</a></li>
            </ul>
            <p><br></br></p>
            <h2> Latest Resume</h2>
            <iframe src="https://personalportfoliopublicassets.s3.us-east-1.amazonaws.com/dec_resume.pdf"></iframe>
        </div>
    );
}

export default Contact;