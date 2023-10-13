import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import UpdateUser from "./pages/UpdateUser";
import Home from "./pages/Home";
import AddOrder from "./pages/AddOrder"

import AuthProvider from "./context/AuthContext";
import ProductProvider from "./context/ProductContext";
import OrderProvider from "./context/OrderContext"
import AppointmentProvider from "./context/AppointmentsContext";
import SuscriptionsProvider from "./context/SuscriptionsContext";

import Order from "./pages/Order";
import Shop from "./pages/Shop";
import Orders from "./pages/Orders";
import Scheduler from "./pages/Scheduler";
import Appointments from "./pages/Appointments";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Settings from "./pages/Settings";
import Edit from "./pages/Edit"
import About from "./pages/About"
import Support from "./pages/Support"
import DeleteAccount from "./pages/DeleteAcount"

function App() {
  return (
    <div className="App">
      <AuthProvider>
       <SuscriptionsProvider>
        <ProductProvider>
          <OrderProvider>
            <AppointmentProvider>
            <Routes>
              <Route 
              path="/"
              element={<Home/>}
              />
              <Route
              path="/signin"
              element={<Signin/>}
              />
              <Route
              path="/signup"
              element={<SignUp/>}
              />
              <Route
              path="/update-user"
              element={<UpdateUser/>}
              />
              <Route
              path="/add-order"
              element={<AddOrder/>}
              />
              <Route
              path="/order"
              element={<Order/>}
              />
              <Route
              path='/shop/:name'
              element={<Shop/>}
              />
              <Route
              path="/orders"
              element={<Orders/>}
              />
              <Route
              path="/schedule/:name"
              element={<Scheduler/>}
              />
              <Route
              path="/schedule"
              element={<Scheduler/>}
              />
              <Route
              path='/appointments'
              element={<Appointments/>}
              />
              <Route
              path='/payment'
              element={<Payment/>}
              />
              <Route
              path='/success'
              element={<Success/>}
              />
              <Route 
              path='/settings'
              element={<Settings/>}
              />
              <Route
              path='/settings/edit'
              element={<Edit/>}
              />
              <Route
              path='/settings/about'
              element={<About/>}
              />
              <Route
              path='/settings/support'
              element={<Support/>}
              />
              <Route
              path='/settings/delete'
              element={<DeleteAccount/>}
              />
            </Routes>
            <Toaster/>
            </AppointmentProvider>
          </OrderProvider>        
        </ProductProvider>
       </SuscriptionsProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
