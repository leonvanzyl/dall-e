export default function Option({ title, values, onAppend }) {
  return (
    <div>
      <h3 className="font-bold text-sm mb-4 mt-6">{title}</h3>
      <div className="grid-flow-row">
        {values.map((value) => {
          return (
            <button
              key={value}
              onClick={() => {
                onAppend(value);
              }}
              className="py-2 px-6 bg-gray-600 rounded-3xl text-xs uppercase m-2"
            >
              {value}
            </button>
          );
        })}
      </div>
    </div>
  );
}
