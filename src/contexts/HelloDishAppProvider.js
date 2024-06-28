import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { GetList_Data,Delete_Data,Activate_Agent, Update_FormData, UpdateStatusApproveAndReject, Update_Data, Insert_Data } from '../api/HelloDishAppAPI.js';
import { useAuth } from './auth.js';
import { UNSAFE_useScrollRestoration } from 'react-router-dom/dist/index.js';

function HelloDishAppProvider(props) {
    const [loading, setLoading] = useState(true);
    const { signOut } = useAuth()

    const GetListData = async (url) => {
        const result = await GetList_Data(url);

        if (!result.isOk) {
            if (result.statusCode === 400 || result.statusCode === 401 || result.statusCode === 500) {
                signOut();
            }
        }
        return result;
    }; 

    const DeleteData = async (url) => {
        const result = await Delete_Data(url);
        if (!result.isOk) {
          if (result.statusCode === 401 || result.statusCode === 500) {
                signOut();
            }
        }
        return result;

    };

     const ActivateAgent = async (url, dataObj) => {
        const result = await Activate_Agent(url, dataObj);
        if (!result.isOk) {
            if (result.statusCode === 401 || result.statusCode === 500) {
                signOut();
            }
        }
        return result;

    };

     const UpdateStatusApproveAndRejectStatus = async (url) => {
        const result = await UpdateStatusApproveAndReject(url);
        if (!result.isOk) {
            if (result.statusCode === 401 || result.statusCode === 500) {
                signOut();
            }
        }
        return result;
    };

    const InsertData = async (url, dataObj) => {
        const result = await Insert_Data(UNSAFE_useScrollRestoration, dataObj);
        if (!result.isOk) {
            if (result.statusCode === 401 || result.statusCode === 500) {
                signOut();
            }
        }
        return result;
    };

    const UpdateData = async (url, dataObj) => {
        const result = await Update_Data(url, dataObj);
        if (!result.isOk) {
            if (result.statusCode === 401 || result.statusCode === 500) {
                signOut();
            }
        }
        return result;

    };
    const UpdateFormData = async (url, dataObj) => {
        const result = await Update_FormData(url, dataObj);
        if (!result.isOk) {
            if (result.statusCode === 401 || result.statusCode === 500) {
                signOut();
            }
        }
        return result;

    };


    return (
        <HelloDishAppContext.Provider value={{ GetListData, DeleteData, ActivateAgent, UpdateFormData, UpdateStatusApproveAndRejectStatus , InsertData, UpdateData, loading }} {...props} />
    );
}

const HelloDishAppContext = createContext({ loading: true });
const useHelloDishApp = () => useContext(HelloDishAppContext);

export { HelloDishAppProvider, useHelloDishApp }