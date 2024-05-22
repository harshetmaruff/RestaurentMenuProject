import React, { useEffect, useState } from "react";
import "./Menu.css"
import { useParams, Link } from "react-router-dom";
import CategoryButtons from "../CategoryButton/Button";

function Menu() {
    //Constants to hold the link
    const link = "https://nutricurate.kappa.websitestore.in/api/menu/";
    const { menuId } = useParams();
    const totalLink = link + menuId;
    //Constants to hold the values of menus
    const [MenuData, setMenu] = useState();
    const [MenuItems, setItems] = useState();

    //Constant for Search Data
    const [search, setSearch] = useState();

    //Constant for Filter category
    const [filter, setFilter] = useState("all");
    const [Category, setCategories] = useState(); //Categories
    
    useEffect(() => {

        fetchData();
        fetchMenuData();
        fetchCategories();
    }, [totalLink]);


    //Fetching the Menu Name and it Description
    const fetchData = async () => {
        const request = await fetch(totalLink);
        const jsonData = await request.json();
        
        setMenu(jsonData)
    }


    //Getting the Menu Items
    const fetchMenuData = async () => {
        const request = await fetch(totalLink + "/items");
        const jsonData = await request.json();
        setItems(jsonData);
    }


    //Fetch the Categories of the given Menu
    const fetchCategories = async () => {
        const request = await fetch(totalLink + "/categories");
        const jsonData = await request.json();

        setCategories(jsonData)
    }

    //function to set the filter value to filter menu Items
    const FilterItems = (val) => {
        setFilter(val);
    }

    return(
        <div>
            <div className="title">
                <h1>{MenuData?.name} Menu</h1>
            </div>
            <form action="" className="SearchBar">
                <input type="text" placeholder="Search Dish.." className="Bar" onChange={(e) => setSearch(e.target.value)}/>
            </form>
            <div className="Buttons">
            {Category?.map((object) => {
                return(
                <CategoryButtons SetFilter = {FilterItems} Name = {object.name}/>
                )
            })}
                <CategoryButtons SetFilter = {FilterItems} Name = {"All"}/>
            </div>
            <div className="menu">
            {MenuItems?.filter((object) => {
                if(filter.toLowerCase() != "all") {
                    return object.category.toLowerCase().includes(filter.toLowerCase())
                }
                else {
                    return object
                }
            }).filter((object) => {
                if(search) {
                return object.name.toLowerCase().includes(search.toLowerCase())
                }
                else {
                    return object
                }
            }).map((object) => {
                return(
                    <div className="single-menu" key={object.id}>
                        <Link to={String(object.id)}><img src={object.media_url} alt="" width={'150px'} height={'150px'}/></Link>
                        <div className="menu-content">
                            <div className="content-title">
                            <h4>{object.name} </h4><h4 className="price">₹{object.price}</h4>
                            </div>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae aliquam a quo libero dolorum reprehenderit suscipit, fuga optio debitis sint, quisquam accusantium sed at esse!</p>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>
    );
}

export default Menu;