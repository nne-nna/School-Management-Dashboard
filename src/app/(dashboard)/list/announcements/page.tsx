import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import {announcementsData, eventsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Announcements = {
    id: number;
    title: string;
    class: string;
    date: string;
}

const columns = [
    {
        header:"Title",
        accessor: "title",
    },
    {
        header:"Class",
        accessor: "class",
    },
    {
        header:"Date",
        accessor: "date",
        className:"hidden md:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]

const AnnouncementsList = () => {

    const renderRow = (item: Announcements) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
            <td className="flex items-center gap-4 p-4">{item.title}</td>
            <td className="">{item.class}</td>
            <td className="hidden md:table-cell">{item.date}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                            <>
                                <FormModal table="announcement" type="update" data={item}/>
                                <FormModal table="announcement" type="delete" id={item.id}/> 
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
                <h1 className="hidden md:block text-lg font-semibold">All Announcements</h1>
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
                            <FormModal table="announcement" type="create"/>
                        )}
                    </div>
                </div>
            </div>
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={announcementsData}/>
            {/* Pagination */}
            <Pagination />
        </div>
    )
}

export default AnnouncementsList;