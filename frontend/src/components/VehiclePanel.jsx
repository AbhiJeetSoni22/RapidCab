

import PropTypes from 'prop-types';

const VehiclePanel = (props) => {
  return (
    <div>
        <h2 className="text-2xl md:text-3xl font-semibold  mb-4">Choose a Vehicle</h2>
            <div
              className={`absolute cursor-pointer md:h-10 md:w-11  h-8 w-9 md:bg-[#eee] rounded-full md:top-8 md:left-10   top-5 right-3 ${
                props.vehiclePanel ||  props.panelOpen ? "block" : "hidden"
              } `}
              onClick={() => {
                props.setPanelOpen(true);
                props.setVehiclePanel(false);
              }}
            >
              <svg
                className="relative md:top-2 top-1 md:left-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="gray"
              >
                <path d="M8.3685 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.3685 12Z"></path>
              </svg>
            </div>
            <div onClick={()=>{props.setConfirmRidePanel(true)
                props.selectVehicle('car')
                props.setVehiclePanel(false)
            }}  className="flex cursor-pointer w-full border-2 mb-2 rounded-xl active:border-black items-center p-2 justify-between">
              <img
                className="h-14 md:h-20 md:-mr-2"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
              <div className=" w-1/2 p-2">
                <h4 className="font-medium text-sm md:text-lg  ">
                  Uber Go{" "}
                  <span>
                    <i className="ri-user-3-line"></i>
                  </span>{" "}
                  4{" "}
                </h4>
                <p className="font-medium text-sm  ">2 mins away</p>
                <p className="font-normal text-xs md:text-lg text-gray-700">
                  Affordable, compact car
                </p>
              </div>
              <h2 className="text-lg md:text-xl font-semibold ">₹{props.fare.car}</h2>
            </div>
            <div  onClick={()=>{props.setConfirmRidePanel(true)
                props.selectVehicle('bike')
                props.setVehiclePanel(false)
            }} className="flex cursor-pointer w-full border-2 mb-2 rounded-xl active:border-black items-center p-2 justify-between">
              <img
                className="h-12 md:h-16"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
                alt=""
              />
              <div className=" w-1/2 p-2">
                <h4 className="font-medium text-sm md:text-lg ">
                  Uber Go{" "}
                  <span>
                    <i className="text-lg ri-user-3-line"></i>
                  </span>{" "}
                  1{" "}
                </h4>
                <p className="font-medium text-sm  ">3 mins away</p>
                <p className="font-normal text-xs md:text-lg text-gray-700">
                  Affordable, bike
                </p>
              </div>
              <h2 className="text-lg font-semibold md:text-xl ">₹{props.fare.bike}</h2>
            </div>
            <div onClick={()=>{props.setConfirmRidePanel(true)
                props.selectVehicle('auto')
                props.setVehiclePanel(false)
            }}  className="flex cursor-pointer w-full border-2 mb-2 rounded-xl active:border-black items-center p-2 justify-between">
              <img
                className="h-12 md:h-16 "
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                alt=""
              />
              <div className=" w-1/2 p-2">
                <h4 className="font-medium text-sm md:text-lg">
                  Uber Go{" "}
                  <span>
                    <i className="ri-user-3-line"></i>
                  </span>{" "}
                  4{" "}
                </h4>
                <p className="font-medium text-sm  ">1 mins away</p>
                <p className="font-normal text-xs md:text-lg text-gray-700">
                  Affordable, auto
                </p>
              </div>
              <h2 className="text-lg font-semibold md:text-xl">₹{props.fare.auto}</h2>
            </div>
    </div>
  );
};

VehiclePanel.propTypes = {
  fare: PropTypes.object,
  vehiclePanel: PropTypes.bool,
  panelOpen: PropTypes.bool,
  confirmRidePanel: PropTypes.bool,
  selectVehicle: PropTypes.func,
  setPanelOpen: PropTypes.func,
  setVehiclePanel: PropTypes.func,
  setConfirmRidePanel: PropTypes.func
};

export default VehiclePanel;