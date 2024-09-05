import React, { Suspense } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../LOADING/Loading";
import SkeletonComponent from "../SKELETON/CardSkeleton";
import CardSkeleton from "../SKELETON/CardSkeleton";

const SuspenseWrapper = ({ children }) => {
  const location = useLocation();

  
  const getFallback = () => {
    const routes = ["/rooms", "/room-detail", "/"]
    routes.some(route => route == location.pathname ? <CardSkeleton/> : <Loading /> )
  };

  return <Suspense fallback={getFallback()}>{children}</Suspense>;
};

export default SuspenseWrapper;