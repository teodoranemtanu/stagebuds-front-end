import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {useHttpClient} from "./http-hook";

export const useDisplayProfileData = (userId) => {
    const {sendRequest} = useHttpClient();
    const auth = useContext(AuthContext);
    const [profileData, setProfileData] = useState({});
    const [userData, setUserData] = useState({});
    const [displayData, setDisplayData] = useState({});

    useEffect(() => {
        const getProfileData = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/profiles/${userId}`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setProfileData(response);
            } catch (e) {
                console.log(e);
            }
        };
        const getUserData = async () => {
            try {
                const response = await sendRequest(`http://localhost:5000/api/users/${userId}`,
                    'GET', null,
                    {
                        "Authorization": 'Bearer: ' + auth.token
                    });
                setUserData(response);
            } catch (e) {
                console.log(e);
            }
        };
        getUserData();
        getProfileData();
    }, [auth.token, sendRequest, userId]);


    useEffect(() => {
        setDisplayData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            profilePicture: userData.profilePicture,
            description: profileData.description,
            bands: profileData.bands,
            genres: profileData.genres,
            concerts: profileData.concerts
        });
    }, [userData, profileData, setDisplayData]);

    return displayData;
};
