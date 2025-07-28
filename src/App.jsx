import './App.css'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-blue-600 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Upload PDF page</h1>
            <ul className="hidden md:flex space-x-6">
              <li>
                <a href="#" className="hover:underline">Home</a>
              </li>
              <li>
                <a href="#" className="hover:underline">About</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Services</a>
              </li>
              <li>
                <a href="#" className="hover:underline">Contact</a>
              </li>
            </ul>
            {/* Mobile menu button */}
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <h2 className="text-3xl font-semibold mb-6"> Welcome yo my page</h2>
          <p className="mb-4">This is a responsive layout using Tailwind CSS with Vite and Typescript</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded shadow md:col-span-3 md:row-span-2 h-62">
              <div className="col-span-2 p-6 rounded shadow border-4 border-dashed border-gray-400 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-500 transition-colors h-48">
                <p className="mb-4 text-gray-600 text-lg"> Drop the file here</p>
                <button type="button" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400">
                  Select a PDF
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 p-4 text-center">
          &copy; {new Date().getFullYear()} MySite. All rights reserved.
        </footer>
      </div>
    </>
  )
}

export default App
