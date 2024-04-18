import React from "react"

interface Props{}

interface Opening{
    id: string;
    status: string;
    posting_date: string;
    close_date: string;
    close_reason: string;
    owner: string;
}

const openings: Opening[] =[
    {
        id: "OP1001",
        status: "Open",
        posting_date: "2024-01-10",
        close_date: "2024-06-15",
        close_reason: "",
        owner: "John Doe"
    },
    {
        id: "OP1002",
        status: "Closed",
        posting_date: "2024-02-20",
        close_date: "2024-03-30",
        close_reason: "Position filled",
        owner: "Jane Smith"
    },
    {
        id: "OP1003",
        status: "Closed",
        posting_date: "2024-04-05",
        close_date: "2024-04-25",
        close_reason: "Cancelled",
        owner: "Alice Johnson"
    }
];

const TableOpenings = (props:Props) =>{

    return(
        <div className="relative overflow-x-auto sm:rounded-lg p-4">
            <table className=" w-full text-sm  rtl:text-right text-gray-500 dark:text-gray-400 shadow-md rounded">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Status </th>
                        <th scope="col" className="px-6 py-3">Opening Posting Date</th>
                        <th scope="col" className="px-6 py-3">Opening Close Date</th>
                        <th scope="col" className="px-6 py-3">  Close Reason </th>
                        <th scope="col" className="px-6 py-3"> Owner </th>

                    </tr>
                </thead>

                <tbody>
                    {openings.map((position) => (
                        <React.Fragment key= {position.id}>
                            <tr className="border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{position.id}</th>
                              <td className="px-6 py-4">{position.status} </td>
                              <td className="px-6 py-4">{position.posting_date} </td>
                              <td className="px-6 py-4">{position.close_date} </td>
                              <td className="px-6 py-4">{position.close_reason} </td>
                              <td className="px-6 py-4">{position.owner} </td>
                            </tr>
                        </React.Fragment>
                    ))}

                    
                </tbody>
            </table>
        </div>
    )
}

export default TableOpenings;

