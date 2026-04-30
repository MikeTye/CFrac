import { Card } from '../common/Card';

export function ModerationTable({ title, columns, rows }: { title: string; columns: string[]; rows: string[][] }) {
  return (
    <Card>
      <h3>{title}</h3>
      <table>
        <thead><tr>{columns.map((c) => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((col, j) => <td key={`${i}${j}`}>{col}</td>)}</tr>)}</tbody>
      </table>
    </Card>
  );
}
