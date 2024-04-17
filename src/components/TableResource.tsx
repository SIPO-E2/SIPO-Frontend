

const TableResource = () => {
    return(
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID</th>
                    <th scope="col" className="px-6 py-3"> Name</th>
                    <th scope="col" className="px-6 py-3">Employee Status </th>
                    <th scope="col" className="px-6 py-3">Job Title </th>
                    <th scope="col" className="px-6 py-3">Job Grade</th>
                    <th scope="col" className="px-6 py-3">Date of Joining </th>
                    <th scope="col" className="px-6 py-3">Division</th>
                    <th scope="col" className="px-6 py-3">Tech Stack</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr className="border-b dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        1
                    </th>
                    <td className="px-6 py-4">
                        Mariana García Gómez
                    </td>
                    <td className="px-6 py-4">
                        Billing
                    </td>
                    <td className="px-6 py-4">
                        Developer
                    </td>
                    <td className="px-6 py-4">
                        C2
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
                    </td>
                    <td className="px-6 py-4">
                        Mexico
                    </td>
                    <td className="px-6 py-4">
                        JavaScript
                    </td>
                    <td className="px-6 py-4">
                        <button className='btn btn-sm btn-primary'>View</button>
                        <button className='btn btn-sm btn-primary'>Edit</button>
                        <button className='btn btn-sm btn-danger'>Delete</button>  
                    </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        2
                    </th>
                    <td className="px-6 py-4">
                        Guillermo Valdez Contreras
                    </td>
                    <td className="px-6 py-4">
                        Billing
                    </td>
                    <td className="px-6 py-4">
                        Developer
                    </td>
                    <td className="px-6 py-4">
                        C1
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
                    </td>
                    <td className="px-6 py-4">
                        Mexico
                    </td>
                    <td className="px-6 py-4">
                        C++
                    </td>
                    <td className="px-6 py-4">
                        <button className='btn btn-sm btn-primary'>View</button>
                        <button className='btn btn-sm btn-primary'>Edit</button>
                        <button className='btn btn-sm btn-danger'>Delete</button>  
                    </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        3
                    </th>
                    <td className="px-6 py-4">
                        Uma Umaña
                    </td>
                    <td className="px-6 py-4">
                        Billing
                    </td>
                    <td className="px-6 py-4">
                        Developer
                    </td>
                    <td className="px-6 py-4">
                        C2
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
                    </td>
                    <td className="px-6 py-4">
                        Mexico
                    </td>
                    <td className="px-6 py-4">
                        C
                    </td>
                    <td className="px-6 py-4">
                        <button className='btn btn-sm btn-primary'>View</button>
                        <button className='btn btn-sm btn-primary'>Edit</button>
                        <button className='btn btn-sm btn-danger'>Delete</button>  
                    </td>
                </tr>
                <tr className="border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        4
                    </th>
                    <td className="px-6 py-4">
                        Alejandra García Gómez
                    </td>
                    <td className="px-6 py-4">
                        Pipeline
                    </td>
                    <td className="px-6 py-4">
                        Developer
                    </td>
                    <td className="px-6 py-4">
                        C1
                    </td>
                    <td className="px-6 py-4">
                        01/01/2021
                    </td>
                    <td className="px-6 py-4">
                        Mexico
                    </td>
                    <td className="px-6 py-4">
                        Python
                    </td>
                    <td className="px-6 py-4">
                        <button className='btn btn-sm btn-primary'>View</button>
                        <button className='btn btn-sm btn-primary'>Edit</button>
                        <button className='btn btn-sm btn-danger'>Delete</button>  
                    </td>
                </tr>
            </tbody>
        </table>
</div>

    )
}

export default TableResource;