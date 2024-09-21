import React, { useCallback, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

// import Select from 'react-select';
import {
  addCategory,
  deleteCategory,
  viewAllCategory,
} from "../../Utils/AllApiCals";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Loader from "../../Loader/Loader";

const initialState = {
  DrawNo: "",
  preDigit: "",
  series: "",
  firstPrize: "",
  spin_time: "",
};

function Category({ gameTime }) {
  const [fromdata, setfromdata] = useState(initialState);
  // const [isEdit, setisEdit] = useState(false)
  // const [editableId, setEditableId] = useState(null)
  const [categorydata, setCategoryData] = useState([]);
  const [isModal, setisModal] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  // const [totalrowCount, setTotalRow] = useState(true);
  const navigate = useNavigate();

  //table row and collumn9---
  const columns = [
    {
      name: "Id",
      selector: (row) => row.sl,
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "100px",
        maxWidth: "100px",
        minWidth: "100px",
      },
      wrap: true,
    },
    {
      name: "Game_date",
      selector: (row) => row.game_date,
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "200px",
        maxWidth: "200px",
        minWidth: "200px",
      },
      wrap: true,
    },
    {
      name: "Game_name",
      selector: (row) => row.game_name,
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "150px",
        maxWidth: "150px",
        minWidth: "150px",
      },
      wrap: true,
    },
    {
      name: "Result_value",
      selector: (row) => row.result_value,
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '80px',
        maxWidth: '80px',
        minWidth: '80px',
      },
      wrap: true,
    },

    {
      name: "First Digit",
      selector: (row) => row.first_digit,
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '80px',
        maxWidth: '80px',
        minWidth: '80px',
      },
      wrap: true,
    },
    {
      name: "Second Digit",
      selector: (row) => row.second_digit,
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: '80px',
        maxWidth: '80px',
        minWidth: '80px',
      },
      wrap: true,
    },
    {
      name: "Live Url",
      selector: (row) => {
        console.log("noon", row);
        return (
          <div className="w-[400px] overflow-scroll">
            <button
              onClick={(e) => {
                navigate(`/liveurl/${row.game_name}`, { state: { row } });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded"
            >
              liveUrl
            </button>
          </div>
        );
      },
      style: {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: "120px",
        maxWidth: "120px",
        minWidth: "120px",
      },
      wrap: true,
    },

    {
      name: "Action",
      selector: (row) => {
        console.log("noon", row);
        return (
          <div className="w-[400px] overflow-scroll">
            <button
              onClick={() => {
                handleDelete(row.id);
              }}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
            <button
              onClick={(e) => {
                navigate(`/frontendView/${row.game_name}`, { state: { row } });
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-1 rounded"
            >
              view
            </button>
          </div>
        );
      },
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setfromdata({ ...fromdata, [name]: value });
  };

  //ValidationFunction

  const handleValidation = () => {
    if (!fromdata.DrawNo) {
      toast.error("Enter DrawNo");
      return false;
    }
    if (!fromdata.preDigit) {
      toast.error("Enter PreDigit");
      return false;
    }

    if (fromdata.preDigit) {
      if (fromdata.preDigit >= 30 && fromdata.preDigit <= 45) {
        return true;
      } else {
        toast.error("Enter PreDigit between 30 to 45");
        return false;
      }
    }

    if (!fromdata.series) {
      toast.error("Enter Series");
      return false;
    }

    if (fromdata.series) {
      console.log(fromdata.series, "ooo");
      const seirs = fromdata.series.toUpperCase();
      if (
        seirs === "A" ||
        seirs === "B" ||
        seirs === "C" ||
        seirs === "D" ||
        seirs === "E" ||
        seirs === "G" ||
        seirs === "H" ||
        seirs === "J" ||
        seirs === "K" ||
        seirs === "L"
      ) {
        return true;
      } else {
        toast.error("Only (A,B,C,D,E,G,H,J,K,L) can be entered");

        return false;
      }
    }
    if (!fromdata.firstPrize) {
      toast.error("Enter FirstPrize");
      return false;
    }
    if (!fromdata.firstPrize.length === 5) {
      toast.error("Enter 5digit FirstPrize");
      return false;
    }

    return true;
  };

  // function getRandomDateIn2022() {
  //   // Start and end dates for 2022
  //   const startOf2022 = new Date("2022-01-01T00:00:00Z");
  //   const endOf2022 = new Date("2022-12-31T23:59:59Z");

  //   // Generate a random timestamp within the range
  //   const randomTimestamp =
  //     startOf2022.getTime() +
  //     Math.random() * (endOf2022.getTime() - startOf2022.getTime());

  //   // Create a new Date object with the random timestamp
  //   return new Date(randomTimestamp);
  // }

  function getCurrentDateFormatted() {
    // Get the current date
    const now = new Date();
    // const now = getRandomDateIn2022();

    // Extract day, month, and year
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = now.getFullYear();

    // Format the date as 'dd-mm-yyyy'
    const formattedDate = `${day}-${month}-${year}`;
    console.log(formattedDate, "iii");
    return formattedDate;
  }

  const handleSubmit = async () => {
    const currentDate = getCurrentDateFormatted();
    if (!handleValidation()) return;
    try {
      const paramsobj = {
        gameTime: gameTime,
        drawno: fromdata.DrawNo,
        firstPrize: fromdata.firstPrize,
        predigit: fromdata.preDigit,
        seriesNo: fromdata.series.toUpperCase(),
        currentDate: currentDate,
      };

      console.log("iiiiiii00000", paramsobj);
      let res = await addCategory(paramsobj);
      if (res) {
        console.log(res, "lll");
        toast.success("Data Added sucsessfully");
        setfromdata(initialState);
        setisModal(false);
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

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        (async () => {
          let res = await deleteCategory(id);
          if (res && res.status) {
            fetchAllCategory();
            toast.success(res.message);
          }
        })();
      } else {
      }
    });
  };

  const fetchAllCategory = useCallback(async () => {
    try {
      // let dataToSend = {
      //     // input_date: '2024-08-13',
      //     game_time: gameTime
      // }

      setisLoading(true);
      const res = await viewAllCategory(gameTime);

      if (res) {
        const newArr = res?.map((ele, id) => {
          console.log("ele", ele);
          return {
            sl: id + 1,
            game_date: ele?.game_date,
            game_name: ele?.game_name,
            result_value: ele?.result_value,
            first_digit: ele?.first_digit,
            second_digit: ele.second_digit,
            type: ele?.type,
            id: ele?.id,
            spin_time: ele?.spin_time,
          };
        });
        setCategoryData(newArr);
        setisLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [gameTime]);

  useEffect(() => {
    fetchAllCategory();
  }, [fetchAllCategory]);

  return (
    <>
      {isLoading && <Loader />}
      <section className="mt-4">
        <div className="border-b-4 border-solid border-indigo-500 ">
          <div className="">
            <button
              type="submit"
              onClick={() => {
                setisModal(true);
              }}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right"
            >
              Add new Category
            </button>
          </div>
          {/* <form class="flex justify-between items-center gap-1 w-800 mx-auto p-1 border border-gray-300 rounded-lg shadow-md">
            <div className="flex gap-4">
              <label class="flex flex-col w-40 font-semibold text-gray-800">
                Text Input:
                <input
                  type="text"
                  class="mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </label>
              <label class="flex flex-col w-40 font-semibold text-gray-800">
                Date Input:
                <input
                  type="date"
                  class="mt-1 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </label>
            </div>
            <label class="flex flex-col w-40 font-semibold text-gray-800">
              <button
                type="submit"
                onClick={() => {
                  setisModal(true);
                }}
                class="text-white w-20 h-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right"
              >
                Search
              </button>
            </label>
          </form> */}
          <DataTable
            columns={columns}
            data={categorydata}
            pagination
            responsive={true}

            // progressPending={isLoading}

            // paginationServer
            // paginationTotalRows={totalrowCount}
            // onChangePage={fetchAllCategory}
            // noRowsPerPage={true}
          />
        </div>

        {/*Model from*/}
        {isModal && (
          <div className="modal_main">
            <div className="modelcss">
              <span>Set Golden Result {gameTime} </span>
              <span
                onClick={() => {
                  setisModal(false);
                }}
                className="float-right cursor-pointer text-red-900"
              >
                Close
              </span>
              <form class="max-w-[54rem]  mx-auto m-t-[4rem] ">
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Game Name
                  </label>
                  <input
                    type="email"
                    id="email"
                    disabled="true"
                    name="categoryName"
                    value={gameTime}
                    placeholder="Morning"
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Draw No
                  </label>
                  <input
                    type="number"
                    id="email"
                    onChange={handleChange}
                    name="DrawNo"
                    value={fromdata.DrawNo}
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Pre Digit(30 to 45)
                  </label>
                  <input
                    type="number"
                    id="password"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    name="preDigit"
                    value={fromdata.preDigit}
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="repeat-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    SERIES(A,B,C,D,E,G,H,J,K,L)
                  </label>
                  <input
                    type="text"
                    id="repeat-password"
                    onChange={handleChange}
                    name="series"
                    value={fromdata.series.toUpperCase()}
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="repeat-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Prize
                  </label>
                  <input
                    type="number"
                    id="firstPrize"
                    onChange={handleChange}
                    name="firstPrize"
                    value={fromdata.firstPrize}
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div class="mb-5">
                  <label
                    for="repeat-password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Rotation Time
                  </label>
                  <input
                    type="number"
                    id="spin_time"
                    onChange={handleChange}
                    name="spin_time"
                    value={fromdata.spin_time}
                    class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();

                    handleSubmit();
                  }}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default Category;
