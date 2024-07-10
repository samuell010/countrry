import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Countries from "./routes/Countries";
import CountriesSingle from "./routes/CountriesSingle";
import Favourites from "./routes/Favourites";
import Home from "./routes/Home";
import Root from "./routes/Root";
import store from "./store/store";
import Register from "./routes/Register";
import Login from "./routes/Login";

const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/countries",
          element: <Countries />,
        },
        {
          path: "countries/:single",
          element: <CountriesSingle />,
        },
        {
          path: "/favourites",
          element: <Favourites />,
        },
        {
          path:"/register",
          element:<Register/>

        },
        {
          path: "/login",
          element: <Login/>,
        }
      ],
    },
  ]);

  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router}></RouterProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
