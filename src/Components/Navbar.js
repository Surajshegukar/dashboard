import React, { useState } from 'react'
import AddWidgetModal from './AddWidgetModal';
import { useWidgetContext } from '../Context/WidgetContext';
import { FaSearch } from 'react-icons/fa';

function Navbar() {
    const { search, setSearch } = useWidgetContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);



    return (
        <div class='z-0'>
            <div class="flex items-center justify-between px-4 py-2 bg-white shadow-md">
                <div class="text-lg font-semibold">Dashboard V2</div>
                <div class="relative">
                    <FaSearch class="absolute top-3 right-3 text-gray-400" />
                    <input type="text" onChange={
                        (e) => setSearch(e.target.value)
                    } placeholder="Search anything..." class="px-3 py-2 text-sm border border-gray-500 rounded-md" />
                </div>
                <div class="flex items-center space-x-4">
                    <button
                        onClick={openModal}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                    >
                        Add Widget
                    </button>

                    {isModalOpen && <AddWidgetModal onClose={closeModal} />}
                    <select class="px-3 py-2 text-sm border rounded-md">
                        <option>Last 7 days</option>
                        <option>Last 14 days</option>
                        <option>Last 30 days</option>
                    </select>
                </div>
            </div></div >
    )
}

export default Navbar