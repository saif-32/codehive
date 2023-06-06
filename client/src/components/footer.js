import { Link } from "react-router-dom";


export const Footer = () => {
    return (
    <foot>
          {
            <section class="">
                <footer class="bg-dark text-center text-white">

                    <div class="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    Copyright © 2023 CodeHive<br/>
                    <Link className="footer-links" to="/">Home</Link>
                    <Link className="footer-links" to="/">Privacy</Link>
                    <Link className="footer-links" to="/">Terms</Link>

                    </div>
                </footer>
            </section>
        }
    </foot>
    );
}