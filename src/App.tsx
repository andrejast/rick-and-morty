import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Characters from "./pages/Characters";
import SingleCharacter from "./pages/SingleCharacter";
import Location from "./pages/Location";
import Episode from "./pages/Episode";
import HomePage from "./pages/HomePage";
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
