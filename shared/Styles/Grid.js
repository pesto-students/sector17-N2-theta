import styled from "styled-components";

const generateColumns = (count, gap) => {
    const columns = [...Array(count).keys()];

    return columns
        .map(() => {
            return `calc((100% - ${(count - 1) * gap}px) / ${count})`;
        })
        .join(" ");
};

const Grid = styled.div`
    display: grid;
    grid-template-columns: ${(props) =>
        generateColumns(props.count, props.gap)};
    gap: ${(props) => props.gap}px;

    @media screen and (max-width: 992px) {
        grid-template-columns: calc((100% - 45px) / 2) calc((100% - 45px) / 2);
    }
    @media screen and (max-width: 600px) {
        grid-template-columns: calc(100% / 1);
    }
`;

export default Grid;
