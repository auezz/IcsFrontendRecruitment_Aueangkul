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
    const [listAll, setListAll] = useState([]);
    const [categories, setCategories] = useState([]);
    const [resId, setResid] = useState(null);
    const [placeAPI, setPlaceAPI] = useState([]);
    const [width, setWidth]   = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    /*
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    */

    useEffect(()=>{
        const getListAll = async () =>{
            const data = await fetchListAll();
            console.log('listAll: ', data);
            setListAll(data);
        }
        
        getListAll();
    },[]);

    useEffect(()=>{
        const getRestaurant = async () =>{
            const data = await fetchRestaurant({pageSelect, searchText, resId});
            setRestaurant(data);
            console.log('data: ', data);
        }
        getRestaurant();
    },[pageSelect, searchText, resId]);

    const fetchRestaurant = async ({pageSelect, searchText, resId})=>{
        const resIdText = resId!==""?`&${resId}`:"";
        const res = await Axios.get(`http://localhost:5000/restaurant?_page=${pageSelect}${resIdText}&_limit=9&_sort=id&_order=asc`);
        const data = await res.data;
        setItemLength(res.headers["x-total-count"]);
        //setTotalGreetingList(res.headers["x-total-count"]);
        return data;
    }

    const fetchListAll = async()=>{
        const res = await Axios.get(`http://localhost:5000/restaurant`);
        const data = await res.data;
        return data;
    }

    const onPageChange = (page)=>{
        if(page===null){
            return;
        }
        setPageSelect(page);
    }

    const onSelectChange = (selectId)=>{
        console.log('selectId: ', selectId);
        const selectVal = selectId.target.value;
        console.log('selectVal: ', selectVal);
        if(selectVal!==0){
            console.log('checked');
            let list = [];
            listAll.forEach((item)=>{
                //console.log('item: ', item,'\n',item.categories.includes(selectVal));
                if(item.categories.includes(selectVal)===true){
                    list.push(item.id);
                }
            });
            //const listId = listAll.map(item=>item.categories.find(elm=>elm===selectVal));
            //const listId = listAll.find(item=>item.categories.includes(selectVal));
            //console.log('listId: ', list, list.join('&id='));
            setResid(`&id=${list.join('&id=')}`);

            
        }

    }

    const onSearch = (text, selectVal)=>{
        //setSearchText(text);
        
        if(text.length>0){
            console.log(text, selectVal);
            let list = [];
            let textLower = text.toLowerCase();
            listAll.forEach((item)=>{
                let resName = item.name.toLowerCase();
                if(item.categories.includes(selectVal)===true && resName.includes(textLower)===true){
                    list.push(item.id);
                }
            });
            if(list.length>0){
                setResid(`&id=${list.join('&id=')}`);
            }
            //console.log('list: ', list);
        }else{
            setResid(null);
        }
    }

    
    


    return (
        <div className="App">
            <Sidebar/>
            <Header/>
           <PageContent restaurant={restaurant} 
                itemLength={itemLength}
                currentPage={pageSelect}
                onPageChange={onPageChange}
                onSelectChange={onSelectChange}
                onSearch={onSearch}
            />
            

            

        </div>
    );
}

export default App;
