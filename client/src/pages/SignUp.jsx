import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "../components/OAuth";
import logo from "../images/logo_gross.png";
import logodark from "../images/logodark_gross.png";
import { useSelector } from "react-redux";
import backgroundImage from "../images/background.jpg";
import backgroundImageLight from "../images/background_light.jpg";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useSelector((state) => state.theme);

  const handleChance = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.username) {
      return setErrorMessage("All fields are required");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok)
        navigate("/signin");
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mt-20 flex justify-center">
      <div className="relative bg-cover h-[600px] w-[880px] bg-center border border-[#a00a8c]">
        <div className="absolute right-0 top-0 w-1/2 bg-[#343e7f40] dark:bg-[#000000] h-full"></div>
        <div className="absolute left-0 top-0 w-1/2 h-full bg-center bg-cover" style={{ backgroundImage: `url(${theme === 'dark' ? backgroundImage : backgroundImageLight})` }}></div>
        <div className="absolute top-0 right-0 flex p-3 max-w-3xl mt-10 mr-14 flex-col md:flex-row md:items-center gap-5">
          {/* left */}
          <div className="flex-1 mt-4 mr-14">
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
            <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
              <div>
                <Label value="Name:" />
                <TextInput
                  type="text"
                  placeholder="Name"
                  id="username"
                  onChange={handleChance}
                  style={{
                    backgroundColor: theme === 'dark' ? 'black' : 'white',
                    color: theme === 'dark' ? 'white' : 'black'
                  }}
                />
              </div>
              <div>
                <Label value="E-Mail:" />
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                  onChange={handleChance}
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
                  placeholder="Passwort"
                  id="password"
                  onChange={handleChance}
                    style={{
                    backgroundColor: theme === 'dark' ? 'black' : 'white',
                    color: theme === 'dark' ? 'white' : 'black'
                  }}
                />
              </div>
              <Button gradientDuoTone="purpleToBlue" type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Laden...</span>
                  </>
                ) : (
                  "Registieren"
                )}
              </Button>
              <OAuth />
            </form>
            <div className="flex gap-2 text-sm mt-5">
              <span>Hast du bereits einen Account?</span>
              <Link to="/signin" className="text-[#c409ab] dark:text-[#0e93b7]">
                Anmelden
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
