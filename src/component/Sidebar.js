import React from 'react'
import './Sidebar.css'
import { FaList } from 'react-icons/fa';
export default function Sidebar() {
    
    return (
        <div className='side-bar'>
            <div className="d-flex flex-column">
                <div className="img-logo">
                    <img src="/img/image 3.png" alt="" />
                </div>
                <div className="menu-section d-flex flex-column">
                    <button className='btn-place'><FaList/></button>
                    <p className='mt-2 mb-0 fw-bold'>Place</p>
                </div>
            </div>
        </div>
    )
}
