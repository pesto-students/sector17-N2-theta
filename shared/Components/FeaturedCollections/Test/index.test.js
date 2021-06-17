import { render, screen } from "../../../../test/test-utils";

import FeaturedCollections from "../index";
import useCategories from "../../../../data/hooks/use-categories";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { GlobalContextProvider } from "../../../../context/GlobalContext";

import { ThemeProvider } from "styled-components";
import ThemeVariables from "../../../Constants/Variables/Theme";
import GlobalStyle from "../../../Styles/GlobalStyle";
import PageStyle from "../../../Styles/PageStyle";
// jest.mock('../../../../data/hooks/use-categories',()=>({
//   useCategories: jest.fn(),
// })) ;
const contextData = {};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
describe("Featured Collections", () => {
  // beforeEach(()=> {
  //   useCategories.mockImplementation(()=>{{}))
  // })
  describe("Featured Collections before loading", () => {
    it("render Feature Collections before loading", () => {
      render(
        <GlobalContextProvider value={contextData}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={ThemeVariables}>
              <PageStyle>
                <GlobalStyle />
                <FeaturedCollections />
              </PageStyle>
            </ThemeProvider>
          </QueryClientProvider>
        </GlobalContextProvider>
      );
      const title = screen.getByText(/loadgin/i);
      expect(title).toBeInTheDocument();
    });
  });

  describe("Featured Collections after loading", () => {
    it("render Feature Collections after loading", async () => {
      jest.mock("../index", () => ({
        useQuery: () => ({ isLoading: false, error: {}, data: categories = {} }),
      }));
      render(
        <GlobalContextProvider value={contextData}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={ThemeVariables}>
              <PageStyle>
                <GlobalStyle />
                <FeaturedCollections />
              </PageStyle>
            </ThemeProvider>
          </QueryClientProvider>
        </GlobalContextProvider>
      );
      // const title = screen.getByText(/Featured Collections/i);
      // expect(title).toBeInTheDocument();
      const title = await screen.findAllByRole("categories");
      expect(title).not.toHaveLength(0);
    });
  });
});
