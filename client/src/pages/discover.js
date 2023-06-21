import '../styles/discover.css'
import { useNavigate, useParams, Link} from "react-router-dom"

export const Discover = () => {
    return <div className="discover-container">
        <img className='discover-logo'  src='https://cdn.discordapp.com/attachments/798251319847813200/1114605006927184073/CodeHive-Logo-Isolated-3.png'></img>
        <h1>Connect with others!</h1>

        <label htmlFor="discoverSearch"></label>
        <input type="text" id="discoverSearch" className='discover-search'/>

        <button type="button" className="discover-search-user">Search User</button>

        <div className="discover-seperator"><h3>Or, Filter By...</h3></div>
        <div className='filters'>
            <h1><Link to="/login" className="filter-heading">School</Link> </h1>
            <h1><Link to="/login" className="filter-heading">Age</Link> </h1>
            <h1><Link to="/login" className="filter-heading">Interests</Link> </h1>
            <h1><Link to="/login" className="filter-heading">Language</Link> </h1>

        </div>



    </div>
};