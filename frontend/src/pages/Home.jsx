import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <main
        className="w-full h-screen bg-center bg-cover"
        style={{
          backgroundImage: "url('src/assets/logo.png')",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
          <div className="text-center">
            <h1
              className="text-3xl font-semibold text-white lg:text-4xl mb-8"
              style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
            >
              Build your new <span className="text-blue-400">BEIJZKAMP</span>{" "}
              Project
            </h1>

            <div className="flex justify-center gap-4">
              <div className="flex flex-col items-center pl-16 ml-10">
                <p
                  className="mb-4 text-white"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  I've Been Here Already & Ready to Continue My Awesome
                  Projects!!!
                </p>
                <a
                  href="/login"
                  className="inline-block px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  LOGIN
                </a>
              </div>
              <div className="flex flex-col items-center pr-16 mr-10">
                <p
                  className="mb-4 text-white"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  I'm New and Want to Manage Awesome Projects!!!!
                </p>
                <a
                  href="/register"
                  className="inline-block px-6 py-3 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  REGISTER
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
