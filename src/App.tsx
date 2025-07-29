import { useRef, useState } from 'react';
import './App.css'

function App() {

  const fileRef = useRef<HTMLInputElement>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [signedPdf, setSignedPdf] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = event.target.files?.[0];
    console.log("selected file", file);
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a file with a .pdf extension.');
      return;
    }
    console.log('Uploading file to server:', file.name);


    setPdfFile(file);
    setSignedPdf(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('pdf', file);

      const response = await fetch('http://localhost:4000/sign-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Server error during signing');

      const signedBlob = await response.blob();
      const signedUrl = URL.createObjectURL(signedBlob);
      setSignedPdf(signedUrl);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (): void => {
    fileRef.current?.click();
  };


  return (
    <>
      <div className="min-h-screen bg-grey-100 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow">
          <nav className="container mx-auto px-4 flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              {/* logo comapny */}
              {/* <img scr="/logo.svg" alt="Company Logo" className="h-8" */}
              <span className="text-lg sm:text-xl font-bold text-blue-700 tracking-tight">
                MyCompany PDF Signer
              </span>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center px-2 sm:px-6">
          <section className="w-full max-w-lg p-4 sm:p-8 bg-white rounded-2xl shadow-lg my-6 sm:my-10 border border-blue-100">
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-blue-800 mb-1 sm:mb-2">Upload and Sign Your PDF</h2>
            <p className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base">The best way to sign your PDF online</p>
            <div
              onClick={handleSubmit}
              className="flex flex-col items-center justify-center border-2 border-dashed border-blue-200 hover:border-blue-400 p-4 sm:p-6 mb-3 sm_mb-4 rounded-xl bg-blue-50 cursor-pointer transition">
              <input
                ref={fileRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFiles}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin='round' strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <p className="mt-2 text-blue-6 font-medium text-sm sm:text-base">Click or tap to select your PDF</p>
              <p className="text-xs text-gray-400 mt-1">(PDF format only)</p>
              {
                pdfFile && (
                  <div className="mt-3 w-full flex flex-col items-start">
                    <span className="block w-full truncate text-green-600 font-medium text-xs sm:text-sm">Uploaded: {pdfFile.name}</span>
                    <button
                      type="button"
                      className="mt-1 px-3 py-1 text-red-600 bg-red-50 rounded hover:bg-red-100 transition text-xs sm:text-sm font-semibold border border-red-100 self-start"
                      onClick={e => {
                        e.stopPropagation();
                        setPdfFile(null);
                        setSignedPdf(null);
                        if (fileRef.current) fileRef.current.value = "";
                      }}
                      aria-label="Remove uploaded PDF"
                    >
                      Remove
                    </button>
                  </div>
                )
              }

              {loading && (
                <p className="mt-3 text-blue-600 font-medium animate-pulse text-xs sm:text-sm">
                  Uploading and signing your file...
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 transition text-base" disabled={loading}>
              {
                loading ? "Processing..." : "Select PDF"
              }
            </button>
            {(!loading && signedPdf) && (
              <button onClick={(() => {
                const a = document.createElement('a');
                a.href = signedPdf;
                a.download = 'signed-copy.pdf';
                a.click();
              })}
                className="mt-3 w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition text-base" >
                Download Signed PDF
              </button>
            )}

            {
              signedPdf && (
                <div className="mt-5">
                  <h3 className="text-base sm:text-lg font-semibold mb-1 text-gray-800">Signed PDF Preview:</h3>
                  {/* Preview available only on tablet and desktop screens */}
                  <div className="hidden min-[480px]:block rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                    <iframe
                      src={signedPdf}
                      width="100%"
                      className="h-72 md:h-96 border-none"
                      title="Signed PDF"
                    />
                  </div>
                  {/* Button for Mobile screens only */}
                  <button
                    onClick={() => window.open(signedPdf, '_blank')}
                    className="min-[480px]:hidden mt-3 w-full py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-900 transition text-base"
                  >
                    Open Signed PDF
                  </button>
                </div>
              )
            }
          </section>
        </main >

        {/* Footer */}
        < footer className="bg-white text-gray-400 py-4 text-sm text-center shadow-inner" >
          & copy; {new Date().getFullYear()} MySite. All rights reserved.
        </footer >
      </div >
    </>
  )
}

export default App
