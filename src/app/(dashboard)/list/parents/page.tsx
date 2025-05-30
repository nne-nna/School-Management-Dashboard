import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { parentsData, role} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Parent = {
    id: number;
    name: string;
    email?: string;
    students: string[];
    phone: string;
    address: string; 
}

const columns = [
    {
        header:"Info",
        accessor: "Info"
    },
    {
        header:"Student Names",
        accessor: "students",
        className:"hidden md:table-cell"
    },
    {
        header:"Phone",
        accessor: "phone",
        className:"hidden lg:table-cell"
    },
    {
        header:"Address",
        accessor: "address",
        className:"hidden lg:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]

const ParentList = () => {
    const renderRow = (item: Parent) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
            <td className="flex items-center gap-4 p-4">
                <div className="flex flex-col">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item?.email}</p>
                </div>
            </td>
            <td className="hidden md:table-cell">{item.students.join(",")}</td>
            <td className="hidden md:table-cell">{item.phone}</td>
            <td className="hidden md:table-cell">{item.address}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                            <>
                                <FormModal table="parent" type="update" data={item}/>
                                <FormModal table="parent" type="delete" id={item.id}/> 
                            </>
                        )
                    }
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white m-4 p-4 mt-0 rounded-md flex-1">
            {/* TOP */}
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-lg font-semibold">All Parents</h1>
                <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
                    {/* SEARCH BAR */}
                    <TableSearch />
                    <div className="flex items-center gap-4 self-end">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                            <Image src="/filter.png" alt="" width={14} height={14} />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-yellow">
                            <Image src="/sort.png" alt="" width={14} height={14} />
                        </button>
                        {role === "admin" && (
                            <FormModal table="parent" type="create"/> 
                        )}
                    </div>
                </div>
            </div>
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={parentsData}/>
            {/* Pagination */}
            <Pagination />
        </div>
    )
}

export default ParentList;