import React,{useMemo ,useState} from 'react'
import { useReactTable, getCoreRowModel, flexRender,getPaginationRowModel  ,getSortedRowModel ,getFilteredRowModel} from '@tanstack/react-table';
import mockData from '/MOCK_DATA.json';
import './StudentList.css'
const StudentList = () => {
     const [pagination,setPagination] = useState({
      pageIndex:0,
      pageSize:10
     })
     const [sorting,setSorting] = useState([])
     const [filtering,setFiltering] = useState('')
    const data = useMemo(()=>mockData,[])
    const columns = useMemo(()=>[
        {
            header: 'ID',
            accessorKey: 'id',
            enableSorting:false
            
          },
         /* {
            accessorKey: 'first_name',
            header: 'First Name',
            cell:info=><strong>{info.getValue()}</strong>
          },
          {
            accessorKey: 'last_name',
            header: 'Last Name',
          },*/
          {
                 accessorFn :row=>`${row.first_name} ${row.last_name}`,
                 header:'Full Name'

          },
          {
            accessorKey: 'email',
            header: 'Email',
            cell: info => <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a>,
          },
          {
            accessorKey: 'gender',
            header: 'Gender',
          }
    ],
[])
    /**
     * {"id":1,
     * "first_name":"Lock",
     * "last_name":"Critchard",
     * "email":"lcritchard0@virginia.edu",
     * "gender":"Male"}
     */
    const table = useReactTable({
         data,
         columns,
         getCoreRowModel:getCoreRowModel(),
         getPaginationRowModel :getPaginationRowModel(),
         state:{pagination,sorting,globalFilter:filtering},
         onPaginationChange:setPagination,
         pageCount:Math.ceil(data.length/pagination.pageSize),
          getSortedRowModel:getSortedRowModel(),
          onSortingChange:setSorting,
          getFilteredRowModel:getFilteredRowModel(),
          onGlobalFilterChange:setFiltering
         
    })
  return (
    <div>
      <input
      type='text'
      value={filtering || ''}
      onChange={(e)=>setFiltering(e.target.value)}
      placeholder='Searching...'
      className='p-2 rounded border border-teal-50'
      >
      </input>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            {
                table.getHeaderGroups().map(headerGroup=>(
                    <tr key={headerGroup.id}>
                       {
                        headerGroup.headers.map(header=>(
                            <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                            onClick={header.column.getToggleSortingHandler()}
                            >
                                {
                                    flexRender(header.column.columnDef.header,header.getContext())
                                }
                                {{
                                  asc:' 🔼',
                                  desc :' 🔽',
                                }[header.column.getIsSorted()] ?? null}
                            </th>
                        ))
                       }
                    </tr>
                ))
            }
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
             {
                table.getRowModel().rows.map(row=>(
                    <tr key={row.id}>
                      {
                        row.getVisibleCells().map(cell=>(
                            <td 
                            key={cell.id}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                               {flexRender(cell.column.columnDef.cell,cell.getContext())}
                            </td>
                        ))
                      }
                    </tr>
                ))
             }
        </tbody>
      </table>
      <div className='pagination mt-4'>
             <button
             onClick={()=>table.previousPage()}
             disabled={!table.getCanPreviousPage()}
             >Previous</button>  
             <span className='mx-4'>
              page {table.getState().pagination.pageIndex+1} of {table.getPageCount()}
             </span>
             <button
             onClick={()=>table.nextPage()}
             disabled={!table.getCanNextPage()}
             >Next</button>  
      </div>
    </div>
  )
}

export default StudentList
