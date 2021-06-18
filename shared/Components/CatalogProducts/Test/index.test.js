import { render, screen } from "../../../../test/test-utils";

import { useQuery } from "react-query";
import TestCommon from "../../../../test/TestCommon";
import CatalogProducts from "../index";
import { useRouter } from "next/router";
jest.mock("next/router", () => ({
    useRouter() {
      return {
        prefetch: () => null,
        query: "category-slug",
      };
    }
  }));
describe("Catalog Products", () => {
  describe("Catalog Products before loading", () => {   
    it("render catalog products before loading", () => {
        jest.mock("../index", () => ({
            useQuery: () => ({
              data: (products = {}),
              isLoading: false,
              isSuccess: true,
            }),
          }));
      render(
        <TestCommon>            
          <CatalogProducts />
        </TestCommon>
      );
      const title = screen.getByRole("loading");
      expect(title).toBeInTheDocument();
    });
  });

  describe("Catalog Products after loading", () => {
    test("render catalog products after loading", async () => {
      jest.mock("../index", () => ({
        useQuery: () => ({
          data: (products = {}),
          isLoading: false,
          isSuccess: true,
        }),
      }));
      render(
        <TestCommon>
          <CatalogProducts />
        </TestCommon>
      );
      const title = await screen.findAllByRole("products");
      expect(title).not.toHaveLength(0);
    });
  });
});
