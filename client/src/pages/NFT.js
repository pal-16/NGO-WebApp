import Api from "../utils/Api/Api.js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import Loader from "../components/Loader/Loader";
import { useParams } from "react-router-dom";

const NFT = () => {
  const { nftId } = useParams();
  const [nft, setNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const toastElement = toast.loading("Fetching Tokens");
      try {
        const response = await Api.crowdfunding.getNFT(nftId);
        const { data } = response.data;
        toast.update(toastElement, {
          render: "NFT Fetched",
          type: "success",
          isLoading: false,
          autoClose: true,
        });
        setNFT(data.nft);
        setIsLoading(false);
        console.log(data.nft);
      } catch (error) {
        responseErrorHandler(error, toastElement);
      }
    };
    return init();
  }, [nftId]);

  return isLoading ?
    <Loader /> : (
      <>
        {JSON.toString(nft)}
      </>
    )
}

export default NFT;