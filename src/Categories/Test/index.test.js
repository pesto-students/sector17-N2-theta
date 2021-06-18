import { render, screen } from "../../../test/test-utils";

import TestCommon from "../../../test/TestCommon";
import Categories from "../index";
jest.mock("next/router", () => ({
    useRouter() {
      return {
        prefetch: () => null,
        query: "category-slug",
      };
    }
  }));
describe("Categories", () => {
  describe("Categories before loading", () => {   
    it("render categories before loading", () => {
        jest.mock("../index", () => ({
            useQuery: () => ({
              data: (products = {}),
              isLoading: false,
              isSuccess: true,
            }),
          }));
      render(
        <TestCommon>            
          <Categories />
        </TestCommon>
      );
      const title = screen.getByRole("loading");
      expect(title).toBeInTheDocument();
    });
  });

  describe("Categories after loading", () => {
    test("render categories after loading", async () => {
      jest.mock("../index", () => ({
        useQuery: () => ({
          isLoading: false,
          error: {},
          data: (categories = {}),
        }),
      }));
      render(
        <TestCommon>
          <Categories />
        </TestCommon>
      );
      const title = await screen.findAllByRole("categories");
      expect(title).not.toHaveLength(0);
    });
  });
});
