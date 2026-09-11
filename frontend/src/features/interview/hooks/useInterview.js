import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  interviewUser,
  reportUser,
  getAllReportUser,
  generatedResumePdfUser,
} from "../state/interviewAction";




export const useInterview = () => {
  const {
    error,
    isLoading,
    interviewData,
  } = useSelector((state) => state.interview);
  
   
  const dispatch = useDispatch();

  const interviewByUser = useCallback(
    (data) => {
      return dispatch(interviewUser(data)).unwrap();
    },
    [dispatch]
  );

  const reportByUser = useCallback(
    (data) => {
      return dispatch(reportUser(data)).unwrap();
    },
    [dispatch]
  );

  const getAllReportByUser = useCallback(
    () => {
      return dispatch(getAllReportUser());
    },
    [dispatch]
  );

  const generatedResumePdfByUser  = useCallback((data)=>{
    return dispatch(generatedResumePdfUser(data)).unwrap();
  },[dispatch])


  return {
    isLoading,
    error,
    interviewData,
    interviewByUser,
    reportByUser,
    getAllReportByUser,
    generatedResumePdfByUser
  };
};

 