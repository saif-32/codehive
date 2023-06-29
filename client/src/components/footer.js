import { Link } from "react-router-dom";


export const Footer = () => {
    return (
    <div>
          {
            <section className="">
                <footer className="bg-dark text-center text-white">

                    <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    Copyright © 2023 CodeHive All Rights Reserved.<br/>
                    <Link className="footer-links" to="/">Home</Link>
                    <Link className="footer-links" to="/privacy">Privacy</Link>
                    <Link className="footer-links" to="/terms">Terms</Link>

                    </div>
                </footer>
            </section>
        }
    </div>
    );
}