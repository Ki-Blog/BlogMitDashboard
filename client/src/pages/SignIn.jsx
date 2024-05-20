import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import logo from "../images/logo_gross.png";
import logodark from "../images/logodark_gross.png";
import backgroundImage from "../images/background.jpg";
import backgroundImageLight from "../images/background_light.jpg";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);
  
  const handleChance = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20 flex justify-center">
      <div className="relative bg-cover h-[600px] w-[880px] bg-center border border-[#a00a8c]">
        <div className="absolute right-0 top-0 w-1/2 bg-[#343e7f40] dark:bg-[#000000] h-full"></div>
        <div className="absolute left-0 top-0 w-1/2 h-full bg-center bg-cover" style={{ backgroundImage: `url(${theme === 'dark' ? backgroundImage : backgroundImageLight})` }}></div>
        <div className="absolute top-0 right-0 flex p-3 max-w-3xl mt-14 mr-14 flex-col md:flex-row md:items-center gap-5">
          {/* left */}
          <div className="flex-1 mt-16 mr-16">
          <h1 className="text-4xl font font-semibold text-[#0e93b7] dark:text-[#0096bf] text-center my-3">Willkommen bei</h1>
            <Link to="/" className=" font-bold dark:text-white text-4xl">
              <img src={theme === "dark" ? logodark : logo} alt="Logo" />
            </Link>
            <p className="rext-sm text-center p-5 text-lg">
            Jetzt registrieren oder mit Google anmelden.
            </p>
          </div>
          {/* right */}
          <div className="flex-1 mt-12 mb-2 ml-12">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <Label value="E-Mail:" />
                <TextInput 
                  type="email" 
                  placeholder="name@company.com" 
                  id="email" onChange={handleChance}
                  style={{
                    backgroundColor: theme === 'dark' ? 'black' : 'white',
                    color: theme === 'dark' ? 'white' : 'black'
                  }}
                />
              </div>
              <div>
                <Label value="Passwort:" />
                <TextInput 
                  type="password" 
                  placeholder="*********" 
                  id="password" onChange={handleChance}
                  style={{
                    backgroundColor: theme === 'dark' ? 'black' : 'white',
                    color: theme === 'dark' ? 'white' : 'black'
                  }}
                />
              </div>
              <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading}>
                {loading ? (
                  <>
                  <Spinner size="sm"/>
                    <span className="pl-3">Laden...</span>
                  </>
                ) : (
                "Einloggen"
                )}
              </Button>
              <OAuth/>
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Noch keinen Account?</span>
              <Link to="/signup" className="text-[#c409ab] dark:text-[#0e93b7]">
                Registrieren
              </Link>
            </div>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
