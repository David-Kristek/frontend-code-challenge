import { renderHook, RenderResult } from "@testing-library/react-hooks";
import useDataWithoutLosing from "../../utils/hooks/useDataWithoutLosing";

const testData = { name: "Dave" };
type Data = { name: string } | undefined;
let result: RenderResult<Data>;
type hookProps = {
  data: Data;
  oldData: Data;
};
let rerender: (props: hookProps) => void;

beforeEach(() => {
  const hookRendered = renderHook(
    ({ data, oldData }) => useDataWithoutLosing<Data>(data, oldData),
    { initialProps: { data: testData, oldData: undefined } }
  );
  result = hookRendered.result;
  rerender = hookRendered.rerender as typeof rerender;
});

test("should receive data", () => {
  expect(result.current).toBe(testData);
});
test("should add new data", () => {
  rerender({ data: { name: "John" }, oldData: { name: "Josh" } });
  expect(result.current?.name).toBe("John");
});
test("should replace with old data", () => {
  rerender({ data: undefined, oldData: { name: "Josh" } });
  expect(result.current?.name).toBe("Josh");
});
test("should replace with new data", () => {
  rerender({ data: undefined, oldData: { name: "Josh" } });
  rerender({ data: { name: "James" }, oldData: { name: "Josh" } });
  expect(result.current?.name).toBe("James");
});
