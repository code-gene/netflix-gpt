import { signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import useLocalStorageUser from "../hooks/useLocalStorageUser";
import { useEffect } from "react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const { userInLocal, clearUser } = useLocalStorageUser();

  // Check if the user is stored in localStorage
  useEffect(() => {
    // Check if the user is stored in localStorage
    if (!userInLocal) {
      navigate("/");
    }
  }, [userInLocal, navigate]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        clearUser();
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  const handleGptSearchClick = () => {
    // Toggle GPT Search Button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
      {userInLocal && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="p-2 m-2 bg-gray-900 text-white"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "Homepage" : "GPT Search"}
          </button>
          <img
            className="hidden md:block w-8 h-8 mt-3 object-cover rounded-sm"
            alt="usericon"
            src={userInLocal?.photoURL}
          />
          <button
            onClick={handleSignOut}
            className="mx-4 text-white bg-transparent font-semibold hover:text-[#e50914] hover:font-bold transition duration-300"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;
