import { renderHook, RenderResult } from "@testing-library/react-hooks";
import useDataWithoutLosing from "../../utils/hooks/useDataWithoutLosing";

const testData = { name: "Dave" };
type Data = { name: string } | undefined;
let result: RenderResult<{
  definedData: Data;
  firstLoading: boolean;
}>;
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
  expect(result.current.definedData).toBe(testData);
});
test("should add new data", () => {
  rerender({
    data: { name: "John" },
    oldData: { name: "Josh" },
  });
  expect(result.current.definedData?.name).toBe("John");
});
test("should replace with old data", () => {
  rerender({ data: undefined, oldData: { name: "Josh" } });
  expect(result.current.definedData?.name).toBe("Josh");
});
test("should replace with new data", () => {
  rerender({ data: undefined, oldData: { name: "Josh" } });
  rerender({
    data: { name: "James" },
    oldData: { name: "Josh" },
  });
  expect(result.current.definedData?.name).toBe("James");
});
test("should test loading", () => {
  rerender({ data: undefined, oldData: undefined });
  expect(result.current.firstLoading).toBe(true);
  rerender({ data: undefined, oldData: { name: "John" } });
  expect(result.current.firstLoading).toBe(false);
  rerender({ data: { name: "John" }, oldData: undefined });
  expect(result.current.firstLoading).toBe(false);
});
