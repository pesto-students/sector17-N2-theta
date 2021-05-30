import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: calc((100% - ${props => (((props.count - 1) * props.gap)+'px')}) / ${props => props.count}) calc((100% - ${props => (((props.count - 1) * props.gap)+'px')}) / ${props => props.count}) calc((100% - ${props => (((props.count - 1) * props.gap)+'px')}) / ${props => props.count}) calc((100% - ${props => (((props.count - 1) * props.gap)+'px')}) / ${props => props.count});
  gap : ${props => props.gap}px;
`;

export default Grid;