import { useState } from "react";
import Inputs from "../Inputes/Inputs";
import Modal from "../Modal";
import { HiChevronDown, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

const initialWorkspaces = [
    { id: "personal", name: "Asadullah Ahmed", type: "personal" },
    { id: "c1", name: "ABC Company", type: "company" },
    { id: "c2", name: "XYZ Company", type: "company" },
];

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [openWorkspace, setOpenWorkspace] = useState(false);
    const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);
    const [companyName, setCompanyName] = useState("");

    const [workspaces, setWorkspaces] = useState(initialWorkspaces);
    const [currentWorkspace, setCurrentWorkspace] = useState(initialWorkspaces[0]);

    const handleAddWorkspace = () => {
        const trimmedName = companyName.trim();
        if (!trimmedName) return;

        const newWorkspace = {
            id: `c-${Date.now()}`,
            name: trimmedName,
            type: "company",
        };

        setWorkspaces((prev) => [...prev, newWorkspace]);
        setCurrentWorkspace(newWorkspace);
        setCompanyName("");
        setOpenAddCompanyModal(false);
        setOpenWorkspace(false);
    };

    return (
        <>
            <div className="flex items-center justify-between gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
                {/* Left Section */}
                <div className="flex items-center gap-4">
                    <button
                        className="block lg:hidden text-black"
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                    >
                        {openSideMenu ? (
                            <HiOutlineX className="text-2xl" />
                        ) : (
                            <HiOutlineMenu className="text-2xl" />
                        )}
                    </button>

                    <h2 className="text-lg font-semibold text-black">
                        Expense Tracker
                    </h2>

                    {/* Workspace Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setOpenWorkspace(!openWorkspace)}
                            className="flex items-center justify-between gap-2 border border-gray-300 px-3 py-2 rounded-lg min-w-60 hover:bg-gray-50 transition"
                        >
                            <span className="text-sm font-medium">

                                {currentWorkspace.name}
                            </span>
                            <HiChevronDown />
                        </button>

                        {openWorkspace && (
                            <div className="absolute top-12 left-0 min-w-60 bg-white border border-gray-200 rounded-xl shadow-lg p-2 z-50">
                                {workspaces.map((ws) => (
                                    <button
                                        key={ws.id}
                                        onClick={() => {
                                            setCurrentWorkspace(ws);
                                            setOpenWorkspace(false);
                                        }}
                                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 text-sm"
                                    >
                                        {ws.name}
                                    </button>
                                ))}

                                <div className="border-t border-gray-300 my-2"></div>

                                <button
                                    onClick={() => {
                                        setOpenAddCompanyModal(true);
                                        setOpenWorkspace(false);
                                    }}
                                    className="w-full text-left px-3 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-lg"
                                >
                                    + Add Company
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Side Menu */}
                {openSideMenu && (
                    <div className="fixed top-[61px] -ml-4 bg-white">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                )}
            </div>

            <Modal
                isOpen={openAddCompanyModal}
                onClose={() => {
                    setOpenAddCompanyModal(false);
                    setCompanyName("");
                }}
                title="Add Company"
            >
                <Inputs
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    label="Company name"
                    placeholder="Enter company name"
                    type="text"
                />

                <div className="flex justify-end mt-6">
                    <button
                        type="button"
                        className="add-btn add-btn-fill"
                        onClick={handleAddWorkspace}
                    >
                        Add Workspace
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default Navbar;
