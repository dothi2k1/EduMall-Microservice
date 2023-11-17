import React, { useState } from "react";
import { formatDate } from "@/utils/dateUtils";

const Tab = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium w-full ${
        isActive
          ? "border-b-4 text-xl  border-b-white text-white "
          : " text-slate-800 text-xl font-semibold hover:border-emerald-500 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
};

const TabContent = ({ isActive, children }) => {
  return isActive ? <div className="">{children}</div> : null;
};

const MultipleTabsNavs = ({ items, itemsAll }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full mx-auto bg-gray-50 bg-opacity-30 rounded-lg mt-6">
      <div className="flex items-center">
        <Tab label="Recent filming" isActive={activeTab === "tab1"} onClick={() => handleTabClick("tab1")} />
        <Tab label="Rotation history" isActive={activeTab === "tab2"} onClick={() => handleTabClick("tab2")} />
        <Tab label="Rules" isActive={activeTab === "tab3"} onClick={() => handleTabClick("tab3")} />
      </div>
      <div className="mt-4 ">
        <TabContent isActive={activeTab === "tab1"}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-96 ">
            <table className="w-full text-sm text-left text-white ">
              <thead className="text-lg text-white uppercase ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Reward
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {itemsAll.map((itemAll, index) => (
                  <tr key={index} className=" border-b text-base font-medium  ">
                    <td className="px-6 py-4">{itemAll.username}</td>
                    <td className="px-6 py-4">{itemAll.prize}</td>
                    <td className="px-6 py-4">{formatDate(itemAll.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabContent>
        <TabContent isActive={activeTab === "tab2"}>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-96 ">
            <table className="w-full text-sm text-left text-white ">
              {items.length > 0 ? (
                <>
                  <thead className="text-lg text-white uppercase ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Reward
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className=" border-b text-base font-medium   ">
                        <td className="px-6 py-4">{item.username}</td>
                        <td className="px-6 py-4">{item.prize}</td>
                        <td className="px-6 py-4">{formatDate(item.date)}</td>
                      </tr>
                    ))}
                  </tbody>
                </>
              ) : (
                <span className="flex justify-center px-6 py-10 text-lg ">No history</span>
              )}
            </table>
          </div>
        </TabContent>
        <TabContent isActive={activeTab === "tab3"}>
          <div className=" px-6 py-10 text-lg text-white">
            Rules: Getting ideas from the magical hat program, Lucky Wheel is a quite popular minigame by these.
            Form from online to offline.In addition to attracting interactions based on the psychology of owning gifts and preferring
            The stimulating feeling when participating in the rotation, Lucky Wheel can also collect customer data for times
            Remarketing later.Besides, depending on how to set the rewards and journeys of the player, there is also
            Can help businesses better and increase sales significantly.Understand the business of
            How busy the salesman is, so the Supo launches the Lucky Wheel product with the available interface.
            Eyes, simple settings, easy links on both website and mobile app of the business are using.
            Right now, come to Lucky Wheel. And you will receive extremely good vouchers .......
          </div>
        </TabContent>
      </div>
    </div>
  );
};

export default MultipleTabsNavs;
