import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { lessonsData, role } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

type Lesson = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
}

const columns = [
    {
        header:"Subject Name",
        accessor: "name"
    },
    {
        header:"Class",
        accessor: "class",
    },
    {   
        header: "Teacher",
        accessor: "teacher",
        className:"hidden md:table-cell"
    },
    {
        header:"Actions",
        accessor: "action",
    },
]


const LessonList = () => {

    const renderRow = (item: Lesson) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-purpleLight">
            <td className="flex items-center gap-4 p-4">{item.subject}</td>
            <td>{item.class}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                            <>
                                <FormModal table="lesson" type="update" data={item}/>
                                <FormModal table="lesson" type="delete" id={item.id}/> 
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
                <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
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
                            <FormModal table="lesson" type="create"/>
                        )}
                    </div>
                </div>
            </div>
            {/* List */}
            <Table columns={columns} renderRow={renderRow} data={lessonsData}/>
            {/* Pagination */}
            <Pagination />
        </div>
    )
}

export default LessonList;