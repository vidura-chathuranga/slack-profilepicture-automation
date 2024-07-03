import CurrentProfile from "./components/CurrentProfile";
import bailes from "./assets/bailes.gif";
import { useEffect, useState } from "react";
import cone from "./assets/cone.png";
import sphere from "./assets/sphere.png";
import torus from "./assets/torus.png";
import icosahedron from "./assets/icosahedron.png";
import loader from "./assets/loader.gif";
import axios from "axios";

function App() {
  const [date, setDate] = useState(new Date());
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const changeProfilePicture = async () => {
    try {
      setLoading(true);

      const res = await axios.get("http://localhost:3000/api/change");
      if (!res.data.status) {
        console.log("error");
      }
      setLoading(false);
      setProfilePicture(res.data.pic);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchCurrentProfilePicture = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/current");

        if (!res.data.status) {
          console.log("error");
        }

        setLoading(false);
        setProfilePicture(res.data.pic);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCurrentProfilePicture();
  }, []);
  return (
    <div>
      <div className="relative min-h-screen bg-gray-50 flex items-center justify-center overflow-hidden">
        <div
          className="circle absolute bg-blue-400 bg-opacity-50 w-72 h-72"
          style={{ top: "10%", left: "20%" }}
        ></div>
        <div
          className="circle absolute bg-pink-400 bg-opacity-50 w-72 h-72"
          style={{ top: "40%", left: "80%" }}
        ></div>
        <div
          className="circle absolute bg-blue-400 bg-opacity-50 w-72 h-72"
          style={{ top: "70%", left: "50%" }}
        ></div>
        <div
          className="circle absolute bg-pink-400 bg-opacity-50 w-72 h-72"
          style={{ top: "20%", left: "40%" }}
        ></div>

        <div class="backdrop-blur bg-white/30 p-8 rounded-xl border border-white/10 shadow-lg">
          <div className="flex flex-col justify-center items-center gap-y-3">
            <h3 className="text-5xl font-bold header-text drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-center">
              Slack Profile Picture
            </h3>
            <h4 className="text-2xl font-semibold">
              {date.toLocaleDateString()}
            </h4>
            <h4 className="text-2xl font-semibold">
              {date.toLocaleTimeString()}
            </h4>
            <CurrentProfile imageURL={isLoading ? loader : profilePicture} />

            <div className="mt-8 mb-3" onClick={changeProfilePicture}>
              <a href="#" className="button">
                <span className="button__text">
                  {isLoading ? "Loading..." : "Change My picture"}
                </span>
                <img src={cone} alt="" className="button__cone" />
                <img src={torus} alt="" className="button__torus" />
                <img src={icosahedron} alt="" className="button__icosahedron" />
                <img src={sphere} alt="" className="button__sphere" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
