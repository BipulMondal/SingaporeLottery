import React, { useCallback, useEffect, useState } from "react";

import { useLocation, } from "react-router-dom";


// import Select from 'react-select';
import {

    addLiveUrl,

    fetchAllLiveUrl,
    getAllTime,

} from "../../Utils/AllApiCals";
import { toast } from "react-toastify";

import Loader from "../../Loader/Loader";



function LiveUrl() {
    const location = useLocation()


    const [liveurl, setLiveurl] = useState("");



    const [isLoading, setisLoading] = useState(true);
    const [allTime, setAllTime] = useState([]);
    const [isPresent, setisPresent] = useState(false);



    //table row and collumn


    const fetcallDrawTime = useCallback(async () => {
        try {
            let res = await getAllTime()
            if (res && res.status) {
                setAllTime(res.data)
            }
            console.log("timess", res);
        } catch (error) {
            console.log("errorrrrr", error);
        }
    }, []);

    // function isDateInFuture(dateString) {
    //     const [day, month, year] = dateString.split('-').map(Number);
    //     const inputDate = new Date(year, month - 1, day);
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0);
    //     inputDate.setHours(0, 0, 0, 0);
    //     return inputDate == today;
    // }



    //ValidationFunction

    const handleValidation = () => {
        if (!liveurl) {
            toast.error("Enter LiveUrl");
            return false;
        }




        return true;
    };







    function extractTime(input) {
        // Trim any leading or trailing whitespace
        let trimmedInput = input.trim();

        // Extract the time portion (excluding AM/PM)
        let timePart = trimmedInput.split(' ')[0];

        return timePart;
    }


    const handleSubmit = async () => {

        if (!handleValidation()) return;
        let Gname = allTime.filter((ele, id) => ele.game_name === location.state.row.game_name)
        console.log(Gname, "6666666")


        try {
            // const senddata = {
            //     gname: Gname[0].game_name,
            //     gdate: Gname[0].game_time,
            //     liveurl: liveurl
            // }
            console.log(liveurl, Gname[0].game_name, Gname[0].game_time, "lll")

            let res = await addLiveUrl(liveurl, Gname[0].game_name, location.state.row.game_date, extractTime(Gname[0]?.game_time));
            if (res) {
                toast.success("Data Added sucsessfully");
                setLiveurl("")
                fetchAllCategory();
            } else {
                if (res === 3) {
                    toast.error("Data Already Exist");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };


    // const fetchVideos = async () => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/fetch_youtubeUrl.php?game_type=Morning&game_date=24-08-2024`);
    //         const result = await response.json();
    //         console.log(result, "kkk")
    //         if (result.status) {

    //         } else {
    //             toast.error('Failed to fetch data');
    //         }
    //     } catch (err) {
    //         toast.error('An error occurred while fetching data');
    //     } finally {

    //     }
    // };
    // const getUniqueEntriesByDate = (data) => {
    //     // Create a Map to store unique dates
    //     const uniqueEntries = new Map();

    //     // Iterate over each entry in the data
    //     data.forEach(entry => {
    //         // Check if the date is already in the Map
    //         if (!uniqueEntries.has(entry.date)) {
    //             // If not, add it to the Map
    //             uniqueEntries.set(entry.date, entry);
    //         }
    //     });

    //     // Convert the Map values to an array
    //     return Array.from(uniqueEntries.values());
    // };

    const fetchAllCategory = useCallback(async () => {

        console.log(location.state.row.game_name,)

        try {
            setisLoading(true);
            console.log("previous")
            const res = await fetchAllLiveUrl(location.state.row.game_name, location.state.row.game_date);
            // const allutubeUrls=
            if (res.data[0].embededUrl) {
                setisPresent(true)
            }
            console.log(res.data[0].embededUrl, "oo890")
            setLiveurl(res.data[0].embededUrl)

            if (res) {



                setisLoading(false);
            } else {
                setisLoading(false);
            }
        } catch (err) {
            setisLoading(false);
            console.log(err);
        }
    }, [location,])






    useEffect(() => {
        // fetchVideos()
        fetchAllCategory();
        fetcallDrawTime()
    }, [fetchAllCategory, fetcallDrawTime]);




    return (
        <>
            {isLoading && <Loader />}
            <section className="mt-4">
                <div className="border-b-4 border-solid border-indigo-500 ">



                    <form class="bg-white p-6 rounded-lg shadow-md  mx-auto">
                        <label class="block mb-4">
                            <span class="text-gray-700 font-semibold">Live URL:</span>
                            <input
                                disabled={isPresent}
                                onChange={(e) => setLiveurl(e.target.value)}
                                type="text"
                                value={liveurl}
                                class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none transition duration-200 ease-in-out"
                                placeholder="Enter live URL"
                            />
                        </label>
                        {!isPresent && <button

                            onClick={(e) => { e.preventDefault(); handleSubmit() }}
                            class="w-[100px] bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out"
                        >
                            Submit
                        </button>}
                    </form>


                </div>

            </section>
        </>
    );
}

export default LiveUrl;
