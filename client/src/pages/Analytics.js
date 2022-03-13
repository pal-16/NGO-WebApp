import Api from "../utils/Api/Api.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import { useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import Popup from "../components/Popup/Popup";
import Input from "../components/Input";
import { getUserId } from "../utils/jwtUtil";


const UserCrowdfunding = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let sum=0
    Api.crowdfunding.getAllPosts().then((res) => {

        sum=res.data.data.allPosts.reduce((total, post)=>{
            return total+post.totalAmount;
        },0)
       
      });
      console.log(temp)
      setPosts(temp);
    });
    setIsLoading(false);
  }, []);

  return (
    <section className="text-gray-600 body-font lg:mx-10 sm:mx-2">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
