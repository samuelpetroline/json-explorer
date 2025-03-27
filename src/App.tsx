import { useState } from 'react';
import { TreeViewer } from './components/TreeViewer';
import { TreeViewerContextType } from './components/TreeViewerContext';

const initialData = {
  date: '2021-10-27T07:49:14.896Z',
  hasError: false,
  fields: [
    {
      id: '4c212130',
      prop: 'iban',
      value: 'DE81200505501265402568',
      hasError: false,
    },
  ],
};

// [
//   'root',
//   [
//     ['date', '2021...'],
//     ['hasError', false],
//     [
//       'fields',
//       [
//         ['id', '4c'],
//         ['props', 'iban'],
//         ['value', 'DE81200505501265402568'],
//         ['hasError', false],
//       ],
//     ],
//   ],
// ];

export default function App() {
  const [property, setProperty] = useState<{ path: string; value: any } | null>(null);
  const [jsonData, setJsonData] = useState(initialData);

  const handleSelect: TreeViewerContextType['onSelect'] = ({ path, value }) => {
    setProperty({ path, value });
  };

  const handleDataChange = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      setJsonData(parsed);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="mx-auto flex flex-col w-full max-w-2xl gap-6 p-6">
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl text-gray-600 mb-2">JSON Input</h2>
          <textarea
            value={JSON.stringify(jsonData, null, 2)}
            onChange={e => handleDataChange(e.target.value)}
            className="border border-indigo-100 rounded-md p-2 font-mono text-sm h-48"
            placeholder="Enter JSON data..."
          />
        </div>
      </section>

      <section className="flex gap-4 justify-between">
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl text-gray-600 mb-2">Path</h2>
          <input
            disabled
            value={property?.path}
            className="border border-indigo-100 rounded-md h-12 px-2 text-lg"
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-xl text-gray-600 mb-2">Value</h2>
          <input
            disabled
            value={property?.value}
            className="border border-indigo-100 rounded-md h-12 px-2 text-lg"
          />
        </div>
      </section>

      <TreeViewer data={jsonData} onSelect={handleSelect} />
    </main>
  );
}
