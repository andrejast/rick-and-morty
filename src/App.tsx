import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Characters from "./Pages/Characters";
import SingleCharacter from "./Pages/SingleCharacter";
import Location from "./Pages/Location";
import Episode from "./Pages/Episode";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<HomePage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/characters" element={<Characters />} />
              <Route path="/characters/:id" element={<SingleCharacter />} />
              <Route path="/location/:id" element={<Location />} />
              <Route path="/episode/:id" element={<Episode />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
