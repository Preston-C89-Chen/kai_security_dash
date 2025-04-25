import {
  createTable,
  getCoreRowModel,
  getFilteredRowModel,
  ColumnDef,
} from '@tanstack/react-table'
import { FlattenedVulnerability } from '@/features/vulnerabilities/types'
import flattenedData from '../__mocks__/mock_flattened_table_data.json'

const columns: ColumnDef<FlattenedVulnerability>[] = [
  {
    accessorKey: 'severity',
    header: 'Severity',
    filterFn: 'equalsString',
  },
  {
    accessorKey: 'cve',
    header: 'CVE',
  },
]

describe('Tanstack table filtering',() => {
  it('filters by severity high', () => {
    const table = createTable<FlattenedVulnerability>({
      data: sampleData,
      columns,
      state: {
        columnFilters: [{ id: 'severity', value: 'high' }],
      },
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    })
    const filtered = table.getFilteredRowModel().rows
    expect(filtered).toHaveLength(1)
  })
})