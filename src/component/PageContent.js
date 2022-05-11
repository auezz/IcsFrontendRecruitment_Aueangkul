import React from 'react'
import './PageContent.css';
import styled from 'styled-components';
import { FaSearch, FaCalendar, FaCircle, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function PageContent(props) {
    const { restaurant, itemLength, currentPage, onPageChange, onSelectChange, onSearch } = props;

    const resOpenTime = (operation_time) => {
        console.log('hello');
    }

    const CircleIcon = styled(FaCircle)`
        width: 11px;
        height: 11px;
        vertical-align: text-top;
    `;

    const PrevIcon = styled(FaAngleLeft)`
        width: 11px;
        height: 11px;
        color: #9E9E9E;
    `;

    const NextIcon = styled(FaAngleRight)`
        width: 11px;
        height: 11px;
        color: #9E9E9E;
    `;

    const onInputSearch = (e)=>{
        const text = e.target.value;
        const selectElem = document.getElementById('selectResType');
        const selectVal = selectElem.value;
        console.log(text, selectVal);
        onSearch(text, selectVal);
    }


    const Pagination = () => {
        const pageAmount = Math.round(itemLength / 9);
        console.log('pageAmount: ', pageAmount);
        return (
            <div className='pagination d-flex gap-3 mt-5'>
                <div className={`pagePrev ${currentPage>1?"":"page-disabled"}`}
                    onClick={() => {
                        onPageChange(currentPage>1?currentPage-1:null);
                    }}
                ><PrevIcon /></div>
                <div className="pagePrev">{currentPage}</div>
                <div className={`pageNext ${currentPage!==pageAmount?"":"page-disabled"}`}
                    onClick={() => {
                        onPageChange(currentPage!==pageAmount?currentPage+1:null);
                    }}>
                    <NextIcon />
                </div>
            </div>
        )
    }


    return (
        <div className='page-content'>
            <div className="content-body">
                <div className="page-head d-flex">
                    <div className="page-title">Place List</div>
                    <div className="page-input w-50 d-flex gap-5">
                        <select className="form-select" aria-label="Default select example"
                            id='selectResType'
                            onChange={(e)=>{
                                onSelectChange(e);
                            }}
                        >
                            <option value={0}>Open this select menu</option>
                            <option value="restaurant">Restaurant</option>
                            <option value="bakery">Bakery</option>
                            <option value="cafe">Cafe</option>
                        </select>
                        <div className="input-group flex-nowrap">
                            <input type="text"
                                className="form-control"
                                placeholder="Search name..." aria-label="Username" aria-describedby="addon-wrapping" 
                                onChange={(e)=>{
                                    onInputSearch(e);
                                }}
                                />
                            <span className="input-group-text" id="addon-wrapping"><FaSearch /></span>
                        </div>
                    </div>
                </div>
                <div className="restaurant-content row">
                    {
                        restaurant.map((item, index) => (
                            //(Number.isInteger((index+1)/3)?<div className='row'>:"";
                            <div className='card col-4'>
                                <div className="card-head d-flex gap-3">
                                    <img className='w-25' src={item.profile_image_url} alt="" />
                                    <div className="res-info w-75">
                                        <h6 className='res-name'>{item.name}</h6>
                                        <div className="res-subinfo d-flex gap-3">
                                            <p className="res-time d-flex gap-2 mb-0">
                                                <FaCalendar />
                                                {((item) => {
                                                    const getTime = item.operation_time.find(item => item.time_open !== "closed" && item.time_close !== "closed");
                                                    return <div>{getTime.time_open} AM - {getTime.time_close} PM</div>
                                                })(item)
                                                }
                                            </p>
                                            <p className="res-rating d-flex gap-2 mb-0">
                                                <CircleIcon />
                                                <p className='mb-0'>{item.rating - Math.floor(item.rating) === 0 ? `${item.rating}.0` : item.rating}</p>
                                            </p>
                                        </div>
                                    </div>

                                </div>
                                <div className="res-pic d-flex">
                                    {
                                        item.images.map((image, index) => (
                                            <img src={image} />
                                        ))
                                    }
                                </div>
                            </div>
                            

                        ))

                    }
                </div>
                <Pagination />
            </div>

        </div>
    )
}
