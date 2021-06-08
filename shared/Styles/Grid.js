import styled from "styled-components";

const generateColumns = (count, gap) => {
  const columns = [...Array(count).keys()];

  return columns.map(() => {
    return `calc((100% - ${(count - 1) * gap}px) / ${count})`
  }).join(' ');
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => generateColumns(props.count, props.gap)};
  gap : ${props => props.gap}px;
`;

export default Grid;