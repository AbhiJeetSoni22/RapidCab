import { useRef, useState } from "react";
import Navbar from "./Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanle from "../components/LocationSearchPanle";
import "remixicon/fonts/remixicon.css";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";

const Dashboard = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitForDriver, setWaitForDriver] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  

  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        visibility: "visible",
        height: "24rem",
      });
    } else {
      gsap.to(panelRef.current, {
        visibility: "hidden",
        height: "0",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        visibility: "visible",
        height: "22rem",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        visibility: "visible",
        height: "25rem",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        visibility: "visible",
        height: "23rem",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if (waitForDriver) {
      gsap.to(waitForDriverRef.current, {
        visibility: "visible",
        height: "23rem",
      });
    } else {
      gsap.to(waitForDriverRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [waitForDriver]);
  return (
    <>
      <Navbar />
      <div className="flex flex-col flex-col-reverse lg:flex-row h-screen overflow-hidden">
        <div
          className={`w-full flex mb-8 md:mb-0 flex-col lg:w-1/3 bg-white relative p-6`}
        >
          {!waitForDriver &&!vehicleFound && !confirmRidePanel && !vehiclePanel && (
            <div
              className={`max-w-md w-full md:top-0 relative mx-auto md:m-14 bg-white `}
            >
              <form
                action=""
                onSubmit={(e) => {
                  submitHandler(e);
                }}
              >
                <h1 className="text-3xl font-semibold mb-4">Get a ride</h1>
                <div
                  className={`absolute h-5 w-5 md:hidden rounded-full top-1 right-2 ${
                    vehiclePanel || panelOpen ? "block" : "hidden"
                  } `}
                  onClick={() => {
                    setPanelOpen(false);
                    setVehiclePanel(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="gray"
                  >
                    <path d="M12 15.6315L20.9679 10.8838L20.0321 9.11619L12 13.3685L3.9679 9.11619L3.03212 10.8838L12 15.6315Z"></path>
                  </svg>
                </div>
                <div className="mb-4 relative">
                  <div className="line absolute h-20 w-1 top-5 rounded-full left-5 bg-gray-800"></div>
                  <input
                    type="text"
                    value={pickupLocation}
                    placeholder="Pickup location"
                    className="w-full text-lg px-12 py-3 border bg-[#e7e7e7] rounded-lg focus:ring focus:ring-gray-700 focus:outline-none"
                    onChange={(e) => setPickupLocation(e.target.value)}
                    onClick={() => setPanelOpen(true)}
                  />
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={dropoffLocation}
                    placeholder="Dropoff location"
                    className="w-full text-lg px-12 py-3 border bg-[#e7e7e7] rounded-lg focus:ring focus:ring-gray-700 focus:outline-none"
                    onChange={(e) => setDropoffLocation(e.target.value)}
                    onClick={() => setPanelOpen(true)}
                  />
                </div>
              </form>
            </div>
          )}
          {!vehiclePanel && (
            <div
              ref={panelRef}
              className={`bg-white relative md:mt-0 top-2 md:top-0 overflow-hidden`}
            >
              {panelOpen && (
                <LocationSearchPanle
                  setPanelOpen={setPanelOpen}
                  setVehiclePanel={setVehiclePanel}
                />
              )}
            </div>
          )}

          <div
            ref={vehiclePanelRef}
            className={`md:ml-12 transition-all ease-linear md:mt-16 ${
              vehiclePanel && !panelOpen ? `visible` : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <VehiclePanel
              vehiclePanel={vehiclePanel}
              setConfirmRidePanel={setConfirmRidePanel}
              panelOpen={panelOpen}
              setVehiclePanel={setVehiclePanel}
              setPanelOpen={setPanelOpen}
            />
          </div>
          <div
            ref={confirmRidePanelRef}
            className={`md:ml-0 transition-all ease-linear md:mt-20 ${
              confirmRidePanel && !vehiclePanel && !panelOpen
                ? `visible`
                : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <ConfirmRide
              vehiclePanel={vehiclePanel}
              setVehicleFound={setVehicleFound}
              setConfirmRidePanel={setConfirmRidePanel}
              confirmRidePanel={confirmRidePanel}
              panelOpen={panelOpen}
              setVehiclePanel={setVehiclePanel}
              setPanelOpen={setPanelOpen}
            />
          </div>

          <div
            ref={vehicleFoundRef}
            className={`md:ml-0 transition-all ease-linear md:mt-20 ${
              !confirmRidePanel && !vehiclePanel && !panelOpen
                ? `visible`
                : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <LookingForDriver
            setConfirmRidePanel={setConfirmRidePanel}
              confirmRidePanel={confirmRidePanel}
              vehicleFound={vehicleFound}
              setVehicleFound={setVehicleFound}
              panelOpen={panelOpen}
              setWaitForDriver={setWaitForDriver}
            />
          </div>
          <div
             ref={waitForDriverRef}
            className={`md:ml-0 transition-all ease-linear md:mt-20 ${
            waitForDriver&&  !confirmRidePanel && !vehiclePanel && !panelOpen
                ? `visible`
                : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <WaitingForDriver
              WaitingForDriver={waitForDriver}
          
              setVehicleFound={setVehicleFound}
            
            />
          </div>
        </div>

        {/* right panel */}
        <div
          className={`flex-1 bg-gray-100 relative m-0 md:m-16`}
          style={{
            position: panelOpen ? "sticky" : "relative",
            top: panelOpen ? "0" : "unset",
            zIndex: panelOpen ? "-10" : "unset",
          }}
        >
          <div className="w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345082766!2d144.9556516153866!3d-37.81627997975145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771f4573b3d6b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1634634920346!5m2!1sen!2sau"
              className="w-full h-full"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
