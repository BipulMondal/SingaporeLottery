import React, { useCallback, useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

// import Select from 'react-select';
import { toast } from 'react-toastify';
import { addService, deleteService, fetchSingleService, getAllUnits, UpdateService, viewAllCategory, viewAllService } from '../../Utils/AllApiCals';
import Swal from 'sweetalert2';

const initialState = {
    category: null,
    subCategory: "",
    price: "",
    unit: null,
    // status: true,

}

function SubCategory() {
    const [fromdata, setfromdata] = useState(initialState)
    const [isEdit, setisEdit] = useState(false)
    const [serviceData, setserviceData] = useState([])
    const [isModal, setisModal] = useState(false)
    // const [isLoading, setisLoading] = useState(false)
    // const [totalRow, setTotalRow] = useState(10)
    const [editableId, setEditableId] = useState(null)
    const [catData, setcatData] = useState(null)
    const [unitData, setunitData] = useState(null)
    // const [catcount, setcatcount] = useState(1);



    const navigate = useNavigate()

    //react select..


    const getCategoryData = async (page) => {
        // setcatcount(catcount + 1)
        const res = await viewAllCategory(page)
        if (res && res.success) {


            const catoption = res.data.map(ele => { return ({ value: ele.category_id, label: ele.name }) })
            console.log(catoption, "00999")
            setcatData(catoption)
        }


    }

    const getUnitData = async () => {

        const res = await getAllUnits()
        if (res && res.success) {
            const catoption = res.data.map(ele => { return ({ value: ele.unit_id, label: ele.unit_name }) })
            console.log(catoption, "00999")
            setunitData(catoption)
        }

    }

    //table row and collumn
    const columns = [
        {
            name: 'Id',
            selector: row => row.sl,
        },
        {
            name: 'Category',
            selector: row => row.catname,
        },

        {
            name: 'subCategory Name',
            selector: row => row.subcatName,
        },
        {
            name: 'Price',
            selector: row => row.type,
        },
        {
            name: 'Unit',
            selector: row => row.unit,
        },

        {
            name: 'Action',
            selector: row => {
                return (
                    <div className='w-[300px]'>
                        <button onClick={() => {
                            handleEdit(row.sl)
                        }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                        <button onClick={() => {
                            handleDelete(row.sl)
                        }} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
                            Delete
                        </button>
                    </div>)

            }
        },
    ];


    const handleChange = (e) => {

        console.log(e.target)
        const { name, value } = e.target;
        setfromdata({ ...fromdata, [name]: value });
    }

    const handleValidation = () => {
        console.log(fromdata, "validation")
        if (!fromdata.category) {
            toast.error("Select Category Name")
            return false
        }
        if (!fromdata.subCategory) {
            toast.error("Enter SubCategory Name")
            return false
        }
        if (!fromdata.price) {
            toast.error("Enter Price")
            return false
        }

        if (!fromdata.unit) {
            toast.error("Enter Unit")
            return false
        }



        return true
    }

    const handleSubmit = async () => {
        if (!handleValidation())
            return;
        const obj1 = {
            service_name: fromdata.subCategory,
            price: fromdata.price,
            unit_id: fromdata.unit,
            category_id: fromdata.category,
            // isActive: fromdata.status === "true" ? 1 : 0,
        };

        let res = await addService(obj1)
        if (res && res.success) {
            toast.success("Category Added sucsessfully")
            setfromdata(initialState);
            setisModal(false)
            fetchAllSubCategory(1)
        } else {
            toast.error(res.message)
        }

    }


    const handleEdit = async (id) => {
        setEditableId(id)
        let res = await fetchSingleService(id)
        if (res && res.success) {
            console.log(res)
            const obj1 = {
                category: res.data?.category_id,
                subCategory: res.data?.service_name,
                price: res.data?.price,
                unit: res.data.unit_id
            };
            setfromdata(obj1)
            setisModal(true)
            setisEdit(true)
        }
    }

    const handleUpdate = async () => {
        if (!handleValidation())
            return;
        const editObj = {
            service_name: fromdata.subCategory,
            price: fromdata.price,
            unit_id: fromdata.unit,
            category_id: fromdata.category,
            // isActive: fromdata.status === "true" ? 1 : 0,
        };
        console.log(fromdata, "update888")
        alert("no")
        const res = await UpdateService(editableId, editObj)
        if (res && res.success) {

            toast.success(res.message)
            fetchAllSubCategory(1);
            setisModal(false)
        }
    }

    const handleDelete = async (id) => {


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                (async () => {
                    let res = await deleteService(id);
                    if (res && res.success) {
                        fetchAllSubCategory(1);
                        toast.success(res.message);
                    }
                })();
            } else {
            }
        });

    }

    //fetching Category  

    const fetchAllSubCategory = useCallback(async (page) => {

        // setisLoading(true)
        const res = await viewAllService(page)
        console.log(res, "uuu")
        // setTotalRow(res.total)
        if (res && res.success) {
            const resarr = res.data.map((ele) => {
                return ({
                    sl: ele.service_id,
                    catname: ele.category_name,
                    subcatName: ele.service_name,
                    type: ele.price,
                    unit: ele.unit_name,
                    subCat: <button className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded" onClick={(e) => { navigate("/subCategory") }}>SubService</button>,
                    // status: ele.isActive === 1 ? "true" : "false",

                }

                )
            })
            setserviceData(resarr)
            // setisLoading(false)

        }



    }, [])


    useEffect(() => {
        fetchAllSubCategory(1)
        getCategoryData(1)
        getUnitData()

    }, [fetchAllSubCategory])


    return (
        <section>



            <div className='border-b-4 border-solid border-indigo-500 pt-[3rem]'>
                <div>
                    <button type="submit" onClick={() => {

                        setisModal(true)

                    }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right">Add new Category</button></div>

                <DataTable
                    columns={columns}
                    data={serviceData}
                />
            </div>
            {isModal &&

                <div className='modelcss'>
                    <span onClick={() => { setisModal(false) }} className='float-right cursor-pointer text-red-400'>Close</span>
                    <form class="max-w-[54rem]  mx-auto ">

                        <div class="mb-5" >
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>

                            <select onChange={handleChange} name="category" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                {catData.map((ele) => {
                                    <option>--Select--</option>
                                    return (<option value={ele.value} selected={ele.value === fromdata.category}>{ele.label}</option>)
                                })}
                            </select>
                        </div>

                        <div class="mb-5">
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SubCategory Name</label>
                            <input type="text" id="email" onChange={handleChange} name='subCategory' value={fromdata.subCategory} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>




                        <div class="mb-5" >
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Unit</label>

                            <select onChange={handleChange} name="unit" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" >
                                {unitData.map((ele) => {
                                    <option disabled={true}>--Select--</option>
                                    return (<option value={ele.value} selected={ele.value === fromdata.unit}>{ele.label}</option>)
                                })}
                            </select>
                        </div>

                        <div class="mb-5">
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" id="password" onChange={handleChange} name='price' value={fromdata.price} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        {/* <div class="mb-5"> */}
                        {/* <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                            <input type="number" id="repeat-password" onChange={handleChange} name="position" value={fromdata.position} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                        </div>
                        <div class="mb-5 flex gap-3">
                            <label for="status-on" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>
                            <input type="radio" id="status-on" name="status" onChange={handleChange} value={true} checked={fromdata.status === "true"} /> ON
                            <input type="radio" id="status-off" name="status" onChange={handleChange} value={false} checked={fromdata.status === "false"} /> OFF
                        </div> */}


                        <button type="submit" onClick={(e) => {
                            setisModal(false)
                            e.preventDefault();
                            if (isEdit)
                                handleUpdate()
                            else
                                handleSubmit()

                        }} class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 relative float-right">{isEdit ? "Edit" : "Add"}</button>
                    </form>
                </div>}

        </section>



    )
}

export default SubCategory