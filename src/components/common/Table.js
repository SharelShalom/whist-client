const Table = ({ data, columns }) => {
  return (
    <>
      <table className="table" style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
        <thead>
          <tr>
            {columns?.map((column) => (
              <th className="clickable" key={column.path || column.key}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id}>
              {columns.map((column) => (
                <td key={item._id}>{column.content(item)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
