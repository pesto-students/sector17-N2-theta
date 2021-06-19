import { render, screen } from "../../../../test/test-utils";

import { useQuery } from "react-query";
import TopTrendingProducts from "../index";
import TestCommon from "../../../../test/TestCommon";

describe("Top Trending Products", () => {
  describe("Top Trending Products before loading", () => {
    it("render top trending products before loading", () => {
      render(
        <TestCommon>
          <TopTrendingProducts />
        </TestCommon>
      );
      const title = screen.getByRole("loading");
      expect(title).toBeInTheDocument();
    });
  });

  describe("Top Trending Products after loading", () => {
    test("render top trending products after loading", async () => {
      jest.mock("../index", () => ({
        useQuery: () => ({
          data: (products = {}),
          isLoading: false,
          isSuccess: true,
        }),
      }));
      render(
        <TestCommon>
          <TopTrendingProducts />
        </TestCommon>
      );
      const title = await screen.findAllByRole("products");
      expect(title).not.toHaveLength(0);
    });
  });
});
