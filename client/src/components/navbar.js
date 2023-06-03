import { Link } from "react-router-dom";


export const Navbar = () => {
    return (
    <nav>
          {
            <header class="p-3 text-bg-dark">
                <div class="container">
                <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"></svg>
                    </a>

                    <img src="./logo.png"></img>

                    <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li ><Link to="/" class="nav-link px-2 text-secondary"> Home </Link></li>
                    <li ><Link to="/register" class="nav-link px-2 text-white"> Register </Link></li>
                    <li ><Link to="/login" class="nav-link px-2 text-white"> Login </Link></li>
                    <li ><Link to="/profile" class="nav-link px-2 text-white"> Profile </Link></li>
                    <li ><Link to="/discover" class="nav-link px-2 text-white"> Discover </Link></li>
                    </ul>

                    <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                    <input type="search" class="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search"></input>
                    </form>

                    <div class="text-end">
                        <Link to="/login" >
                            <button type="button" onclick=<Link to="/login" ></Link> class="btn btn-outline-light me-2">Login</button>
                        </Link>
                        <Link to="/register" >
                            <button type="button" class="btn btn-warning">Sign-up</button>
                        </Link>
                    </div>
                </div>
            </div>
            </header>
        }
    </nav>
    );
}





    // <div className="navbar">
    //     <Link to="/"> Home </Link>
    //     <Link to="/register"> Register </Link>
    //     <Link to="/login"> Login </Link>
    //     <Link to="/profile"> Profile </Link>
    //     <Link to="/discover"> Discover </Link>
    // </div>