import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
//import { getAllProducts } from "../api/ProductAPI"


interface Props {}

const ResourcePage = (props: Props)=>{

    return(
        <>
        <h1>Layout Principal</h1>
        <div>
            <div>
                <button>
                <Link to="/pipeline"><a>Pipeline</a></Link>
                </button> 
            </div>

            <div>
                <button>
                <Link to="/bench"><a>Bench</a></Link>
                </button> 
            </div>

            <div>
                <button>
                <Link to="/billing"><a>Billing</a></Link>
                </button> 
            </div>
        </div>
        </>
    );

}

export default ResourcePage;