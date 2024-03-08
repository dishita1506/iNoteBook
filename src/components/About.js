import React from "react";
import MYPIC from "./MYPIC.jpg"

const About = () => {
    const mystyle = {
        backgroundColor: '#dbe9f7',
        border:'2px solid blue'
    };

    return (
        <div className="container" style={mystyle}>
            <div className="container my-3" >
                <h1 className="my-3">About Us</h1>
                <div className="accordion mt-10" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <strong>Welcome to iNoteBook!</strong>
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>
                                    <strong>Welcome to iNoteBook,</strong>  your digital companion for organizing your thoughts, ideas, and to-do lists. Designed with simplicity, security, and productivity in mind, iNoteBook is here to empower you in capturing and managing your notes seamlessly.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                <strong>Our Mission</strong>
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>
                                    At iNoteBook, our mission is to provide users with a reliable and intuitive platform to declutter their minds and streamline their daily tasks. We believe that organized notes lead to clearer thinking and enhanced productivity, ultimately helping you achieve your goals with ease.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <strong>About the Creator</strong>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                
                            <img className="align-center mx-auto d-block" src={MYPIC} alt="Dishita Gangwar"  style={{'height':'153px','width':'206px','borderRadius':'40%'}}/>
                                <p className="mt-2">
                                    iNoteBook is created with passion by <strong>Dishita Gangwar</strong>, a computer science student. With a keen interest in software development and a desire to solve real-world problems, Dishita embarked on the journey to build iNoteBook from scratch, aiming to provide users with a simple yet powerful tool for organizing their digital lives.
                                </p>
                            
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                <strong>Why Choose iNoteBook?</strong>
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <ul>
                                    <li><strong>Secure and User-Friendly Interface:</strong> iNoteBook offers a clean and intuitive interface, making it easy for users to navigate and manage their notes efficiently.</li>
                                    <li><strong>Robust Security Measures:</strong> Your data security is our top priority. iNoteBook employs encryption techniques to ensure that your notes remain private and secure.</li>
                                    <li><strong>Cross-Platform Compatibility:</strong> Access your notes anytime, anywhere, on any device. iNoteBook is available on web and mobile platforms, allowing you to sync your notes seamlessly across devices.</li>
                                    <li><strong>Browser Compatible:</strong> Our application is browser compatible, which makes it work seamlessly in any browser without any issues.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
        

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                <strong>Connect With Us</strong>
                            </button>
                        </h2>
                        <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                <p>We value your feedback! Whether you have suggestions for improvement or simply want to share your experience, we'd love to hear from you.</p>
                                <p>Connect with us on <a href="https://www.linkedin.com/in/dishita-gangwar-060178229/">Linkedin</a> or reach out via email at <a href="mailto:dishitagangwar1506@gmail.com">dishitagangwar1506@gmail.com</a>.</p>
                                <p><i>Thank you for choosing iNoteBook. Let's organize thoughts and enhance productivity together!</i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
