import { renderHook, RenderResult } from "@testing-library/react-hooks";
import useDebounceValue from "../../utils/hooks/useDebounceValue";
import { expect } from '@jest/globals';
const delay = 400;
let result: RenderResult<string>;
let rerender: (
  props?:
    | {
        value: string;
      }
    | undefined
) => void;

beforeEach(() => {
  const hookRendered = renderHook(
    ({ value }) => useDebounceValue(value, delay),
    {
      initialProps: { value: "" },
    }
  );
  result = hookRendered.result;
  rerender = hookRendered.rerender;
});

test("test debounce value", async () => {
  expect(result.current).toBe("");
  rerender({ value: "a" });
  expect(result.current).not.toBe("a");
  await new Promise((r) => setTimeout(r, delay / 2));
  expect(result.current).not.toBe("a");
  await new Promise((r) => setTimeout(r, delay / 2));
  expect(result.current).toBe("a");
});
