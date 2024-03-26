
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SignIn from './pages/SIgnIn';
import Rooms from './pages/Roooms/Rooms';
import LostFound from './pages/LostFound';
import HomeTourists from './pages/Tourism/HomeTourists';
import TouristsLogs from './pages/Tourism/TouristsLogs';
import SideBar from './components/SideBar';
import AddTourist from './pages/Tourism/AddTourist';
import ViewAllEvents from './pages/Events/ViewAllEvents';
import AddEvent from './pages/Events/AddEvent';
import AddRooms from './pages/Roooms/AddRooms';
import ViewRooms from './pages/Roooms/ViewRooms';
import AddStaff from './pages/Staff/AddStaff';
import ViewStaff from './pages/Staff/ViewStaff';
import UpdateStaff from './pages/Staff/UpdateStaff';
import Attendance from './pages/Staff/Attendance';
import AddAttendance from './pages/Staff/AddAttendance';
import UpdateEvent from './pages/Events/UpdateEvent';
import InventoryManagement from './pages/Inventory/Inventory Management';
import KitchenManagement from './pages/Kitchen/Kitchen';
import ClientOrderManagement from './pages/Kitchen/AddOrder';
import MaintenanceForm from './pages/Maintainance/MaintainanceForm';
import AllMaintenance from './pages/Maintainance/ViewAllMaintenance';
import UpdateMaintenance from './pages/Maintainance/UpdateMaintenance';
import AddReservation from './pages/Roooms/AddReservation';
import UpdateRooms from './pages/Roooms/UpdateRoom';
import ViewFinance from './pages/Finance/ViewFinance';
import AddExpensesIncome from './pages/Finance/AddExpensesIncome';
import UserProfile from './pages/Tourism/UserProfile';
import AddPackage from './pages/Packages/Add Package';
import ViewPackages from './pages/Packages/ViewPackages';
import AdminViewPackages from './pages/Packages/AdminViewPackages';
import UpdatePackage from './pages/Packages/UpdatPackage';
import MyBookings from './pages/Bookings/MyBookings';
import ClientEvent from './pages/Events/ClientEvent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Home />
            }
          />
          <Route
            path="/userprofile"
            element={
              <UserProfile />
            }
          />
          <Route
            path="/lostfound"
            element={
              <LostFound />
            }
          />
          <Route
            path="/signup"
            element={
              <SignUp />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn />
            }
          />
          <Route
            path="/rooms"
            element={
              <Rooms />
            }
          />

          <Route
            path="/tourists"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <HomeTourists />
                </div>
              </div>
            }
          />
          <Route
            path="/addpackage"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AddPackage />
                </div>
              </div>
            }
          />
          <Route
            path="/mybookings"
            element={
              <MyBookings />

            }
          />
          <Route
            path="/viewpackages"
            element={
              <ViewPackages />
            }
          />
          <Route
            path="/adminviewpackages/"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AdminViewPackages />
                </div>
              </div>
            }
          />
          <Route
            path="/touristslog/"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <TouristsLogs />
                </div>
              </div>
            }
          />
          <Route
            path="/addtourist"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AddTourist />
                </div>
              </div>
            }
          />
          <Route
            path="/viewallevents"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <ViewAllEvents />
                </div>
              </div>
            }
          />
          <Route
            path="/addevent"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AddEvent />
                </div>
              </div>
            }
          />
          <Route
            path="/viewevents"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <ViewAllEvents />
                </div>
              </div>
            }
          />
          <Route
            path="/updateevent/:id"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <UpdateEvent />
                </div>
              </div>
            }
          />
          <Route
            path="/inventory"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <InventoryManagement />
                </div>
              </div>
            }
          />
          <Route
            path="/kitchen"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <KitchenManagement />
                </div>
              </div>
            }
          />
          <Route
            path="/event"
            element={
                  <ClientEvent/>
                }
          />
          <Route
            path="/order"
            element={
                  <ClientOrderManagement />
                }
          />
          <Route
            path="/addmaintainance"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <MaintenanceForm />
                </div>
              </div>
            }
          />
          <Route
            path="/viewmaintainance"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AllMaintenance />
                </div>
              </div>
            }
          />
          <Route
            path="/editpackage/:id"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <UpdatePackage />
                </div>
              </div>
            }
          />
          <Route
            path="/updatemaintainance/:id"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <UpdateMaintenance />
                </div>
              </div>
            }
          />
          <Route
            path="/addstaff"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AddStaff />
                </div>
              </div>
            }
          />
          <Route
            path="/viewstaff"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <ViewStaff />
                </div>
              </div>
            }
          />
          <Route
            path="/updatestaff/:id"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <UpdateStaff />
                </div>
              </div>
            }
          />
          <Route
            path="/staff/attendance/"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <Attendance />
                </div>
              </div>
            }
          />
          <Route
            path="/staff/attendance/add"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AddAttendance />
                </div>
              </div>
            }
          />
          <Route
            path="/addreservation"
            element={
              <AddReservation />
            }
          />
          <Route
            path="/addrooms"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AddRooms />
                </div>
              </div>
            }
          />
          <Route
            path="/viewrooms"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <ViewRooms />
                </div>
              </div>
            }
          />
          <Route
            path="/updaterooms/:id"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <UpdateRooms />
                </div>
              </div>
            }
          />
          <Route
            path="/viewfinance"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <ViewFinance />
                </div>
              </div>
            }
          />
          <Route
            path="/addfinance"
            element={
              <div className='row'>
                <div className='col-2'>
                  <SideBar />
                </div>
                <div className='col-10'>
                  <AddExpensesIncome />
                </div>
              </div>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
