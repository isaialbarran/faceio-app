export default function Welcome() {

  const logOut = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  const openFaceio = () => {
    window.location.href = 'https://faceio.net/'
  }

  return (
    <div className='d-flex h-100 text-center text-bg-dark'>
      <div className='cover-container d-flex w-100 h-100 p-3 mx-auto flex-column'>
        <header className='mb-auto'>
          <div>
            <h3 className='float-md-start mb-0'>FACEIO</h3>
            <nav className='nav nav-masthead justify-content-center float-md-end'>
              <button type="button" className="btn btn-secondary" onClick={logOut}>Log out</button>

            </nav>
          </div>
        </header>

        <main className='px-3'>
          <h1>Fun authentication system :)</h1>
          <p className='lead'>
            I'm just playing around with this authentication system. If you want to learn more click the "Learn more"
            button to go to the official doc and if you want to logout click the "Log out" button on the top hand right corner
            of your screen. Thanks
          </p>
          <p className='lead'>
            <button onClick={openFaceio} type="button" className="btn btn-secondary">Learn More</button>
          </p>
        </main>

        <footer className='mt-auto text-white-50'>
          <p>
            Isai Albarran {' '}
            <a href='https://www.linkedin.com/in/isai-albarran/' className='text-white' target="_blank">
              LinkedIn
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
