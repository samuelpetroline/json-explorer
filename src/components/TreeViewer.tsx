import { TreeViewerContextType, TreeViewerProvider, useTreeViewer } from './TreeViewerContext';

type TreeViewerProps = {
  data: any;
  onSelect: TreeViewerContextType['onSelect'];
};

export function TreeViewer({ data, onSelect }: TreeViewerProps) {
  return (
    <div className="border border-gray-200 rounded-md p-4 font-mono text-sm">
      <TreeViewerProvider onSelect={onSelect}>
        <DataRender field="root" data={data} path="root" />
      </TreeViewerProvider>
    </div>
  );
}

type DataViewerProps = { field: string; data: any; path: string };

function DataRender(props: DataViewerProps) {
  const data = props.data;

  if (typeof data === 'object' && data !== null) {
    const nestedData = Object.keys(data).map(key => [key, data[key]]);

    return <ObjectViewer {...props} data={[props.field, nestedData]} />;
  }

  return <PrimitiveValueViewer {...props} data={[props.field, data]} />;
}

type Node = [string, any | any[]];

type NodeViewerProps = { data: Node; path: string };

function ObjectViewer({ data, path }: NodeViewerProps) {
  return (
    <div className="flex flex-col ml-4">
      <strong>{data[0]}:</strong>
      {data[1].map((item: Node) => (
        <DataRender field={item[0]} data={item[1]} path={`${path}.${item[0]}`} />
      ))}
    </div>
  );
}

function PrimitiveValueViewer({ data, path }: NodeViewerProps) {
  return (
    <div className="flex flex-row ml-4 gap-[0.2rem]">
      <Key label={data[0]} path={path} data={data[1]} />
      <span>{data[1]?.toString()}</span>
    </div>
  );
}

function Key({ label, path, data }: { label: string; path: string; data: any }) {
  const { onSelect } = useTreeViewer();

  return (
    <strong
      className="text-sky-500 cursor-pointer hover:text-purple-600"
      onClick={() => onSelect({ path: path, value: data })}
    >
      {label}:
    </strong>
  );
}
