import React from 'react';
import './Header.css';
export default function Header() {
  return (
    <div className='page-header'>
        <div className="web-icon d-none">
            <img src="./img/image 3.png" alt="" />
        </div>
        <div className="header-content">
            <div className="d-flex gap-3">
                <div className="user-noti me-3">
                    <img src="/img/Vector.png" alt="" />
                </div>
                <div className="user-picture">
                    <img src="/img/Rectangle 296.png" alt="" />
                </div>
                <div className="user-name">
                    Akkarapol
                </div>

            </div>
        </div>

    </div>
  )
}
