
const Navbar=()=>{

    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/Home">Administration</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* <li className="nav-item active">
                <a className="nav-link" href="/Home">Home</a>
              </li> */}
              <li className="nav-item">
                <a className="nav-link" href="/User">UserList</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Product">ProductList</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/OrderHistory">Order History</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/LogFiles">Log Files</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
      </>
    );
}

export default Navbar;