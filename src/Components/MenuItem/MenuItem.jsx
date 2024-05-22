import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import './MenuItem.css'

function MenuItem() {
    const { itemId } = useParams();
    const { menuId } = useParams();
    const link = "https://nutricurate.kappa.websitestore.in/api/menu/";
    const totalLink = link + menuId + "/item/" + itemId

    const [ItemDetail, setItem] = useState();
    const history = useNavigate();

    //To get Item details
    useEffect(() => {
        fetchItemData();
    }, [totalLink])

    const fetchItemData = async () => {
        const request = await fetch(totalLink);
        const jsonData = await request.json();

        setItem(jsonData);
    }

   

    return(
        <>
        <div className="Container">
            <div className="item">
                <img src={ItemDetail?.media_url} alt="" />
            </div>
            <div className="Aside">
                <div className="Header">
                <h2>Name: {ItemDetail?.name} <span className="price">₹{ItemDetail?.price}</span></h2>
                </div>
                <div className="description">
                    {ItemDetail?.name} in a restaurant is more than just a meal; its an experience that engages all the senses. From the moment you walk in, the ambiance sets the stage for your dining journey. Whether it's the comforting aroma of freshly baked bread, the sizzle of a steak on the grill, or the vibrant colors of a perfectly plated dish, every element is designed to entice and delight.
                </div>
                <div className="info">
                    <div className="content">
                        <h3 className="display-inline">Diet: </h3> <p className="display-inline">{ ItemDetail?.diet.type} <img src={ItemDetail?.diet.icon}  alt="" width={"16px"} className="image"/></p>
                        <br />
                        {ItemDetail?.allergens.length > 0 && (
                            <h3 className="display-inline">Allergens: </h3>
                        )}
                    
                        {
                        ItemDetail?.allergens.map((obj) => {
                        
                            return(
                            <>
                            <p className="display-inline">{ obj.name } <img src={obj.icon_url}  alt="" width={"16px"} className="image"/></p>
                            <br />
                            </>
                            )
                            })}
                    </div>
                    
                </div>
            </div>
            <div className="Labels">
                <img src={ItemDetail?.label_url} alt="" />
            </div> 
        </div>
        <div className="center">
        <button onClick={() => history(-1)} className="BackButton">Back</button>
        </div>
        </>
    );
}

export default MenuItem