import { render, screen } from "../../../../test/test-utils";

import {  useQuery } from "react-query";
import FeaturedCollections from "../index";
import TestCommon from "../../../../test/TestCommon";

// jest.mock('../../../../data/hooks/use-categories',()=>({
//   useCategories: jest.fn(),
// })) ;
describe("Featured Collections", () => {
  // beforeEach(()=> {
  //   useCategories.mockImplementation(()=>{{}))
  // })
  describe("Featured Collections before loading", () => {
    it("render Feature Collections before loading", () => {
      render(
        <TestCommon>
          <FeaturedCollections />
        </TestCommon>
      );
      const title = screen.getByText(/loadgin/i);
      expect(title).toBeInTheDocument();
    });
  });

  describe("Featured Collections after loading", () => {
    it("render Feature Collections after loading", async () => {
      jest.mock("../index", () => ({
        useQuery: () => ({
          isLoading: false,
          error: {},
          data: (categories = {}),
        }),
      }));
      render(        
        <TestCommon>
                <FeaturedCollections />            
        </TestCommon>
      );
      // const title = screen.getByText(/Featured Collections/i);
      // expect(title).toBeInTheDocument();
      const title = await screen.findAllByRole("categories");
      expect(title).not.toHaveLength(0);
    });
  });
});
