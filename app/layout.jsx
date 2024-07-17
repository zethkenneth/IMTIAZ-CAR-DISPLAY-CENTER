import '@styles/globals.css';
import Nav from '@components/Nav';


function Rootlayout({ children}) {
  return (
    <html lang='en'>
      <body>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
      </body>
    </html>
  );
}

export default Rootlayout;