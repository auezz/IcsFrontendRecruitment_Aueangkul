import './App.css';
import Axios from 'axios';
import Header from './component/Header';
import Sidebar from './component/Sidebar';
import PageContent from './component/PageContent';
import { useEffect, useState } from 'react';
function App() {

    const [restaurant, setRestaurant] = useState([]);
    const [pageSelect, setPageSelect] = useState(1);
    const [itemLength, setItemLength] = useState(null);
    const [searchText, setSearchText] = useState(null);

    useEffect(()=>{
        const getRestaurant = async () =>{
            const data = await fetchRestaurant({pageSelect, searchText});
            setRestaurant(data);
            console.log('data: ', data);
        }
        getRestaurant();
    },[pageSelect, searchText]);

    const fetchRestaurant = async ({pageSelect, searchText})=>{
        const res = await Axios.get(`http://localhost:5000/restaurant?_page=${pageSelect}&_limit=9&_sort=id&_order=asc`);
        const data = await res.data;
        setItemLength(res.headers["x-total-count"]);
        //setTotalGreetingList(res.headers["x-total-count"]);
        return data;

    }

    const onPageChange = (page)=>{
        setPageSelect(page);
    }

    const onSearch = (text)=>{

    }

    
    


    return (
        <div className="App">
            <Sidebar/>
            <Header/> 
            <PageContent restaurant={restaurant} 
                        itemLength={itemLength}
                        currentPage={pageSelect}
                        onPageChange={onPageChange}
                        >

            </PageContent>
            

        </div>
    );
}

export default App;
