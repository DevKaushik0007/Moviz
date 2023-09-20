import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";

import useFetch from '../../../hooks/useFetch';
import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const [background, setBackfround] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);

    const {data, loading} = useFetch("/movie/upcoming");
    useEffect(() => {
        const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackfround(bg);
    }, [data])

    const searchQueryHandler = (event) =>{
        if(event.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`);
        }
    };
  return (
    <div className="heroBanner">
       { !loading && <div className="backdrop-img">
            <Img src={background }/>
        </div>}

        <div className="opacity-layer"></div>

        <ContentWrapper>
            <div className="heroBannerContent">
              <span className="title">Welcome to Moviz</span>
              <span className="subTitle">Are you ready to embark on a thrilling journey through the captivating world of movies? Look no further – you've arrived at the ultimate destination for all things cinematic.
              Explore now.
              </span>
              <div className="searchInput">
                <input type="text"
                placeholder="Stranger Things" 
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}/>
                <button>Search</button>
              </div>
            </div>
        </ContentWrapper>

    </div>
  )
}

export default HeroBanner;