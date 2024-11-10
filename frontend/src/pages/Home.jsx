import Login from "../components/Login";
import Register from "../components/Register";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <>
      <Navbar />
      <div
        className="w-full bg-center bg-cover h-[38rem]"
        style={{
          backgroundImage: "url('src/assets/logo.png')",
        }}
      >
        <div className="flex items-center justify-center w-full h-full bg-gray-900/40">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white lg:text-4xl mb-8">
              Build your new <span className="text-blue-400">BEIJZKAMP</span>{" "}
              Project
            </h1>
            <a
              href="/login"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <button>I FEEL LUCKY!</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
