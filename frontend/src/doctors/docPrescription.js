import React, {useEffect,useContext, useState} from 'react';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../shared/hooks/useHttpClient';
import ErrorModal from '../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../shared/components/UIElements/LoadingSpinner';
import PrescriptionList from './PrescriptionList';
import { AuthContext } from '../shared/util/AuthContext';

const DocPrescription = () =>{
  const auth = useContext(AuthContext);
const { isLoading, error, sendRequest, clearError } = useHttpClient();

const [ loadedpres, setLoadedPres] = useState();
const userId= auth.userId;

useEffect(()=> {
  const fetchPlaces = async() =>{
    try{
      const responseData = await sendRequest(
      `https://localhost:5000/api/places/users/${userId}/docprescription`
      );
      setLoadedPres(responseData.Prescriptions);
    }
    catch(err)
    {}
  };
    fetchPlaces();
  
}, [sendRequest, userId]);



return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
     {isLoading && (<div className="center">  <LoadingSpinner  /></div>)}
  {!isLoading &&loadedpres && <PrescriptionList items={loadedpres}  />}
  </React.Fragment>
  );
  

};
export default DocPrescription;