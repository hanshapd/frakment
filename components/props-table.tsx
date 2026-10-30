interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
  required?: boolean;
}

interface PropsTableProps {
  rows: PropRow[];
}

export function PropsTable({ rows }: PropsTableProps) {
  return (
    <div className="my-6 w-full overflow-x-auto rounded-lg border">
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prop
            </th>
            <th className="h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Type
            </th>
            <th className="h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Default
            </th>
            <th className="h-10 px-4 text-left align-middle text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b transition-colors last:border-0 hover:bg-muted/30"
            >
              <td className="px-4 py-3 align-middle">
                <code className="font-mono text-sm font-medium">{row.name}</code>
                {row.required && (
                  <span className="ml-1 text-destructive" aria-label="required">
                    *
                  </span>
                )}
              </td>
              <td className="px-4 py-3 align-middle">
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                  {row.type}
                </code>
              </td>
              <td className="px-4 py-3 align-middle">
                {row.default ? (
                  <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                    {row.default}
                  </code>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 align-middle text-sm text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}